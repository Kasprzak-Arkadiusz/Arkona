import {FC} from "react";

interface SvgIconProperties {
    width?: string;
    height?: string;
}

interface SvgIcon extends FC<SvgIconProperties> {
}

export default SvgIcon;