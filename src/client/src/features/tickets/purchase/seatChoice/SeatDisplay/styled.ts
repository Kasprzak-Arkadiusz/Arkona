﻿import styled from "styled-components";

export const ContentContainer = styled.div`
    display: flex;
    flex-direction: column;
    margin: auto;
`

export const SeatDisplayContainer = styled.div`
    display: flex;
    flex-direction: row;
    margin: auto;
    justify-content: center;
`

export const Title = styled.span`
    margin: 10px;
    font-size: 16px;
`

interface SectionProps {
    width: number;
}

export const Screen = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    width: 290px;
    height: 30px;
    margin: 10px auto;
    background: ${props => props.theme.Palette.textMain};
    border-style: double;
    border-width: 10px;
`

export const LeftSection = styled.div<SectionProps>`
    width: ${props => `${props.width * 25}px`};
    display: flex;
    flex-wrap: wrap;
`

export const MiddleSection = styled.div<SectionProps>`
    margin: 0px 10px;
    width: ${props => `${props.width * 25}px`};
    display: flex;
    flex-wrap: wrap;
`

export const RightSection = styled.div<SectionProps>`
    width: ${props => `${props.width * 25}px`};
    display: flex;
    flex-wrap: wrap;
`

export const RowLabelsContainer = styled.div`
    display: flex;
    flex-direction: column;
`

export const RowLabel = styled.span`
    margin: 5px;
`

interface SeatItemProps {
    isFree: boolean;
}

export const DisabledSeatItemContainer = styled.div<SeatItemProps>`
    width: 15px;
    height: 15px;
    margin: 5px;
    background: ${props => props.isFree ? props.theme.Palette.free : props.theme.Palette.taken};
`

export const SeatItemContainer = styled.div<SeatItemProps>`
    width: 15px;
    height: 15px;
    margin: 5px;
    background: ${props => props.isFree ? props.theme.Palette.free : props.theme.Palette.taken};
       
    cursor: ${props => props.isFree ? "pointer" : "auto"};
`