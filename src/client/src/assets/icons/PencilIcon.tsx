﻿import * as React from 'react';
import SvgIcon from "./Interfaces";
import IconContainer from "./IconContainer"
import Theme from "../theme/ThemeProvider";

export const PencilIcon: SvgIcon = ({width = '25px', height = '25px'}): JSX.Element => {
  return (
    <IconContainer height={height} width={width}>
      <svg width={width} height={height} viewBox="0 0 19 29" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path fillRule="evenodd" clipRule="evenodd"
              d="M16.4641 1C14.5509 -0.104566 12.1046 0.550937 11 2.46411L1.2353 19.3771L8.1635 23.3771L8.3988 22.9696L1.47059 
              18.9696L1.72059 18.5365L8.6488 22.5365L17.5753 7.07545L10.6471 3.07545L10.8971 2.64243L17.8253 6.64243L17.9282 
              6.4641C19.0328 4.55093 18.3773 2.10457 16.4641 1ZM0.721157 25.6009L0.464092 28.7128L3.03057 26.9342L0.721157
               25.6009ZM0.743918 25.3254L3.25781 26.7768L8.16349 23.3771L1.23528 19.3771L0.743918 25.3254ZM3.3456 18.4219C3.22603
                18.3529 3.18506 18.2 3.2541 18.0804L11.0041 4.65705C11.0731 4.53748 11.226 4.49651 11.3456 4.56554C11.4652
                 4.63458 11.5061 4.78748 11.4371 4.90705L3.68711 18.3304C3.61807 18.45 3.46518 18.491 3.3456 18.4219ZM7.75742 
                 20.6804C7.68839 20.8 7.72936 20.9529 7.84893 21.0219C7.9685 21.091 8.1214 21.05 8.19044 20.9304L15.9404 
                 7.50702C16.0095 7.38744 15.9685 7.23454 15.8489 7.16551C15.7294 7.09647 15.5765 7.13744 15.5074 7.25702L7.75742
                  20.6804ZM5.77047 19.8219C5.6509 19.7529 5.60993 19.6 5.67897 19.4804L13.429 6.05702C13.498 5.93744 13.6509 
                  5.89647 13.7705 5.96551C13.89 6.03455 13.931 6.18744 13.862 6.30702L6.11198 19.7304C6.04294 19.85 5.89005 
                  19.891 5.77047 19.8219Z"
              fill={Theme.Palette.main}/>
      </svg>
    </IconContainer>
  )
};