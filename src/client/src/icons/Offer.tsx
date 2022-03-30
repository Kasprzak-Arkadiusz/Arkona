import * as React from 'react';
import { FC } from 'react';

export interface SvgIconProperties {
    width?: string;
    height?: string;
    color?: string;
    className?: string;
}

export interface SvgIcon extends FC<SvgIconProperties> {}

export const OfferIcon: SvgIcon = ({
    width = '40',
    height = '20',
    color = '#FAFAFA',
    className = '',
}): JSX.Element => {
    return (
        <div className={className}>
            <svg
                width={width}
                height={height}
                viewBox="0 0 40 20"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
            >
                <g clipPath="url(#clip0_20_60)">
                    <path
                        d="M20.5187 12.125C20.5187 11.4084 20.7687 10.8125 21.2687 10.3375C21.7687 9.85418 22.4187 9.61252 23.2187 9.61252C24.0103 9.61252 24.6562 9.85002 25.1562 10.325C25.6562 10.8 25.9062 11.4 25.9062 12.125C25.9062 12.8667 25.652 13.4709 25.1437 13.9375C24.6353 14.3959 23.9937 14.625 23.2187 14.625C22.427 14.625 21.777 14.3917 21.2687 13.925C20.7687 13.45 20.5187 12.85 20.5187 12.125ZM22.0187 12.125C22.0187 12.5334 22.1353 12.8542 22.3687 13.0875C22.6103 13.3125 22.8937 13.425 23.2187 13.425C23.552 13.425 23.8312 13.3084 24.0562 13.075C24.2895 12.8417 24.4062 12.525 24.4062 12.125C24.4062 11.725 24.2937 11.4084 24.0687 11.175C23.8437 10.9417 23.5603 10.825 23.2187 10.825C22.877 10.825 22.5895 10.9417 22.3562 11.175C22.1312 11.4084 22.0187 11.725 22.0187 12.125ZM14.1062 6.78752C14.1062 6.07085 14.352 5.47502 14.8437 5.00002C15.3437 4.52502 15.9937 4.28752 16.7937 4.28752C17.5853 4.28752 18.2312 4.52502 18.7312 5.00002C19.2312 5.46668 19.4812 6.06252 19.4812 6.78752C19.4812 7.52085 19.227 8.12502 18.7187 8.60002C18.2187 9.06668 17.577 9.30002 16.7937 9.30002C16.002 9.30002 15.3562 9.06252 14.8562 8.58752C14.3562 8.11252 14.1062 7.51252 14.1062 6.78752ZM15.6062 6.78752C15.6062 7.19585 15.7228 7.51668 15.9562 7.75002C16.1895 7.97502 16.4687 8.08752 16.7937 8.08752C17.127 8.08752 17.4062 7.97085 17.6312 7.73752C17.8645 7.49585 17.9812 7.17918 17.9812 6.78752C17.9812 6.38752 17.8687 6.07085 17.6437 5.83752C17.4187 5.60418 17.1353 5.48752 16.7937 5.48752C16.452 5.48752 16.1687 5.60418 15.9437 5.83752C15.7187 6.07085 15.6062 6.38752 15.6062 6.78752ZM15.7062 14.4625L22.6687 4.45002H24.3187L17.3312 14.4625H15.7062Z"
                        fill="white"
                    />
                    <g opacity="0.5" filter="url(#filter0_i_20_60)">
                        <path
                            fillRule="evenodd"
                            clipRule="evenodd"
                            d="M0 0H40L33.6001 6.48852e-06C33.6001 3.53653 36.3435 6.39995 40 6.4V20L40 13.6C36.4634 13.6 33.6 16.3435 33.6 20L40 20H6.38813C6.19017 16.65 3.51757 14 0 14V2.47955e-05L6.48852e-06 6.40002C3.53656 6.40002 6.4 3.65653 6.4 2.47955e-05H0V0Z"
                            fill={color}
                        />
                    </g>
                </g>
                <defs>
                    <filter
                        id="filter0_i_20_60"
                        x="0"
                        y="0"
                        width="41.6"
                        height="21.6"
                        filterUnits="userSpaceOnUse"
                        colorInterpolationFilters="sRGB"
                    >
                        <feFlood floodOpacity="0" result="BackgroundImageFix" />
                        <feBlend
                            mode="normal"
                            in="SourceGraphic"
                            in2="BackgroundImageFix"
                            result="shape"
                        />
                        <feColorMatrix
                            in="SourceAlpha"
                            type="matrix"
                            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
                            result="hardAlpha"
                        />
                        <feMorphology
                            radius="2"
                            operator="erode"
                            in="SourceAlpha"
                            result="effect1_innerShadow_20_60"
                        />
                        <feOffset dx="1.6" dy="1.6" />
                        <feGaussianBlur stdDeviation="2" />
                        <feComposite
                            in2="hardAlpha"
                            operator="arithmetic"
                            k2="-1"
                            k3="1"
                        />
                        <feColorMatrix
                            type="matrix"
                            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0"
                        />
                        <feBlend
                            mode="normal"
                            in2="shape"
                            result="effect1_innerShadow_20_60"
                        />
                    </filter>
                    <clipPath id="clip0_20_60">
                        <rect width="40" height="20" fill="white" />
                    </clipPath>
                </defs>
            </svg>
        </div>
    );
};
