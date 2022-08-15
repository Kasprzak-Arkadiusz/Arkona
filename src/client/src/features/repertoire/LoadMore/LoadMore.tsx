import React from 'react';
import SectionContainer from "components/SectionContainer/SectionContainer";
import * as style from './styled'

interface Props {
    onClickHandler: () => void;
}


function LoadMore({onClickHandler} : Props) {
    const onClickPrivateHandler = (event: React.MouseEvent<HTMLSpanElement>) => {
        
    }
    
    return (
       <SectionContainer margin={"0px 12px 40px 12px"}>
           <style.Text onClick={onClickHandler}>Załaduj więcej</style.Text>
       </SectionContainer>
    )
}

export default LoadMore;
