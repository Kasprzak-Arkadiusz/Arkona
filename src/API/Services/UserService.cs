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

    public override async Task<RegisterResponse> Register(RegisterRequest request, ServerCallContext context)
    {
        var viewModel = await _mediator.Send(new RegisterUserCommand(request.FirstName, request.LastName, request.Email,
            request.Password));

        return _mapper.Map<RegisterResponse>(viewModel);
    }

    public override async Task<RegisterResponse> ExternalRegister(ExternalRegisterRequest request,
        ServerCallContext context)
    {
        var viewModel =
            await _mediator.Send(new ExternalLoginUserCommand(request.AccessToken, request.Provider.ToString()));
        
        return _mapper.Map<RegisterResponse>(viewModel);
    }

    public override async Task<LoginResponse> Login(LoginRequest request, ServerCallContext context)
    {
        var response = await _mediator.Send(new LoginUserCommand(request.Email, request.Password));

        return new LoginResponse { AccessToken = response };
    }
}