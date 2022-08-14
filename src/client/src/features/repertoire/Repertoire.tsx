import React, {useEffect, useState} from 'react';
import MovieSearchBar from "./MovieSearchBar/MovieSearchBar";
import MovieItem from "./MovieItem/MovieItem";
import LoadMore from "./LoadMore/LoadMore";
import {GetMoviesRequest, MovieInfo} from "generated/movie/movie_pb";
import {MovieClient} from "generated/movie/movie_pb_service";

function Repertoire() {
    const [movies, setMovies] = useState(Array<MovieInfo>());
    const [page, setPage] = useState<number>(1);
    const pageSize = 5;

    useEffect(() => {
        const movieClient = new MovieClient(process.env.REACT_APP_SERVER_URL!);
        const movieRequest = new GetMoviesRequest();
        movieRequest.setPagenumber(page);
        movieRequest.setPagesize(pageSize);

        movieClient.getMovies(movieRequest, (error, responseMessage) => {
            if (responseMessage !== null) {
                console.log(responseMessage)
                console.log(responseMessage.getItemsList())
                setMovies(responseMessage.getItemsList());
            }
        })
    }, []);

    return (
        <main className="display-container">
            <MovieSearchBar/>
            <div>
                {movies.map((item) => {
                    return <MovieItem image={item.getImage_asB64()}
                                      title={item.getTitle()}
                                      id={item.getId()}
                                      key={item.getId()}
                                      ageRestriction={item.getAgerestriction()}
                                      duration={item.getDuration()}
                                      releaseDate={item.getReleasedate()}
                                      genre={item.getGenresList().join(", ")}/>
                })}
            </div>
            <LoadMore/>
        </main>
    )
}

export default Repertoire;
