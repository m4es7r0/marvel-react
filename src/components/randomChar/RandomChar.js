import React from 'react';
import useMarvelService from '../../services/MarvelService';

import { Link } from "react-router-dom"

import './randomChar.scss';
import mjolnir from '../../resources/img/mjolnir.svg';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import { setContent } from '../../utils/setContent';

const RandomChar = () => {
    const [char, setChar] = React.useState(null)

    const { loading, process, setProcess, getCharacter } = useMarvelService()

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
            .then(() => setProcess('idle'))
    }

    return (
        <CSSTransition timeout={450} classNames={"randomchar-node"} in={char}>
            <div className="randomchar">
                <TransitionGroup component={null}>
                    {setContent(process, char, View)}
                </TransitionGroup>
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
        </CSSTransition>
    )
}

const View = ({ data }) => {
    const { thumbnail, id, name, description, wiki } = data
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

export default RandomChar;