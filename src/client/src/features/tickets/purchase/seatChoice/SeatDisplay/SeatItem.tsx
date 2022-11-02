import React, {useEffect, useState} from 'react';
import * as style from './styled';
import {useUserId} from "hooks/useUserId";

interface Props {
    seatId: number;
    isFree: boolean;
    occupiedByUserId: string;
    onClickHandler: (seatId: number, userId: string, seatState: boolean) => boolean;
}

function SeatItem({seatId, isFree, occupiedByUserId, onClickHandler}: Props) {
    const currentUserId = useUserId();
    const defaultUserId = "0";
    const [isFreeState, setIsFreeState] = useState<boolean>(true);
    const [userIdState, setUserIdState] = useState<string>(defaultUserId);
    
    useEffect(() => {
        setIsFreeState(isFree);
        setUserIdState(occupiedByUserId);
    }, [isFree, occupiedByUserId]);

    const handleClick = () => {
        const result = onClickHandler(seatId, currentUserId, isFreeState);
        if (!result) {
            return;
        }
        
        if (isFreeState) {
            setIsFreeState(false);
            setUserIdState(currentUserId);
            return;
        }

        if (userIdState === currentUserId) {
            setIsFreeState(true);
            setUserIdState(defaultUserId);
            return;
        }
    }
    
    return (
        <style.SeatItemContainer isFree={isFreeState} isCurrentUser={currentUserId === userIdState} onClick={handleClick}/>
    )
}

export default SeatItem;