using Application.Users.Commands.RegisterUser;
using Grpc.Core;
using MediatR;

namespace API.Services.UserService;

public class UserService : User.UserBase
{
    private readonly IMediator _mediator;

    public UserService(IMediator mediator)
    {
        _mediator = mediator;
    }

    public override async Task<RegisterResponse> Register(RegisterRequest request, ServerCallContext context)
    {
        var response = await _mediator.Send(
            new RegisterUserCommand(request.FirstName, request.LastName, request.Email, request.Password));

        return new RegisterResponse { AccessToken = response };
    }
}