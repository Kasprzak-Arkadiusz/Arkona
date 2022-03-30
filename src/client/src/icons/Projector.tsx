import * as React from 'react';
import { FC } from 'react';

export interface SvgIconProperties {
    width?: string;
    height?: string;
    className?: string;
}

export interface SvgIcon extends FC<SvgIconProperties> {}

export const ProjectorIcon: SvgIcon = ({
    width = '24',
    height = '24',
    className = '',
}): JSX.Element => {
    return (
        <div className={className}>
            <svg
                xmlns="http://www.w3.org/2000/svg"
                width={width}
                height={height}
                viewBox="0 0 24 24"
            >
                <g clipPath="url(#clip0_18_95)">
                    <g filter="url(#filter0_i_18_95)">
                        <circle cx="7" cy="5" r="4" fill="#FAFAFA" />
                    </g>
                    <g filter="url(#filter1_i_18_95)">
                        <circle cx="17" cy="5" r="4" fill="#FAFAFA" />
                    </g>
                    <g filter="url(#filter2_i_18_95)">
                        <path
                            d="M19 15L25 10.6699V19.3301L19 15Z"
                            fill="#FAFAFA"
                        />
                    </g>
                    <g filter="url(#filter3_i_18_95)">
                        <rect
                            x="3"
                            y="9"
                            width="18"
                            height="12"
                            fill="#FAFAFA"
                        />
                    </g>
                    <g filter="url(#filter4_i_18_95)">
                        <rect
                            x="2"
                            y="11"
                            width="1"
                            height="8"
                            fill="#FAFAFA"
                        />
                    </g>
                </g>
                <defs>
                    <filter
                        id="filter0_i_18_95"
                        x="3"
                        y="1"
                        width="10"
                        height="10"
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
                        <feOffset dx="2" dy="2" />
                        <feGaussianBlur stdDeviation="1.5" />
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
                            result="effect1_innerShadow_18_95"
                        />
                    </filter>
                    <filter
                        id="filter1_i_18_95"
                        x="13"
                        y="1"
                        width="10"
                        height="10"
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
                        <feOffset dx="2" dy="2" />
                        <feGaussianBlur stdDeviation="1.5" />
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
                            result="effect1_sinnerShadow_18_95"
                        />
                    </filter>
                    <filter
                        id="filter2_i_18_95"
                        x="19"
                        y="10.6699"
                        width="8"
                        height="10.6603"
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
                        <feOffset dx="2" dy="2" />
                        <feGaussianBlur stdDeviation="1.5" />
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
                            result="effect1_innerShadow_18_95"
                        />
                    </filter>
                    <filter
                        id="filter3_i_18_95"
                        x="3"
                        y="9"
                        width="20"
                        height="14"
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
                        <feOffset dx="2" dy="2" />
                        <feGaussianBlur stdDeviation="1.5" />
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
                            result="effect1_innerShadow_18_95"
                        />
                    </filter>
                    <filter
                        id="filter4_i_18_95"
                        x="2"
                        y="11"
                        width="3"
                        height="10"
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
                        <feOffset dx="2" dy="2" />
                        <feGaussianBlur stdDeviation="1.5" />
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
                            result="effect1_innerShadow_18_95"
                        />
                    </filter>
                    <clipPath id="clip0_18_95">
                        <rect width="26" height="22" fill="white" />
                    </clipPath>
                </defs>
            </svg>
        </div>
    );
};
