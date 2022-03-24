namespace Domain.Entities;

public class Order
{
    public int Id { get; private set; }
    public string Number { get; private set; }
    public DateTime DateOfOrder { get; private set; }
    
    public Order(DateTime dateOfOrder)
    {
        DateOfOrder = dateOfOrder;
        Number = Id.ToString("N9");
    }
}