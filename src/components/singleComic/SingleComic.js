import { useState, useEffect } from 'react';
import { useGetSingleComicQuery } from '../../redux/api/marvel.api';
import { Helmet } from 'react-helmet';
import { Link, useParams } from 'react-router-dom'

import ErrorMessage from '../errorMessage/errorMessage';
import Spinner from '../spinner/Spinner';

import './singleComic.scss';

const SingleComic = () => {
    const [comic, setComic] = useState({})
    const { id } = useParams()

    const {
        data = {},
        isLoading,
        isSuccess,
        isError
    } = useGetSingleComicQuery(id)

    useEffect(() => {
        setComic(data)
        // eslint-disable-next-line
    }, [isSuccess])

    const spinner = isLoading ? <Spinner /> : null
    const errorMessage = isError ? <ErrorMessage /> : null
    const content = !isLoading && !isError && data ? <View data={comic} /> : null

    return (
        <>  
            {spinner}
            {errorMessage}
            {content}
        </>
    )
}

const View = ({ data }) => {
    const { title, description, thumbnail, pages, language, prices } = data
    const price = {
        print: prices?.print[0].price,
    }
    return (
        <div className="single-comic">
            <Helmet>
                <meta name='description' content={`comic of ${title}`} />
                <title>{`Marvel Information | ${title}`}</title>
            </Helmet>
            <img src={thumbnail} alt={title} className="single-comic__img" />
            <div className="single-comic__info">
                <h2 className="single-comic__name">{title}</h2>
                <p className="single-comic__descr">{description}</p>
                <p className="single-comic__descr">Pages: <strong>{pages}</strong></p>
                <p className="single-comic__descr">Language: <strong>{language}</strong></p>
                <div className="single-comic__price">{price.print !== 0 ? `${price.print}$` : `not available in print`}</div>
            </div>
            <Link to={'/comics'} className="single-comic__back">Back to all</Link>
        </div>
    )
}

export default SingleComic;