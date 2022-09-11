import React from 'react'
import {DayOfWeek} from "utils/CustomTypes/DayOfWeek";
import * as style from "./styled";
import {SeanceInfo} from "generated/seance/seance_pb";
import {useNavigate} from "react-router-dom";

interface Props {
    dayOfWeek: DayOfWeek | string;
    seanceDetails: SeanceInfo[];
}

function DayOfWeekItem({dayOfWeek, seanceDetails}: Props) {
    const navigate = useNavigate();

    return (
        <style.DayOfWeekContainer>
            <style.LabelContainer>
                <style.DayOfWeekLabel>{dayOfWeek}</style.DayOfWeekLabel>
            </style.LabelContainer>
            <style.ButtonContainer>
                {seanceDetails.map((item) => {
                    return <style.SeanceButton key={item.getId()}
                                               onClick={() => navigate(`/tickets-purchase/${item.getId()}`)}>{item.getTime()}</style.SeanceButton>
                })}
            </style.ButtonContainer>
        </style.DayOfWeekContainer>
    )
}

export default DayOfWeekItem;