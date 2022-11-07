import React from 'react';
import { useSelector } from 'react-redux';
import { useLazyGetSingleHeroQuery } from '../../redux/api/marvel.api'

import { Link } from "react-router-dom"
import { setContent } from '../../utils/setContent';
import ErrorMessage from '../errorMessage/errorMessage';

import mjolnir from '../../assets/mjolnir.svg';
import './randomChar.scss';

const RandomChar = () => {
    const [fetch, { isLoading, isFetching, isError }] = useLazyGetSingleHeroQuery()
    const status = useSelector(({ heroes }) => heroes.randomHeroStatus)
    const [char, setChar] = React.useState(false)

    React.useEffect(() => {
        updateHero()
        // eslint-disable-next-line
    }, [])

    // (Math.random() * (1011420 - 1011003) + 1011003).toFixed(0) stable
    // Math.floor(Math.random() * (1010789 - 1009146) + 1009146) unstable
    const updateHero = () => {
        const rndId = (Math.random() * (1011420 - 1011003) + 1011003).toFixed(0)
        fetch(rndId)
            .then(res => {
                if (res.data) setChar(res.data)
            })
            .finally(setChar(false))
    }

    return (
        <div className="randomchar">
            {isError ? <ErrorMessage /> : setContent(status, char, View)}
            <div className="randomchar__static">
                <p className="randomchar__title">
                    Random character for today!<br />
                    Do you want to get to know him better?
                </p>
                <p className="randomchar__title">
                    Or choose another one
                </p>
                <button className="button button__main" disabled={isLoading || isFetching}>
                    <div className="inner" onClick={() => updateHero()}>try it</div>
                </button>
                <img src={mjolnir} alt="mjolnir" className="randomchar__decoration" />
            </div>
        </div>
    )
}

const View = ({ data }) => {
    const { thumbnail, id, name, description, wiki } = data

    return (
        <div className="randomchar__block">
            <img src={thumbnail} alt="Random character" className="randomchar__img" />
            <div className="randomchar__info">
                <p className={`randomchar__name`}>{name}</p>
                <p className="randomchar__descr">
                    {description}
                </p>
                <div className="randomchar__btns">
                    <Link to={`/character/${id}`} className="button button__main">
                        <div className="inner">homepage</div>
                    </Link>
                    <a href={wiki} target="_blank" rel="noreferrer" className="button button__secondary">
                        <div className="inner">Wiki</div>
                    </a>
                </div>
            </div>
        </div>
    )
}

export default React.memo(RandomChar);