import { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom'

import useMarvelService from '../../services/MarvelService';
import ErrorMessage from '../errorMessage/errorMessage';
import Spinner from '../spinner/Spinner';

import './singleComic.scss';

const SingleComic = () => {
    const { id } = useParams()
    const [comic, setComic] = useState(null)
    const { loading, error, getComic } = useMarvelService()

    useEffect(() => {
        getComic(id).then(setComic)
    }, [id])

    const spinner = loading ? <Spinner /> : null
    const errorMessage = error ? <ErrorMessage /> : null
    const content = !(loading || error || !comic) ? <View data={comic} /> : null

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
        print: prices.print[0].price,
    }
    return (
        <div className="single-comic">
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