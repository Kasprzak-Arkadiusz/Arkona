using Application.Common.Mappings;
using AutoMapper;
using Domain.Entities;

namespace Application.Movies.ViewModels;

public class DetailedMovieInfo : IMapFrom<Movie>
{
    public int Id { get; set; }
    public byte[]? Image { get; set; }
    public string Title { get; set; }
    public DateOnly ReleaseDate { get; set; }
    public short Duration { get; set; }
    public List<string> Genres { get; set; }
    public string AgeRestriction { get; set; }
    public string Description { get; set; }

    public DetailedMovieInfo() { }

    public void Mapping(Profile profile)
    {
        profile.CreateMap<Movie, DetailedMovieInfo>()
            .ForMember(vm => vm.Genres, opt => opt.MapFrom(m => m.MovieGenres.Select(mg => mg.Genre.Name)))
            .ForMember(vm => vm.AgeRestriction, opt => opt.MapFrom(m => m.AgeRestriction.Name));
    }
}