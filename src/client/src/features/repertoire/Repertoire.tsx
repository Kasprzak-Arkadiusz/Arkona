import React from 'react';
import MovieSearchBar from "./MovieSearchBar/MovieSearchBar";
import MovieItem from "./MovieItem/MovieItem";
import LoadMore from "./LoadMore/LoadMore";

function Repertoire() {
    return (
        <main className="display-container">
            <MovieSearchBar/>
            <MovieItem title={"Batman"} id={1} image={""} genre={"Akcja, Sensacyjny, Science Fiction"} duration={176}
                       ageRestriction={15} releaseDate={"2022-03-04"}></MovieItem>
            <MovieItem title={"Interstellar"} id={2} image={""} genre={"Science Fiction"} duration={169}
                       ageRestriction={13} releaseDate={"2014-11-07"}></MovieItem>
            <MovieItem title={"Lorem ipsum dolore"} id={3} image={""} genre={"Lorem ipsum"} duration={120}
                       ageRestriction={0} releaseDate={"0000-00-00"}></MovieItem>
            <MovieItem title={"Cogito ergo sum et ces humanum"} id={4} image={""} genre={"Sztuki wyzwolone"}
                       duration={150} ageRestriction={15} releaseDate={"1432-07-12"}></MovieItem>
            <LoadMore/>
        </main>
    )
}

export default Repertoire;
