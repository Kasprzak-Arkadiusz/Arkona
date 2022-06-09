import * as React from 'react';
import {FC} from 'react';
import styled from "styled-components";

export interface SvgIconProperties {
    width?: string;
    height?: string;
}

export interface SvgIcon extends FC<SvgIconProperties> {
}

const Container = styled.svg`
    display: inline-block;
    position: relative;
    width: ${props => props.width};
    height: ${props => props.height};
`

export const PasswordShownIcon: SvgIcon = ({width = '24px', height = '24px'}): JSX.Element => {
    return (
        <Container
            width={width}
            height={height}
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
        >
            <g clipPath="url(#clip0_100_51)">
                <g filter="url(#filter0_i_100_51)">
                    <path
                        d="M24 12C22 15 18.6274 18 12 18C5.37258 18 2 15 0 12C2 9 5.37258 6 12 6C18.6274 6 22 9 24 12Z"
                        fill="#C4C4C4"
                    />
                </g>
                <path
                    d="M24 12C22 15 18.6274 18 12 18C5.37258 18 2 15 0 12C2 9 5.37258 6 12 6C18.6274 6 22 9 24 12Z"
                    stroke="black"
                    strokeOpacity="0.1"
                />
                <circle cx="12" cy="12" r="5" fill="#EAE9E9"/>
                <g filter="url(#filter1_i_100_51)">
                    <circle cx="12" cy="12" r="3" fill="#C4C4C4"/>
                </g>
            </g>
            <defs>
                <filter
                    id="filter0_i_100_51"
                    x="-0.600922"
                    y="5.5"
                    width="29.2018"
                    height="17"
                    filterUnits="userSpaceOnUse"
                    colorInterpolationFilters="sRGB"
                >
                    <feFlood floodOpacity="0" result="BackgroundImageFix"/>
                    <feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape"/>
                    <feColorMatrix
                        in="SourceAlpha"
                        type="matrix"
                        values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
                        result="hardAlpha"
                    />
                    <feOffset dx="4" dy="4"/>
                    <feGaussianBlur stdDeviation="2"/>
                    <feComposite in2="hardAlpha" operator="arithmetic" k2="-1" k3="1"/>
                    <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.2 0"/>
                    <feBlend mode="normal" in2="shape" result="effect1_innerShadow_100_51"/>
                </filter>
                <filter
                    id="filter1_i_100_51"
                    x="9"
                    y="9"
                    width="7"
                    height="7"
                    filterUnits="userSpaceOnUse"
                    colorInterpolationFilters="sRGB"
                >
                    <feFlood floodOpacity="0" result="BackgroundImageFix"/>
                    <feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape"/>
                    <feColorMatrix
                        in="SourceAlpha"
                        type="matrix"
                        values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
                        result="hardAlpha"
                    />
                    <feOffset dx="2" dy="1"/>
                    <feGaussianBlur stdDeviation="0.5"/>
                    <feComposite in2="hardAlpha" operator="arithmetic" k2="-1" k3="1"/>
                    <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0"/>
                    <feBlend mode="normal" in2="shape" result="effect1_innerShadow_100_51"/>
                </filter>
                <clipPath id="clip0_100_51">
                    <rect width="24" height="24" fill="white"/>
                </clipPath>
            </defs>
        </Container>
    );
};
