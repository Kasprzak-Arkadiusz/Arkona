import React, {useState} from 'react';
import * as style from "./styled";
import AddSeances from "./AddSeances";
import AddImage from "./components/AddImage/AddImage";
import SectionContainer from "components/SectionContainer/SectionContainer";

function AddMovie() {
    const [image, setImage] = useState<string>("");

    return (
        <style.DisplayContainer>
            <SectionContainer>
                <AddImage width={"360px"} height={"480px"} image={image} onImageChange={setImage}/>
            </SectionContainer>
            <AddSeances/>
        </style.DisplayContainer>
    )
}

export default AddMovie;