using Application.ViewModels;
using AutoMapper;

namespace API.Common.Mapping;

public class MappingProfile : Profile
{
    public MappingProfile()
    {
        CreateMap<AuthViewModel, AuthenticationResponse>();
    }
}