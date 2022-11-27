using API.Extensions;
using API.Interceptors;
using API.Interceptors.Authorization;
using API.Services;
using API.Services.CustomServices;
using Application;
using Application.Common.Interfaces;
using Application.Services;
using Calzolari.Grpc.AspNetCore.Validation;
using Infrastructure;
using Infrastructure.Identity;
using Infrastructure.Persistence;
using Infrastructure.Persistence.Utils;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Authorization;
using Serilog;

var builder = WebApplication.CreateBuilder(args);

builder.Host.UseSerilog((hostingContext, loggerConfiguration) =>
    loggerConfiguration.ReadFrom.Configuration(hostingContext.Configuration));

var configuration = builder.Configuration;

var infrastructureSettings = new InfrastructureSettings();
configuration.Bind(nameof(InfrastructureSettings), infrastructureSettings);
builder.Services.AddInfrastructure(infrastructureSettings);

var applicationSettings = new ApplicationSettings();
configuration.Bind(nameof(ApplicationSettings), applicationSettings);
builder.Services.AddApplication(applicationSettings);

builder.Services.AddAutoMapper(AppDomain.CurrentDomain.GetAssemblies());
builder.Services.AddTransient<IAuthorizationHandler, GrpcAuthorizationHandler>();
builder.Services.AddSingleton<SeanceRoomService>();

const string policyName = "MyPolicy";
builder.Services.AddCors(o =>
{
    o.AddPolicy(policyName, config =>
    {
        config.AllowCredentials();
        config.WithOrigins("https://localhost:7146", "http://localhost:5146", "https://localhost:7147",
            "http://localhost:7147");
        config.AllowAnyMethod();
        config.AllowAnyHeader();
        config.WithExposedHeaders("Grpc-Status", "Grpc-Message", "Grpc-Encoding", "Grpc-Accept-Encoding");
    });
});

builder.Services.AddGrpcFluentValidation();
builder.Services.AddGrpc(options =>
{
    options.EnableMessageValidation();
    options.Interceptors.Add<AuthorizationInterceptor>();
    options.Interceptors.Add<ErrorHandlingInterceptor>();
});
builder.Services.AddGrpcReflection();

builder.Services.AddRouting(options => options.LowercaseUrls = true);

builder.Services.AddAuthentication(options =>
{
    options.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
    options.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;
    options.DefaultScheme = JwtBearerDefaults.AuthenticationScheme;
}).AddJwtBearer(options =>
{
    options.SaveToken = true;
    options.RequireHttpsMetadata = true;
    options.TokenValidationParameters = TokenValidationParametersCreator.Create(applicationSettings);
});

builder.Services.AddAuthorization(options =>
{
    options.AddPolicy("TokenAuthorize", policy => { policy.AddRequirements(new GrpcRequirement()); });
});

var app = builder.Build();

// Configure the HTTP request pipeline.
app.UseRouting();

app.UseCors(policyName);
app.UseGrpcWeb(new GrpcWebOptions { DefaultEnabled = true });

app.UseAuthentication();
app.UseAuthorization();

app.UseEndpoints(endpoints =>
{
    endpoints.MapGrpcService<UserService>().RequireCors(policyName);
    endpoints.MapGrpcService<MovieService>().RequireCors(policyName);
    endpoints.MapGrpcService<OfferService>().RequireCors(policyName);
    endpoints.MapGrpcService<SeanceService>().RequireCors(policyName);
    endpoints.MapGrpcService<TicketDiscountService>().RequireCors(policyName);
    endpoints.MapGrpcService<OrderService>().RequireCors(policyName);
});

if (app.Environment.IsDevelopment())
{
    app.MapGrpcReflectionService();
}

if (infrastructureSettings.SeedWithCustomData)
{
    using var scope = app.Services.CreateScope();
    var dataContext = scope.ServiceProvider.GetRequiredService<ApplicationDbContext>();
    var authenticationService = scope.ServiceProvider.GetRequiredService<IAuthenticationService>();
    var userIds = await IdentitySeeder.SeedAsync(dataContext, authenticationService);
    await DatabaseSeeder.SeedAsync(dataContext, userIds);
}

app.Run();