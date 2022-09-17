import React from 'react';
import NavigationButtons from "../NavigationButtons/NavigationButtons";
import {useNavigate} from "react-router-dom";

function PurchaseSummary() {
    const navigate = useNavigate();
    return (
        <div>
            <NavigationButtons onPrevClick={() => navigate(-1)}
                               onNextClick={() => navigate("/")}/>
        </div>
    )
}

export default PurchaseSummary;