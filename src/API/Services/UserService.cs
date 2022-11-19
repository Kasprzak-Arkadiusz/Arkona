using API.Common.Utils;
using Application.Common.Exceptions;
using Application.Users.Commands;
using AutoMapper;
using Grpc.Core;
using MediatR;

namespace API.Services;

public class UserService : User.UserBase
{
    private readonly IMediator _mediator;
    private readonly IMapper _mapper;

    public UserService(IMediator mediator, IMapper mapper)
    {
        _mediator = mediator;
        _mapper = mapper;
    }

    public override async Task<AuthenticationResponse> Register(RegisterRequest request, ServerCallContext context)
    {
        var viewModel = await _mediator.Send(new RegisterUserCommand(request.FirstName, request.LastName, request.Email,
            request.Password));
        var httpContext = context.GetHttpContext();
        httpContext.Response.Cookies.Append("refresh-token", viewModel.RefreshToken,
            CookieOptionsBuilder.GetRefreshTokenOptions());

        return _mapper.Map<AuthenticationResponse>(viewModel);
    }

    public override async Task<AuthenticationResponse> ExternalRegister(ExternalRegisterRequest request,
        ServerCallContext context)
    {
        var viewModel =
            await _mediator.Send(new ExternalLoginUserCommand(request.AccessToken, request.Provider.ToString()));
        var httpContext = context.GetHttpContext();
        httpContext.Response.Cookies.Append("refresh-token", viewModel.RefreshToken,
            CookieOptionsBuilder.GetRefreshTokenOptions());

        return _mapper.Map<AuthenticationResponse>(viewModel);
    }

    public override async Task<AuthenticationResponse> Login(LoginRequest request, ServerCallContext context)
    {
        var viewModel = await _mediator.Send(new LoginUserCommand(request.Email, request.Password));
        var httpContext = context.GetHttpContext();
        httpContext.Response.Cookies.Append("refresh-token", viewModel.RefreshToken,
            CookieOptionsBuilder.GetRefreshTokenOptions());

        return _mapper.Map<AuthenticationResponse>(viewModel);
    }

    public override async Task<RefreshJwtResponse> RefreshJwt(RefreshJwtRequest request, ServerCallContext context)
    {
        var httpContext = context.GetHttpContext();
        httpContext.Request.Cookies.TryGetValue("refresh-token", out var refreshToken);
        if (refreshToken is null)
        {
            throw new UnauthorizedException("Refresh token nie istnieje");
        }

        var viewModel = await _mediator.Send(new RefreshJwtCommand(request.UserId, refreshToken));
        httpContext.Response.Cookies.Append("refresh-token", viewModel.RefreshToken,
            CookieOptionsBuilder.GetRefreshTokenOptions());

        return new RefreshJwtResponse
        {
            AccessToken = viewModel.AccessToken
        };
    }
}