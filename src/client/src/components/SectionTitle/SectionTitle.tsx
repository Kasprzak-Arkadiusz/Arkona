import SvgIcon from "assets/icons/Interfaces";
import {TitleContainer, TitleSpan} from "./styled"

interface Props {
    Component: SvgIcon;
    title: string;
}

function SectionTitle({Component, title}: Props) {
    return (
        <TitleContainer>
            <TitleSpan>{title}</TitleSpan>
            {<Component/>}
        </TitleContainer>
    );
}

export default SectionTitle;