﻿namespace Domain.Entities;

public class TicketDiscount
{
    public byte Id { get; set; }
    public string Name { get; private set; }
    public string Description { get; private set; }
    public decimal DiscountValue { get; private set; }

    public ICollection<Ticket>? Tickets { get; set; }
    private TicketDiscount() {}

    public TicketDiscount(string name, string description, decimal discountValue)
    {
        Name = name;
        Description = description;
        DiscountValue = discountValue;
    }
}