import React, {useEffect, useState} from 'react';
import {useParams} from 'react-router';
import {useNavigate} from "react-router-dom";
import {MovieClient} from "generated/movie/movie_pb_service";
import {DetailedMovieInfo, GetMovieDetailsRequest} from "generated/movie/movie_pb";
import MovieDetailsItem from "./MovieDetailsItem";
import ClosestSeances from "features/seances/ClosestSeances/ClosestSeances";

function MovieDetails() {
  const {id} = useParams();
  const navigate = useNavigate();
  const [movieClient, _] = useState<MovieClient>(new MovieClient(process.env.REACT_APP_SERVER_URL!));
  const [movie, setMovie] = useState<DetailedMovieInfo>(new DetailedMovieInfo());
  const [seancesRequested, setSeancesRequested] = useState<boolean>(false);

  useEffect(() => {
    if (id === undefined) {
      navigate(-1);
    }

    const request = new GetMovieDetailsRequest();
    request.setId(parseInt(id!));

    movieClient.getMovieDetails(request, (error, responseMessage) => {
      if (responseMessage !== null) {
        setMovie(responseMessage);
      } else {
        navigate(-1);
      }
    });
  }, []);

  return (
    <main className="display-container">
      <MovieDetailsItem movieInfo={movie} onButtonClickHandler={() => setSeancesRequested(true)}/>
      {seancesRequested && <ClosestSeances movieId={movie.getId()}/>}
    </main>
  )
}

export default MovieDetails;