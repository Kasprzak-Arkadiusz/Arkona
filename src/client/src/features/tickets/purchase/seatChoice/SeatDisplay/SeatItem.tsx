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

    if (seatId === 4 || seatId === 5 || seatId === 6){
        console.log(seatId, currentUserId, userIdState, isFreeState);
    }
    
    useEffect(() => {
        if (seatId === 4 || seatId === 5 || seatId === 6){
            console.log("UseEffect isFree, occupiedByUserId")
            console.log(seatId, currentUserId, userIdState, isFreeState);
        }
        setIsFreeState(isFree);
        setUserIdState(occupiedByUserId);
    }, [isFree, occupiedByUserId]);

    const handleClick = () => {
        console.log("Seat clicked")
        console.log(seatId, currentUserId, userIdState, isFreeState);
        const result = onClickHandler(seatId, currentUserId, isFreeState);
        if (!result) {
            return;
        }
        
        console.log(seatId, currentUserId, userIdState, isFreeState);
        if (isFreeState) {
            setIsFreeState(false);
            setUserIdState(currentUserId);
            return;
        }

        console.log(seatId, currentUserId, userIdState, isFreeState);
        if (userIdState === currentUserId) {
            setIsFreeState(true);
            setUserIdState(defaultUserId);
            return;
        }
    }
    
    return (
        <style.SeatItemContainer isFree={isFreeState} isCurrentUser={currentUserId === userIdState}
                                 onClick={handleClick} 
                                 // onMouseEnter={() => {console.log(seatId, currentUserId, userIdState, isFreeState)}}
        />
    )
}

export default SeatItem;