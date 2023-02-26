import * as React from 'react';
import SvgIcon from "./Interfaces";
import IconContainer from "./IconContainer"
import Theme from "../theme/ThemeProvider";

export const TrashBinIcon: SvgIcon = ({width = '25px', height = '25px'}): JSX.Element => {
  return (
    <IconContainer height={height} width={width}>
      <svg width={width} height={height} viewBox="0 0 24 34" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path fillRule="evenodd" clipRule="evenodd"
              d="M11 0C10.4477 0 10 0.447708 10 1V2H14V1C14 0.447708 13.5523 0 13 0H11ZM2 3C0.895447 3 0 3.89543 0 
              5V8H24V5C24 3.89543 23.1046 3 22 3H2ZM22 9H2V30C2 32.2091 3.79083 34 6 34H18C20.2092 34 22 32.2091 22 
              30V9ZM5.5 31C5.22388 31 5 30.7761 5 30.5V11.5C5 11.2239 5.22388 11 5.5 11C5.77612 11 6 11.2239 6 
              11.5V30.5C6 30.7761 5.77612 31 5.5 31ZM18 30.5C18 30.7761 18.2239 31 18.5 31C18.7761 31 19 30.7761 
              19 30.5V11.5C19 11.2239 18.7761 11 18.5 11C18.2239 11 18 11.2239 18 11.5V30.5ZM12 31C11.7239 31 11.5 
              30.7761 11.5 30.5V11.5C11.5 11.2239 11.7239 11 12 11C12.2761 11 12.5 11.2239 12.5 11.5V30.5C12.5 30.7761 
              12.2761 31 12 31Z"
              fill={Theme.Palette.main}/>
      </svg>
    </IconContainer>
  )
};
