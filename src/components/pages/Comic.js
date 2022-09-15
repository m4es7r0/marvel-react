import SingleComic from '../singleComic/SingleComic'
import ErrorBoundary from '../errorBoundary/ErrorBoundary'

const Comic = ({ id }) => {


    return (
        <ErrorBoundary>
            <SingleComic data={{}} />
        </ErrorBoundary>
    )
}

export default Comic