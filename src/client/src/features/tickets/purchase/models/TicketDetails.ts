import {TicketDiscountsDetails} from "generated/ticketDiscount/ticketDiscount_pb";

export class TicketDetails {
    public id: number;
    public name: string;
    public discount: string;
    public numberOfTickets: number;
    
    constructor(details: TicketDiscountsDetails, numberOfTickets: number) {
        this.id = details.getId();
        this.name = details.getName();
        this.discount = details.getDiscountvalue();
        this.numberOfTickets = numberOfTickets;
    }
}