import React from 'react'

import ErrorBoundary from '../errorBoundary/ErrorBoundary'
import RandomChar from '../randomChar/RandomChar'
import CharInfo from '../charInfo/CharInfo'
import CharList from '../charList/CharList'

import decoration from '../../resources/img/vision.png';
import FormSearch from '../form/FormSearch'

const Main = () => {
    const [selectedChar, setChar] = React.useState(null);

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
        <main>
            <ErrorBoundary>
                <RandomChar />
            </ErrorBoundary>
            <div className="char__content">
                <ErrorBoundary>
                    <CharList onCharSelected={onCharSelected} />
                </ErrorBoundary>
                <div className='char__sidebar'>
                    <ErrorBoundary>
                        <CharInfo
                            charId={selectedChar}
                            renderDescription={(description, name) => transformDescriptonForCharInfo(description, name)} />
                    </ErrorBoundary>
                    <ErrorBoundary>
                        <FormSearch />
                    </ErrorBoundary>
                </div>
            </div>
            {/* <img className="bg-decoration" src={decoration} alt="vision" /> */}
        </main>
    )
}

export default Main