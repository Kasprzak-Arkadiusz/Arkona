﻿namespace Domain.Entities;

public class AmountOffer : Offer
{
    public byte RequiredNumberOfTickets { get; private set; }
    public byte DiscountedNumberOfTickets { get; private set; }
    
    public AmountOffer(string name, string description, decimal discountValue, byte requiredNumberOfTickets, byte discountedNumberOfTickets) 
        : base(name, description, discountValue)
    {
        RequiredNumberOfTickets = requiredNumberOfTickets;
        DiscountedNumberOfTickets = discountedNumberOfTickets;
    }
}