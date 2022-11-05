namespace Application.Orders.ViewModels;

public class OrderDetailsVm
{
    public string OrderNumber { get; set; }
    public DateTime DateOfPurchase { get; set; }
    public string MovieTitle { get; set; }
    public DateTime DateOfSeance { get; set; }
    public decimal TotalPrice { get; set; }
    public int HallNumber { get; set; }
    public List<TicketDetailsVm> Tickets { get; set; }
}