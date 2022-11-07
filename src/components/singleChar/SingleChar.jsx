import { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import { Link, useParams } from 'react-router-dom'

import { useGetSingleHeroQuery } from '../../redux/api/marvel.api';

import ErrorMessage from '../errorMessage/errorMessage';
import Spinner from '../spinner/Spinner';

import './singleChar.scss';

const SingleChar = () => {
    const [char, setChar] = useState({})
    const { charId } = useParams()

    const {
        data = {},
        isLoading,
        isFetching,
        isSuccess,
        isError
    } = useGetSingleHeroQuery(charId)

    useEffect(() => {
        setChar(data)
        // eslint-disable-next-line
    }, [isSuccess])

    return (
        <>
            <Helmet>
                <meta name='description' content={`page of ${char.name}`} />
                <title>{`Marvel Information | ${char.name}`}</title>
            </Helmet>
            {
                isError
                    ? <ErrorMessage />
                    : <>
                        {
                            isLoading || isFetching
                                ? <Spinner />
                                : <div className="single-char">
                                    <img src={char.thumbnail} alt={char.name} className="single-char__img" />
                                    <div className="single-char__info">
                                        <h2 className="single-char__name">{char.name}</h2>
                                        <p className="single-char__descr">{char.description}</p>
                                    </div>
                                    <Link to={'/'} className="single-char__back">Back to all</Link>
                                </div>
                        }
                    </>
            }

        </>
    )
}

export default SingleChar;