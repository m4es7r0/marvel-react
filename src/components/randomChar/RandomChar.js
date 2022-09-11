import React from 'react';

import Spinner from '../spinner/Spinner';
import ErrorMessage from '../errorMessage/errorMessage';

import './randomChar.scss';
import mjolnir from '../../resources/img/mjolnir.png';
import MarvelService from '../../services/MarvelService';

const RandomChar = () => {
    const [state, setState] = React.useState({
        char: {},
        loading: true,
        error: false
    })

    const marvelService = new MarvelService()

    React.useEffect(() => {
        updChar()
    }, [])

    const onCharLoaded = (char) => {
        setState(state => ({ ...state, char, loading: false }))
    }

    const onError = () => {
        setState(state => ({ ...state, loading: false, error: true }))
    }

    const updChar = () => {
        setState(state => ({ ...state, loading: true, error: false }))
        marvelService
            .getCharacter(Math.floor(Math.random() * (1011400 - 1011000) + 1011000))
            .then(onCharLoaded)
            .catch(onError)
    }

    let { char, loading, error } = state
    const errorMessage = error ? <ErrorMessage /> : null
    const spinner = loading ? <Spinner /> : null
    const randomCharBlock = !loading && !error ? <View char={char} /> : loading && !error ? spinner : !loading && error ? errorMessage : null

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
                <button className="button button__main">
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
                    <a href={homepage} className="button button__main">
                        <div className="inner">homepage</div>
                    </a>
                    <a href={wiki} className="button button__secondary">
                        <div className="inner">Wiki</div>
                    </a>
                </div>
            </div>
        </div>
    )
}

export default RandomChar;