import React from 'react';
import PropTypes from 'prop-types';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import { Link } from 'react-router-dom';

import useMarvelService from '../../services/MarvelService';
import { setContent } from '../../utils/setContent';

import './charInfo.scss';

const CharInfo = (props) => {
    const [char, setChar] = React.useState(null)

    const { process, setProcess, getCharacter } = useMarvelService()

    React.useEffect(() => {
        updChar()
        window.addEventListener('scroll', positionStickyByScroll)
        return () => window.removeEventListener('scroll', positionStickyByScroll)
        // eslint-disable-next-line
    }, [])

    React.useEffect(() => {
        if (props.charId) {
            updChar()
        }
        // eslint-disable-next-line
    }, [props.charId])

    const stickyRef = React.useRef()

    const positionStickyByScroll = React.useCallback(() => {
        if (window.pageYOffset >= stickyRef.current.offsetHeight - 50) {
            stickyRef.current.classList.add('sticky')
        } else {
            stickyRef.current.classList.remove('sticky')
        }
    }, [])

    const onLoaded = (char) => {
        setChar(char)
    }

    const updChar = () => {
        if (!props.charId) return
        getCharacter(props.charId)
            .then(onLoaded)
            .then(() => setProcess('confirmed'))
    }

    return (
        <TransitionGroup component={null}>
            <div className="char__info" id='sticky' ref={stickyRef}>
                {setContent(process, char, View)}
            </div>
        </TransitionGroup>
    )
}

const View = ({ data, renderDescription }) => {
    const { name, thumbnail, wiki, homepage, comics } = data

    let imgStyle = { objectFit: '' }
    if (thumbnail.includes('image_not_available') || thumbnail.includes('4c002e0305708')) {
        imgStyle = { objectFit: 'unset' }
    }

    return (
        <CSSTransition timeout={400} classNames="char__basics-wrapper-node" in={data}>
            <>
                <div className="char__basics-wrapper">
                    <div className="char__basics">
                        <img src={thumbnail} alt={name} style={imgStyle} />
                        <div>
                            <div className="char__info-name">{name}</div>
                            <div className="char__btns">
                                <div className='char__btns__wrapper'>
                                    <div>
                                        <a href={homepage} className="button button__main button__info">
                                            <div className="inner inner__info">homepage</div>
                                        </a>
                                        <a href={wiki} className="button button__secondary button__info">
                                            <div className="inner inner__info">Wiki</div>
                                        </a>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="char__descr">
                        {/* {renderDescription(description, name)} убрал описание персонажа */}
                    </div>
                </div>
                <div className="char__comics">Comics:</div>
                <ul className="char__comics-list">
                    {comics.length > 0
                        ? null
                        : <p>There is no comics with <span style={{ fontWeight: '600' }}>{name}</span></p>}
                    {
                        comics.map((item, i) => {
                            // eslint-disable-next-line
                            if (i >= 6) return;
                            let comicId = item.resourceURI.replace('http://gateway.marvel.com/v1/public/comics/', '')
                            return (
                                <li key={comicId} className="char__comics-item">
                                    <Link to={`comics/${comicId}`}>{item.name}</Link>
                                </li>
                            )
                        })
                    }
                </ul>
            </>
        </CSSTransition>
    )
}

CharInfo.propTypes = {
    charId: PropTypes.number
}

export default CharInfo;