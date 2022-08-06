import SvgIcon from "assets/icons/Interfaces";
import {TitleContainer, TitleSpan} from "./styled"

interface Props {
    Component: SvgIcon;
    title: string;
    width?: string;
    height?: string;
}

function IconTitle({Component, title, width, height}: Props) {
    return (
        <TitleContainer>
            <TitleSpan>{title}</TitleSpan>
            {<Component width={width} height={height}/>}
        </TitleContainer>
    );
}

export default IconTitle;