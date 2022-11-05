import React from 'react'
import * as style from './styled';
import {TicketDetails} from "generated/order/order_pb";

interface Props {
    tickets: Array<TicketDetails>
}

function TicketItem({tickets}: Props) {
    return (
        <style.TicketsTable>
            <tbody>
            <style.TicketsTableRow>
                <style.TicketsTableHeader>Nr. miejsca</style.TicketsTableHeader>
                <style.TicketsTableHeader>Cena:</style.TicketsTableHeader>
                <style.TicketsTableHeader>Zniżka:</style.TicketsTableHeader>
            </style.TicketsTableRow>
            {tickets.map(ticket => {
                return (
                    <style.TicketsTableRow key={ticket.getSeatnumber()}>
                        <style.TicketsTableData>{ticket.getSeatnumber()}</style.TicketsTableData>
                        <style.TicketsTableData>{ticket.getPrice()}</style.TicketsTableData>
                        <style.TicketsTableData>{ticket.getDiscountname()}</style.TicketsTableData>
                    </style.TicketsTableRow>
                )
            })}
            </tbody>
        </style.TicketsTable>
    )
}

export default TicketItem;