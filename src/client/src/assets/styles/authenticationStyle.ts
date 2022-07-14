import styled from "styled-components";
import {Link} from "react-router-dom";

export const container = styled.div`
    margin: 40px 12px auto 12px;
    text-align: center;

    background-color: ${props => props.theme.Palette.main};
    border-radius: 50px;
`

export const externalProviderContainer = styled.div`
    width: 340px;
    height: auto;
    margin: 10px auto auto auto;
    display: block;   
`

export const text = styled.span`
    display: block;
    margin-bottom: 10px;

    font-family: ${props => props.theme.Fonts.casual};
    font-style: normal;
    font-weight: 500;
    font-size: 14px;
    line-height: 16px;

    color: ${props => props.theme.Palette.textMain};
`

export const redirectContainer = styled.section`
    width: 340px;
    margin: 10px auto 0 auto;
    display: block;
    padding: 0 0 10px 0;
`

export const redirectContainerSpan =styled.span`
    line-height: 14px;
    margin: 0 5px 0 auto;
`

export const redirectContainerLink =styled(Link)`
    font-family: ${props => props.theme.Fonts.casual};
    font-style: normal;
    font-weight: 500;
    font-size: 14px;
    line-height: 14px;
    margin: 0 auto 0 5px;
    text-decoration: none;

    color: ${props => props.theme.Palette.textMain};
`