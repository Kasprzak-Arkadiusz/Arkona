import styled from "styled-components";
import React, {FC} from 'react';
import {SvgIconProperties} from "../../../assets/icons/Logo";

interface Props {
    Component: FC<SvgIconProperties>;
    title: string;
}

const TitleContainer = styled.div`
    display: flex;
    justify-content: center;
    padding: 10px 0 10px 0;

    border-bottom-style: solid;
    border-bottom-color: #121212;
    border-bottom-width: 5px;
`

const TitleSpan = styled.div`
    width: auto;
    display: inline-block;
    margin: auto 5px auto 0;
    padding-top: 4px;

    font-family: 'Gugi', serif;
    font-style: normal;
    font-weight: 400;
    font-size: 18px;

    color: #fafafa;
`

function Title({Component, title}: Props) {
    return (
        <TitleContainer>
            <TitleSpan>{title}</TitleSpan>
            {<Component/>}
        </TitleContainer>
    );
}

export default Title;