import React, {useEffect, useState} from 'react';
import * as style from './styled';

interface Props {
    isFree: boolean;
}

function SeatItem({isFree}: Props) {
    const [isFreeTest, setIsFreeTest] = useState<boolean>(true);
    
    useEffect(() => {
        setIsFreeTest(isFree);
    }, [isFree]);
    
    const handleClick = () => {
        if (isFree){
            setIsFreeTest(prevState => !prevState)
        }
    }
    
    return (
        <style.SeatItemContainer isFree={isFreeTest} onClick={handleClick}/>
    )
}

export default SeatItem;