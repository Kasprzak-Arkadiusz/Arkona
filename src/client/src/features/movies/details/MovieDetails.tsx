import React from 'react';
import {useParams} from 'react-router';

function MovieDetails() {
    const {id} = useParams();
    console.log(id);
    
    return (
        <main className="display-container">

        </main>
    )
}

export default MovieDetails;