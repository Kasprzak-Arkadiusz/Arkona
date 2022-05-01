using Application.Common.Models;
using AutoMapper;
using Domain.Entities;
using Infrastructure.Identity;

namespace Infrastructure.Common.Mappings;

public class InfrastructureProfile : Profile
{
    public InfrastructureProfile()
    {
        CreateMap<AppUser, User>();
        CreateMap< RegisterParams, AppUser>();
    }
}