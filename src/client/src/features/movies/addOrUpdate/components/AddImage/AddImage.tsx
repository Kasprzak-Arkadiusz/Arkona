import React, {useRef} from 'react';
import * as style from "./styled";

interface Props {
    width?: string,
    height?: string,
    image: string,
    onImageChange: (imageBase64 :string) => void;
}

function AddImage({width = "220px", height = "320px", image, onImageChange}: Props) {
    const imageRef = useRef<HTMLInputElement | null>(null);

    const onImageClick = () => {
        imageRef.current?.click();
    }
    
    const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.files !== null && event.target.files[0] !== null) {
            let reader = new FileReader();
            reader.readAsDataURL(event.target.files[0]);
            reader.onload = function () {
                const imageString = reader.result === null ? "" : reader.result.toString();
                onImageChange(imageString);
            };
        }
    }
    
    return (
        <style.Container width={width} height={height} onClick={onImageClick}> 
            <style.Image src={image} alt="" title={"Dodaj zdjęcie"}/>
            <style.ImageInput type="file" id="file" ref={imageRef} onChange={onChange}/>
        </style.Container>
    )
}

export default AddImage;