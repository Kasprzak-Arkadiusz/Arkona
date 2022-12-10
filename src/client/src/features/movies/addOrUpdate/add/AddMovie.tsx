import React, {useState} from 'react';
import * as style from "../styled";
import * as formStyle from "../components/MovieDetailsForm/styled"
import AddImage from "../components/AddImage/AddImage";
import SectionContainer from "components/SectionContainer/SectionContainer";
import MovieDetailsForm, {Inputs} from "../components/MovieDetailsForm/MovieDetailsForm";
import {MovieClient} from "generated/movie/movie_pb_service";
import {AddMovieRequest} from "generated/movie/movie_pb";
import {Timestamp} from "google-protobuf/google/protobuf/timestamp_pb";
import {useNavigate} from "react-router-dom";

function AddMovie() {
    const [image, setImage] = useState<string>("");
    const [backendError, setBackendError] = useState<string | null>(null);
    const [movieClient,] = useState<MovieClient>(new MovieClient(process.env.REACT_APP_SERVER_URL!));
    const navigate = useNavigate();

    function handleFormSubmit(data: Inputs, selectedMovieGenreIds: Array<number>) {
        const addMovieRequest = new AddMovieRequest();
        addMovieRequest.setTitle(data.title);
        const imageString = image.split(',')[1];
        addMovieRequest.setImage(imageString);
        addMovieRequest.setDuration(data.duration);
        addMovieRequest.setReleasedate(Timestamp.fromDate(data.releaseDate))
        addMovieRequest.setDescription(data.description);
        addMovieRequest.setAgerestrictionid(data.ageRestrictionId);
        addMovieRequest.setGenreidsList(selectedMovieGenreIds);

        movieClient.addMovie(addMovieRequest, (error, responseMessage) => {
            if (error !== null) {
                setBackendError(error.message);
            } else {
                navigate("/")
            }
        });
    }

    return (
        <style.DisplayContainer>
            <SectionContainer>
                {<style.Title>Dodawanie nowego filmu</style.Title>}
                {backendError && <formStyle.ValidationText>{backendError}</formStyle.ValidationText>}
                <style.ContentContainer>
                    <AddImage width={"360px"} height={"480px"} image={image} onImageChange={setImage}/>
                    <MovieDetailsForm handleFormSubmit={handleFormSubmit}/>
                </style.ContentContainer>
            </SectionContainer>
        </style.DisplayContainer>
    )
}

export default AddMovie;