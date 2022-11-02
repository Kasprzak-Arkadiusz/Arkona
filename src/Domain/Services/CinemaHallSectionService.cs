using Domain.Enums;

namespace Domain.Services;

public static class CinemaHallSectionService
{
    public const short NumberOfSeatsInARow = 24;
    public const short NumberOfSeatsInSideSection = NumberOfSeatsInARow / 4;
    private const int FirstRightSectionIndex = NumberOfSeatsInARow - NumberOfSeatsInSideSection + 1;

    public static CinemaHallSection GetSectionBySeatNumber(short number)
    {
        var result = number % NumberOfSeatsInARow == 0 ? NumberOfSeatsInARow : number % NumberOfSeatsInARow;
        
        return (result) switch
        {
            <= NumberOfSeatsInSideSection => CinemaHallSection.Left,
            > NumberOfSeatsInSideSection and < FirstRightSectionIndex => CinemaHallSection.Middle,
            >= FirstRightSectionIndex => CinemaHallSection.Right
        };
    }
}