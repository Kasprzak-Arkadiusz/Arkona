import * as React from 'react';
import SvgIcon from "./Interfaces";

export const CalendarIcon: SvgIcon = ({width = '25px', height = '25px'}): JSX.Element => {
    return (
            <svg width={width} height={height} viewBox="0 0 25 25" fill="none" xmlns="http://www.w3.org/2000/svg">
                <rect y="0.833313" width="20" height="20" rx="3.33333" fill="black"/>
                <rect x="0.833313" y="3.33331" width="18.3333" height="16.6667" rx="1.66667" fill="#FAFAFA"/>
                <rect x="3.54165" y="0.208333" width="2.08333" height="4.58333" rx="1.04167" fill="black" stroke="#FAFAFA" strokeWidth="0.416667"/>
                <rect x="8.95833" y="0.208333" width="2.08333" height="4.58333" rx="1.04167" fill="black" stroke="#FAFAFA" strokeWidth="0.416667"/>
                <rect x="14.375" y="0.208333" width="2.08333" height="4.58333" rx="1.04167" fill="black" stroke="#FAFAFA" strokeWidth="0.416667"/>
                <rect x="2.91669" y="5.83331" width="3.33333" height="3.33333" rx="0.833333" fill="black"/>
                <rect x="2.91669" y="5.83331" width="3.33333" height="3.33333" rx="0.833333" fill="black"/>
                <rect x="2.91669" y="10.8333" width="3.33333" height="3.33333" rx="0.833333" fill="black"/>
                <rect x="2.91669" y="15.8333" width="3.33333" height="3.33333" rx="0.833333" fill="black"/>
                <rect x="8.33331" y="15.8333" width="3.33333" height="3.33333" rx="0.833333" fill="black"/>
                <rect x="8.33331" y="10.8333" width="3.33333" height="3.33333" rx="0.833333" fill="black"/>
                <rect x="13.75" y="10.8333" width="3.33333" height="3.33333" rx="0.833333" fill="black"/>
                <rect x="8.33331" y="5.83331" width="3.33333" height="3.33333" rx="0.833333" fill="black"/>
                <rect x="13.75" y="5.83331" width="3.33333" height="3.33333" rx="0.833333" fill="black"/>
                <circle cx="18.75" cy="18.75" r="6.25" fill="black"/>
                <circle cx="18.75" cy="18.75" r="5.41667" fill="#FAFAFA"/>
                <rect x="18.5417" y="18.75" width="3.33333" height="0.625" rx="0.3125" fill="black"/>
                <rect x="18.5417" y="19.1667" width="5" height="0.416667" rx="0.208333" transform="rotate(-90 18.5417 19.1667)" fill="black"/>
            </svg>
    )
};
