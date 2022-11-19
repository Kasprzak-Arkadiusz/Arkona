import React, {useState} from 'react';
import * as style from "./styled";
import AddImage from "./components/AddImage/AddImage";
import SectionContainer from "components/SectionContainer/SectionContainer";
import MovieDetailsForm from "./components/MovieDetailsForm/MovieDetailsForm";

function AddMovie() {
    const [image, setImage] = useState<string>("");

    return (
        <style.DisplayContainer>
            <SectionContainer>
                <style.Title>Dodawanie nowego filmu</style.Title>
                <style.ContentContainer>
                    <AddImage width={"360px"} height={"480px"} image={image} onImageChange={setImage}/>
                    <MovieDetailsForm/>
                </style.ContentContainer>
            </SectionContainer>
        </style.DisplayContainer>
    )
}

export default AddMovie;