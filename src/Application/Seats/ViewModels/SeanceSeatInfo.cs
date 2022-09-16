using Domain.Enums;

namespace Application.Seats.ViewModels;

public class SeanceSeatInfo
{
    public int Id { get; set; }
    public char Row { get; set; }
    public short Number { get; set; }
    public bool IsFree { get; set; }
    public CinemaHallSection Section { get; set; }
}