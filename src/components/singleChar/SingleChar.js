import { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom'

import useMarvelService from '../../services/MarvelService';
import ErrorMessage from '../errorMessage/errorMessage';
import Spinner from '../spinner/Spinner';

import './singleChar.scss';

const SingleChar = () => {
    const [char, setChar] = useState({})
    const { charId } = useParams()

    const { getCharacter, loading, error } = useMarvelService()

    useEffect(() => {
        getCharacter(charId).then(setChar)
    }, [])

    return (
        <>
            {error ? <ErrorMessage /> : <>{loading
                ? <Spinner />
                : <div className="single-char">
                    <img src={char.thumbnail} alt={char.name} className="single-char__img" />
                    <div className="single-char__info">
                        <h2 className="single-char__name">{char.name}</h2>
                        <p className="single-char__descr">{char.description}</p>
                    </div>
                    <Link to={'/'} className="single-char__back">Back to all</Link>
                </div>
            }</>}

        </>
    )
}

export default SingleChar;