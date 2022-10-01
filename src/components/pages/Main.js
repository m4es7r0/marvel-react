import React from 'react'
import { Helmet } from 'react-helmet'

import ErrorBoundary from '../errorBoundary/ErrorBoundary'
import RandomChar from '../randomChar/RandomChar'
import CharInfo from '../charInfo/CharInfo'
import CharList from '../charList/CharList'

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
        <>
            <Helmet>
                <meta name='description' content='Marvel Information Resource' />
                <title>Marvel Information Resource</title>
            </Helmet>
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
            </main>
        </>
    )
}

export default Main