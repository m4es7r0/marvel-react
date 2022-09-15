import React from 'react'
import ErrorBoundary from '../errorBoundary/ErrorBoundary'

import ComicsList from '../comicsList/ComicsList'
import AppBanner from '../appBanner/AppBanner'

const Comics = ({ setComic }) => {
    return (
        <main>
            <AppBanner />
            <ErrorBoundary>
                <ComicsList setComic={setComic} />
            </ErrorBoundary>
        </main>
    )
}

export default Comics