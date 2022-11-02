using Application.Common.Exceptions;

namespace API.Validators.Orders;

public static class FinalizeOrderValidator
{
    private const string TicketsAndSeatEqualNumber = "Liczba wybranych miejsc jest różna od liczby biletów";

    public static void Validate(FinalizeOrderRequest request)
    {
        if (request.SeatIds.Count != request.SelectedTickets.Sum(st => st.Count))
        {
            throw new InvalidArgumentException(TicketsAndSeatEqualNumber);
        }
    }
}