import { useState } from "react";

import ErrorBoundary from "../errorBoundary/ErrorBoundary";
import AppHeader from "../appHeader/AppHeader";
import RandomChar from "../randomChar/RandomChar";
import CharList from "../charList/CharList";
import CharInfo from "../charInfo/CharInfo";

import decoration from '../../resources/img/vision.png';

const App = () => {
    const [selectedChar, setChar] = useState(null);

    const onCharSelected = (id) => {
        setChar(id);
    }

    const transformDescriptonForCharInfo = (description, name) => {
        if (description === `There is no description for ${name}`) {
            return (
                <>
                    {description.replace(name, '')}
                    <p style={{ fontWeight: '600', display: 'inline' }}>{name}</p>
                </>
            )
        }
        return description
    }

    return (
        <div className="app">
            <AppHeader />
            <main>
                <ErrorBoundary>
                    <RandomChar />
                </ErrorBoundary>
                <div className="char__content">
                    <ErrorBoundary>
                        <CharList onCharSelected={onCharSelected} />
                    </ErrorBoundary>
                    <ErrorBoundary>
                        <CharInfo
                            charId={selectedChar}
                            renderDescription={(description, name) => transformDescriptonForCharInfo(description, name)} />
                    </ErrorBoundary>
                </div>
                <img className="bg-decoration" src={decoration} alt="vision" />
            </main>
        </div>
    )
}

export default App;