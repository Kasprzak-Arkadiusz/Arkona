import React, {useEffect, useState} from 'react';
import MovieSearchBar, {SubmitResult} from "./MovieSearchBar/MovieSearchBar";
import MovieItem from "./MovieItem/MovieItem";
import LoadMore from "./LoadMore/LoadMore";
import {GetFilteredMoviesRequest, GetMoviesRequest, MovieInfo} from "generated/movie/movie_pb";
import {MovieClient} from "generated/movie/movie_pb_service";

function Repertoire() {
    const pageSize = 3;
    const [movies, setMovies] = useState<Array<MovieInfo>>(new Array<MovieInfo>());
    const [pageNumber, setPageNumber] = useState<number>(1);
    const [hasNextPage, setHasNextPage] = useState<boolean>(false);
    const [searchData, setSearchData] = useState<SubmitResult | null>(null);

    const [movieClient, _] = useState<MovieClient>(new MovieClient(process.env.REACT_APP_SERVER_URL!));

    const handleGetMoviesRequest = (request: GetMoviesRequest, prevMovies: Array<MovieInfo> = movies) => {
        movieClient.getMovies(request, (error, responseMessage) => {
            if (responseMessage !== null) {
                setMovies([...prevMovies, ...responseMessage.getItemsList()]);
                setHasNextPage(responseMessage.getHasnextpage());
                setPageNumber(responseMessage.getPagenumber());
            }
        });
    }
    
    const handleGetFilteredMoviesRequest = (request: GetFilteredMoviesRequest) => {
        movieClient.getFilteredMovies(request, (error, responseMessage) => {
            if (responseMessage !== null) {
                setMovies([...responseMessage.getItemsList()]);
                setHasNextPage(responseMessage.getHasnextpage());
                setPageNumber(responseMessage.getPagenumber());
            }
        });
    }

    useEffect(() => {
        const movieRequest = new GetMoviesRequest();
        movieRequest.setPagenumber(pageNumber);
        movieRequest.setPagesize(pageSize);
        handleGetMoviesRequest(movieRequest);
    }, []);

    const handleSearchSubmit = (formData: SubmitResult | null) => {
        if (formData === null) {
            setSearchData(formData);
            setPageNumber(1);

            const movieRequest = new GetMoviesRequest();
            movieRequest.setPagenumber(1);
            movieRequest.setPagesize(pageSize);

            handleGetMoviesRequest(movieRequest, new Array<MovieInfo>());
            return;
        }

        const filterMovieRequest = new GetFilteredMoviesRequest();
        filterMovieRequest.setTitle(formData.title);
        filterMovieRequest.setDate(formData.date);
        filterMovieRequest.setGenre(formData.movieGenre);
        filterMovieRequest.setAgerestriction(formData.ageRestriction);
        filterMovieRequest.setPagenumber(pageNumber);
        filterMovieRequest.setPagesize(pageSize);

        handleGetFilteredMoviesRequest( filterMovieRequest);

        setSearchData(formData);
    }

    const handleSeeMoreClick = () => {
        if (searchData !== null) {
            const filterMovieRequest = new GetFilteredMoviesRequest();
            filterMovieRequest.setPagenumber(pageNumber + 1);
            filterMovieRequest.setPagesize(pageSize);

            handleGetFilteredMoviesRequest(filterMovieRequest);

            return;
        }

        const movieRequest = new GetMoviesRequest();

        movieRequest.setPagenumber(pageNumber + 1);
        movieRequest.setPagesize(pageSize);
        handleGetMoviesRequest( movieRequest);
    };

    return (
        <main className="display-container">
            <MovieSearchBar onSubmitHandler={handleSearchSubmit}/>
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
