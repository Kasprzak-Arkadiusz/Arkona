import React from 'react';
import SectionContainer from 'components/SectionContainer/SectionContainer';
import * as style from './styled';

function UnauthorizedPage() {
    return(
        <main className="display-container">
            <SectionContainer>
                <style.Title>Brak dostępu</style.Title>
                <style.Message>Nie posiadasz uprawnień wymaganych, aby zobaczyć tą stronę.</style.Message>
                <style.Action href={"/"}>Wróć do strony głównej</style.Action>
            </SectionContainer>
        </main>
    )
}

export default UnauthorizedPage;