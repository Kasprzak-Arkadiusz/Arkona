import React from 'react'
import * as style from './styled';

function TicketItem() {
    return (
        <style.TicketsTable>
            <tbody>
                <style.TicketsTableRow>
                    <style.TicketsTableHeader>Nr. miejsca</style.TicketsTableHeader>
                    <style.TicketsTableHeader>Cena:</style.TicketsTableHeader>
                    <style.TicketsTableHeader>Zniżka:</style.TicketsTableHeader>
                </style.TicketsTableRow>
                <style.TicketsTableRow>
                    <style.TicketsTableData>31</style.TicketsTableData>
                    <style.TicketsTableData>10,00 zł</style.TicketsTableData>
                    <style.TicketsTableData>Zniżka ulgowa</style.TicketsTableData>
                </style.TicketsTableRow>
                <style.TicketsTableRow>
                    <style.TicketsTableData>32</style.TicketsTableData>
                    <style.TicketsTableData>20,00 zł</style.TicketsTableData>
                    <style.TicketsTableData>Brak zniżki</style.TicketsTableData>
                </style.TicketsTableRow>
                <style.TicketsTableRow>
                    <style.TicketsTableData>33</style.TicketsTableData>
                    <style.TicketsTableData>15,00 zł</style.TicketsTableData>
                    <style.TicketsTableData>Zniżka studencka</style.TicketsTableData>
                </style.TicketsTableRow>
            </tbody>
        </style.TicketsTable>
    )
}

export default TicketItem;