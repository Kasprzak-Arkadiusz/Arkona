import React from 'react';

function ExternalLogin(props: { providerName: string; buttonText: string; imgSource: string }) {
    let provider = `${props.providerName.toLowerCase()}`;
    console.log(provider)
    return (
        <div>
            <button className={`external-provider-container__button ${provider}-button`}>
                <img src={props.imgSource} alt="" className="facebook-button__image" />
                <span className={`${provider}-button__span`}>{props.buttonText}</span>
            </button>
        </div>
    );
}

export default ExternalLogin;
