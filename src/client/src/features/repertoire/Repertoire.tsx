import React, {useEffect, useState} from 'react';
import MovieSearchBar from "./MovieSearchBar/MovieSearchBar";
import MovieItem from "./MovieItem/MovieItem";
import LoadMore from "./LoadMore/LoadMore";
import {GetMoviesRequest, MovieInfo} from "generated/movie/movie_pb";
import {MovieClient} from "generated/movie/movie_pb_service";

function Repertoire() {
    const pageSize = 3;
    const [movies, setMovies] = useState(Array<MovieInfo>());
    const [pageNumber, setPageNumber] = useState<number>(1);
    const [hasNextPage, setHasNextPage] = useState<boolean>(false);

    const [movieClient, _] = useState<MovieClient>(new MovieClient(process.env.REACT_APP_SERVER_URL!));
    const [movieRequest, setMovieRequest] = useState<GetMoviesRequest>(() => {
        let request = new GetMoviesRequest;
        request.setPagesize(pageSize);
        request.setPagenumber(pageNumber);

        return request;
    });

    const handleResponse = () => {
        movieClient.getMovies(movieRequest, (error, responseMessage) => {
            if (responseMessage !== null) {
                setMovies([...movies, ...responseMessage.getItemsList()]);
                setHasNextPage(responseMessage.getHasnextpage());
                setPageNumber(responseMessage.getPagenumber());
            }
        });
    };

    useEffect(() => {
        movieRequest.setPagenumber(pageNumber);
        movieRequest.setPagesize(pageSize);
        handleResponse();
    }, []);

    const handleSeeMoreClick = () => {
        movieRequest.setPagenumber(pageNumber + 1);
        setMovieRequest(movieRequest);
        handleResponse();
    };

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
            {hasNextPage && <LoadMore onClickHandler={handleSeeMoreClick}/>}
        </main>
    )
}

export default Repertoire;
