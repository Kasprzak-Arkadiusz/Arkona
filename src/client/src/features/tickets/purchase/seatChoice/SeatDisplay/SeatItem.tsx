import React, {useEffect, useState} from 'react';
import * as style from './styled';
import useAuth from "hooks/useAuth/useAuth";

interface Props {
    occupiedByUserId: number;
}

function SeatItem({occupiedByUserId}: Props) {
    const auth = useAuth();
    /* NaN ponieważ użytkownik jest niezalogowany.
       Potrzebne jest tworzenie unikalnego identyfikatora
       nawet dla niezalogowanych użytkowników*/
    const currentUserId = parseInt(auth.authData?.id!); 
    const defaultUserId = 0;
    const [isFreeState, setIsFreeState] = useState<boolean>(true);
    const [userIdState, setUserIdState] = useState<number>(0);

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
    }

    return (
        <style.SeatItemContainer isFree={isFreeState} onClick={handleClick}/>
    )
}

export default SeatItem;