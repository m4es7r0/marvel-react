import React from 'react'
import ErrorBoundary from '../errorBoundary/ErrorBoundary'

import ComicsList from '../comicsList/ComicsList'
import AppBanner from '../appBanner/AppBanner'

const Comics = () => {
    return (
        <main>
            <AppBanner />
            <ErrorBoundary>
                <ComicsList />
            </ErrorBoundary>
        </main>
    )
}

export default Comics