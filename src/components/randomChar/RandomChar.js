import React from 'react';
import useMarvelService from '../../services/MarvelService';

import { Link } from "react-router-dom"

import Spinner from '../spinner/Spinner';
import ErrorMessage from '../errorMessage/errorMessage';

import './randomChar.scss';
import mjolnir from '../../resources/img/mjolnir.svg';

const RandomChar = () => {
    const [char, setChar] = React.useState(null)

    const { loading, error, getCharacter } = useMarvelService()

    React.useEffect(() => {
        updChar()
        // eslint-disable-next-line
    }, [])

    const onCharLoaded = (char) => {
        setChar(char)
    }

    const updChar = () => {
        getCharacter((Math.random() * (1011420 - 1011003) + 1011003).toFixed(0))
            .then(onCharLoaded)
    }

    const errorMessage = error ? <ErrorMessage /> : null
    const spinner = loading ? <Spinner /> : null
    const randomCharBlock = !(loading || error || !char) ? <View char={char} />
        : loading ? spinner
            : error ? errorMessage
                : null;

    return (
        <div className="randomchar">
            {randomCharBlock}
            <div className="randomchar__static">
                <p className="randomchar__title">
                    Random character for today!<br />
                    Do you want to get to know him better?
                </p>
                <p className="randomchar__title">
                    Or choose another one
                </p>
                <button className="button button__main" disabled={loading}>
                    <div className="inner" onClick={() => updChar()}>try it</div>
                </button>
                <img src={mjolnir} alt="mjolnir" className="randomchar__decoration" />
            </div>
        </div>
    )
}

const View = ({ char }) => {
    const { thumbnail, name, description, homepage, wiki } = char
    let imgStyle = { objectFit: '' }
    if (thumbnail.includes('image_not_available') || thumbnail.includes('4c002e0305708')) {
        imgStyle = { objectFit: 'unset' }
    }

    return (
        <div className="randomchar__block">
            <img src={thumbnail} alt="Random character" className="randomchar__img" style={imgStyle} />
            <div className="randomchar__info">
                <p className={`randomchar__name`}>{name}</p>
                <p className="randomchar__descr">
                    {description}
                </p>
                <div className="randomchar__btns">
                    <a href={homepage} target="_blanck" className="button button__main">
                        <div className="inner">homepage</div>
                    </a>
                    <Link to="/character" className="button button__secondary">
                        <div className="inner">Wiki</div>
                    </Link>
                </div>
            </div>
        </div>
    )
}

export default RandomChar;