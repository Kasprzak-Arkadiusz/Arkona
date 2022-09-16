using Domain.Enums;

namespace Domain.Services;

public static class CinemaHallSectionService
{
    private const short NumberOfSeatsInARow = 24;
    private const short NumberOfSeatsInSideSection = NumberOfSeatsInARow / 4;
    private const int FirstRightSectionIndex = NumberOfSeatsInARow - NumberOfSeatsInSideSection + 1;

    public static CinemaHallSection GetSectionBySeatNumber(short number)
    {
        return (number % NumberOfSeatsInARow) switch
        {
            <= NumberOfSeatsInSideSection => CinemaHallSection.Left,
            > NumberOfSeatsInSideSection and < FirstRightSectionIndex => CinemaHallSection.Middle,
            >= FirstRightSectionIndex => CinemaHallSection.Right
        };
    }
}