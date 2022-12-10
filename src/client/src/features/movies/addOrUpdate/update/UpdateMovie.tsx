﻿import React, {useEffect, useState} from 'react';
import * as style from "../styled";
import * as formStyle from "../components/MovieDetailsForm/styled"
import AddImage from "../components/AddImage/AddImage";
import SectionContainer from "components/SectionContainer/SectionContainer";
import MovieDetailsForm, {Inputs} from "../components/MovieDetailsForm/MovieDetailsForm";
import {MovieClient} from "generated/movie/movie_pb_service";
import {useNavigate} from "react-router-dom";
import {useParams} from "react-router";
import {GetMovieDetailsRequest} from "generated/movie/movie_pb";
import {AgeRestrictions} from "utils/CustomTypes/AgeRestrictions";
import {MovieGenres} from "utils/CustomTypes/MovieGenres";

function UpdateMovie() {
    const {id} = useParams();
    const [image, setImage] = useState<string>("");
    const [backendError, setBackendError] = useState<string | null>(null);
    const [movieClient,] = useState<MovieClient>(new MovieClient(process.env.REACT_APP_SERVER_URL!));
    const [editedMovieData, setEditedMovieData] = useState<Inputs>();
    const [editedMovieGenres, setEditedMovieGenres] = useState<Array<number>>(new Array<number>())
    const navigate = useNavigate();

    useEffect(() => {
        if (id === undefined || parseInt(id) === 0) {
            navigate("/");
            return
        }

        const parsedId = parseInt(id);

        const getMovieDetailsRequest = new GetMovieDetailsRequest();
        getMovieDetailsRequest.setId(parsedId);
        movieClient.getMovieDetails(getMovieDetailsRequest, (error, responseMessage) => {
            if (responseMessage !== null) {
                const releaseDate = responseMessage.getReleasedate();
                const ageRestriction = AgeRestrictions.get(responseMessage.getAgerestriction());

                const inputs: Inputs = {
                    title: responseMessage.getTitle(),
                    releaseDate: releaseDate === undefined ? new Date() : releaseDate.toDate(),
                    duration: responseMessage.getDuration(),
                    description: responseMessage.getDescription(),
                    ageRestrictionId: ageRestriction === undefined ? 0 : ageRestriction
                }
                setEditedMovieData(inputs);

                const movieGenres = responseMessage.getGenresList().flatMap(genre => {
                    const mappedGenre = MovieGenres.get(genre);
                    return mappedGenre === undefined ? [] : mappedGenre;
                });
                setEditedMovieGenres(movieGenres);
                setImage("data:image/jpeg;base64," + responseMessage.getImage_asB64())
            } else if (error?.code == 5){
                setBackendError(error.message);
            } else {
                setBackendError("Wystąpił problem podczas połączenia z serwerem");
            }
        })
    }, [])

    function handleFormSubmit(data: Inputs, selectedMovieGenreIds: Array<number>) {

    }
    
    useEffect(()=> {
        console.log(image);
    }, [image])

    return (
        <style.DisplayContainer>
            <SectionContainer>
                {<style.Title>Edytowanie filmu</style.Title>}
                {backendError && <formStyle.ValidationText>{backendError}</formStyle.ValidationText>}
                <style.ContentContainer>
                    <AddImage width={"360px"} height={"480px"} image={image} onImageChange={setImage}/>
                    <MovieDetailsForm handleFormSubmit={handleFormSubmit} initialInputs={editedMovieData}
                                      initialMovieGenreIds={editedMovieGenres}/>
                </style.ContentContainer>
            </SectionContainer>
        </style.DisplayContainer>
    )
}

export default UpdateMovie;