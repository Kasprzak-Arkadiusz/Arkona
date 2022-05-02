using System.Text;
using API.Extensions;
using API.Services;
using Application;
using Application.Common.Interfaces;
using Calzolari.Grpc.AspNetCore.Validation;
using Infrastructure;
using Infrastructure.Identity;
using Infrastructure.Persistence;
using Infrastructure.Persistence.Utils;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.IdentityModel.Tokens;

var builder = WebApplication.CreateBuilder(args);

// Additional configuration is required to successfully run gRPC on macOS.
// For instructions on how to configure Kestrel and gRPC clients on macOS, visit https://go.microsoft.com/fwlink/?linkid=2099682

var configuration = builder.Configuration;

// Add services to the container.
var infrastructureSettings = new InfrastructureSettings();
configuration.Bind(nameof(InfrastructureSettings), infrastructureSettings);
builder.Services.AddInfrastructure(infrastructureSettings);

var applicationSettings = new ApplicationSettings();
configuration.Bind(nameof(ApplicationSettings), applicationSettings);
builder.Services.AddApplication(applicationSettings);

builder.Services.AddRouting(options => options.LowercaseUrls = true);

builder.Services.AddAuthentication(options =>
{
    options.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
    options.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;
    options.DefaultScheme = JwtBearerDefaults.AuthenticationScheme;
}).AddJwtBearer(options =>
{
    options.SaveToken = true;
    options.RequireHttpsMetadata = false;
    options.TokenValidationParameters = new TokenValidationParameters
    {
        IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(applicationSettings.AccessTokenSettings.Key)),
        ValidateIssuerSigningKey = true,
        ValidateIssuer = true,
        ValidateAudience = false,
        ValidateLifetime = true,
        ClockSkew = TimeSpan.Zero
    };
});

builder.Services.AddAuthorization();

builder.Services.AddGrpc(options => options.EnableMessageValidation());
builder.Services.AddGrpcFluentValidation();

var app = builder.Build();

app.UseRouting();

app.UseAuthentication();
app.UseAuthorization();

// Configure the HTTP request pipeline.
app.UseEndpoints(endpoints =>
{
    endpoints.MapGrpcService<UserService>();
});

if (infrastructureSettings.SeedWithCustomData)
{
    using var scope = app.Services.CreateScope();
    var dataContext = scope.ServiceProvider.GetRequiredService<ApplicationDbContext>();
    var authenticationService = scope.ServiceProvider.GetRequiredService<IAuthenticationService>();
    var userIds = await IdentitySeeder.SeedAsync(dataContext, authenticationService);
    await DatabaseSeeder.SeedAsync(dataContext, userIds);
}

app.Run();