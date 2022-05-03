using Application.Users.Commands;
using Grpc.Core;
using MediatR;

namespace API.Services;

public class UserService : User.UserBase
{
    private readonly IMediator _mediator;

    public UserService(IMediator mediator)
    {
        _mediator = mediator;
    }

    public override async Task<RegisterResponse> Register(RegisterRequest request, ServerCallContext context)
    {
        await _mediator.Send(new RegisterUserCommand(request.FirstName, request.LastName, request.Email,
            request.Password));

        return new RegisterResponse();
    }

    public override async Task<LoginResponse> Login(LoginRequest request, ServerCallContext context)
    {
        var response = await _mediator.Send(new LoginUserCommand(request.Email, request.Password));

        return new LoginResponse { AccessToken = response };
    }
}