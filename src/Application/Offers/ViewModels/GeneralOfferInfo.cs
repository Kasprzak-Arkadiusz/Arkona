using Application.Common.Mappings;
using AutoMapper;
using Domain.Entities;

namespace Application.Offers.ViewModels;

public class GeneralOfferInfo : IMapFrom<Offer>
{
    public short Id { get; set; }
    public string Name { get; set; }
    public byte[]? Image { get; set; }

    public GeneralOfferInfo(short id, string name, byte[]? image)
    {
        Id = id;
        Name = name;
        Image = image;
    }

    public void Mapping(Profile profile)
    {
        profile.CreateMap<Offer, GeneralOfferInfo>();
    }
}