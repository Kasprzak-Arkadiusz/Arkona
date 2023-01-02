import * as React from 'react';
import SvgIcon from "../../assets/icons/Interfaces";
import * as style from "./styled";
import {MouseEventHandler} from "react";

interface Props {
    Icon: SvgIcon;
    backgroundColor?: string;
    title: string;
    onClick?: MouseEventHandler<HTMLButtonElement>
}

export const IconButton = ({Icon, backgroundColor = "#ffffff", title, onClick}: Props): JSX.Element => {
  return (
    <style.Button backgroundColor={backgroundColor} title={title} onClick={onClick}>
      <Icon/>
    </style.Button>
  )
};
