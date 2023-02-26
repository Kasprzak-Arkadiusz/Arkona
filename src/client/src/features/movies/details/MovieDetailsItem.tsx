import React, {MouseEventHandler} from 'react';
import {DetailedMovieInfo} from "generated/movie/movie_pb";
import SectionContainer from "components/SectionContainer/SectionContainer";
import * as style from "./styled";
import FilmHolder from "features/home/FilmHolder/FilmHolder";
import MovieDetailedInformation from "./MovieDetailedInformation";
import {Role} from "utils/CustomTypes/Role";
import {PencilIcon} from "assets/icons/PencilIcon";
import {TrashBinIcon} from "assets/icons/TrashBinIcon";
import useAuth from "hooks/useAuth/useAuth";
import {IconButton} from "components/IconButton/IconButton";
import Theme from "assets/theme/ThemeProvider";
import {useNavigate} from "react-router-dom";

interface Props {
    movieInfo: DetailedMovieInfo;
    onButtonClickHandler: MouseEventHandler<HTMLButtonElement>
}

function MovieDetailsItem({movieInfo, onButtonClickHandler}: Props) {
    const auth = useAuth();
    const navigate = useNavigate();
    
    function onEditClick() {
        navigate(`/movie/update/${movieInfo.getId()}`);
    }
    
    return (
        <SectionContainer minHeight={"480px"} margin={"40px 12px"}>
            <style.ContentContainer>
                <FilmHolder id={movieInfo.getId()}
                            image={movieInfo.getImage_asB64()}
                            title={movieInfo.getTitle()}
                            displayTitle={false}
                            height={"480px"}
                            width={"320px"}
                            href={`${movieInfo.getId()}`}/>
                <style.InfoAndButtonContainer>
                    <MovieDetailedInformation title={movieInfo.getTitle()}
                                              genre={movieInfo.getGenresList().join(", ")}
                                              ageRestriction={movieInfo.getAgerestriction()}
                                              duration={movieInfo.getDuration()}
                                              releaseDate={movieInfo.getReleasedate()}
                                              description={movieInfo.getDescription()}/>
                    <style.ViewSeancesButton onClick={onButtonClickHandler}>Zobacz seanse</style.ViewSeancesButton>
                    <div>
                        {auth.authData?.role === Role.worker.toString() &&
                            <IconButton Icon={PencilIcon} backgroundColor={Theme.Palette.gray} title={"Edytuj film"} onClick={onEditClick}/>}
                        {auth.authData?.role === Role.worker.toString() &&
                            <IconButton Icon={TrashBinIcon} backgroundColor={Theme.Palette.gray} title={"Usuń film"}/>}
                    </div>
                </style.InfoAndButtonContainer>
            </style.ContentContainer>
        </SectionContainer>
    )
}

export default MovieDetailsItem;