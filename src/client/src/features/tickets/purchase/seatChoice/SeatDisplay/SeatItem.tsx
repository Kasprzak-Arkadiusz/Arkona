import React, {useEffect, useState} from 'react';
import * as style from './styled';
import {useUserId} from "hooks/useUserId";

interface Props {
    seatId: number;
    occupiedByUserId: string;
    onClickHandler: (seatId: number, userId: string, seatState: boolean) => void;
}

function SeatItem({seatId, occupiedByUserId, onClickHandler}: Props) {
    const currentUserId = useUserId();
    const defaultUserId = "0";
    const [isFreeState, setIsFreeState] = useState<boolean>(true);
    const [userIdState, setUserIdState] = useState<string>(defaultUserId);

    useEffect(() => {
        setUserIdState(occupiedByUserId);
    }, [occupiedByUserId]);

    const handleClick = () => {
        // Wolne
        if (isFreeState) {
            // Zmień na zajęte przez tego użytkownika    
            setIsFreeState(false);
            setUserIdState(currentUserId);
        }

        // Zajęte przez tego użytkownika
        if (userIdState === currentUserId) {
            // Zmień na wolne
            setIsFreeState(true);
            setUserIdState(defaultUserId);
        }

        // Zajęte przez innego użytkownika
        // zignoruj
        onClickHandler(seatId, currentUserId, isFreeState);
    }

    return (
        <style.SeatItemContainer isFree={isFreeState} onClick={handleClick}/>
    )
}

export default SeatItem;