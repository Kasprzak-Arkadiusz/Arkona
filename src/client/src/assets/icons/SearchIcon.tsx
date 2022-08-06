import * as React from 'react';
import SvgIcon from "./Interfaces";
import IconContainer from "./IconContainer"

export const SearchIcon: SvgIcon = ({width = '25px', height = '25px'}): JSX.Element => {
    return (
        <IconContainer height={height} width={width}>
            <svg width={width} height={height} viewBox="0 0 26 25" fill="none" xmlns="http://www.w3.org/2000/svg">
                <g filter="url(#filter0_i_202_41)">
                    <path fillRule="evenodd" clipRule="evenodd"
                          d="M25.2669 8.42567C25.2669 13.079 21.9423 16.8513 17.8412 16.8513C16.0944 16.8513 14.4885 16.167 13.2204 15.0217C12.3297 16.6206 10.6894 18.6338 8.61539 20.5559C4.92789 23.9732 1.26562 25.8086 0.435487 24.6554C-0.394645 23.5021 1.92171 19.7969 5.60922 16.3796C7.67125 14.4687 9.7254 13.0524 11.2808 12.3767C10.7284 11.1983 10.4154 9.85348 10.4154 8.42567C10.4154 3.7723 13.74 0 17.8412 0C21.9423 0 25.2669 3.7723 25.2669 8.42567ZM22.2966 8.42566C22.2966 11.2177 20.3018 13.4811 17.8412 13.4811C15.3805 13.4811 13.3857 11.2177 13.3857 8.42566C13.3857 5.63364 15.3805 3.37026 17.8412 3.37026C20.3018 3.37026 22.2966 5.63364 22.2966 8.42566Z"
                          fill="#FAFAFA"/>
                </g>
                <defs>
                    <filter id="filter0_i_202_41" x="0.266907" y="0" width="27" height="27" filterUnits="userSpaceOnUse"
                            colorInterpolationFilters="sRGB">
                        <feFlood floodOpacity="0" result="BackgroundImageFix"/>
                        <feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape"/>
                        <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
                                       result="hardAlpha"/>
                        <feOffset dx="2" dy="2"/>
                        <feGaussianBlur stdDeviation="1.5"/>
                        <feComposite in2="hardAlpha" operator="arithmetic" k2="-1" k3="1"/>
                        <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0"/>
                        <feBlend mode="normal" in2="shape" result="effect1_innerShadow_202_41"/>
                    </filter>
                </defs>
            </svg>

        </IconContainer>
    )
};
