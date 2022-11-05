import styled from "styled-components";

export const Container = styled.div`
    max-width: 640px;
    display: flex;
    flex-direction: column;
    margin: auto;
    padding: 0px 20px 20px 20px;
`

export const OrderDetailsContainer = styled.div`
    display: flex;
    flex-wrap: wrap;
    margin: 10px 10px 0px 10px;
    justify-content: center;

    background-color: ${props => props.theme.Palette.bluish};
    border-radius: 15px 15px 0px 0px;
    border-style: solid;
    border-color: ${props => props.theme.Palette.rootBackground};
`

export const OrderDetailsItemContainer = styled.div`
    display: flex;
    margin: 10px;
`

export const DetailsItemLabel = styled.label`
    padding-right: 10px;
    color: ${props => props.theme.Palette.textMain};
    font-weight: bold;
`

export const DetailsItemValue = styled.span`
    margin: auto;
`

export const TicketsTable = styled.table`
    margin: 0px 25px;
    background-color: ${props => props.theme.Palette.bluish};
    border-radius: 0px 0px 15px 15px;
    border-style: solid;
    border-color: ${props => props.theme.Palette.rootBackground};
    border-top-style: hidden;
`

export const TicketsTableRow = styled.tr`
    color: ${props => props.theme.Palette.textMain};
`

export const TicketsTableHeader = styled.th`
`

export const TicketsTableData = styled.td`
`