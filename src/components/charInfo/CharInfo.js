import React from 'react';
import PropTypes from 'prop-types';

import ErrorMessage from '../errorMessage/errorMessage';
import Spinner from '../spinner/Spinner';
import Skeleton from '../skeleton/Skeleton'

import useMarvelService from '../../services/MarvelService';

import './charInfo.scss';
import { Link } from 'react-router-dom';

const CharInfo = (props) => {
    const [char, setChar] = React.useState(null)

    const { error, loading, getCharacter } = useMarvelService()

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
    }

    const errorMessage = error ? <ErrorMessage paragraph={false} /> : null
    const spinner = loading ? <Spinner /> : null
    const skeleton = char || errorMessage || spinner ? null : <Skeleton />
    const content = !(loading || error || !char) ? <View char={char} renderDescription={props.renderDescription} /> : null

    return (
        <div className="char__info" id='sticky' ref={stickyRef}>
            {skeleton}
            {spinner}
            {errorMessage}
            {content}
        </div>
    )
}

const View = ({ char, renderDescription }) => {
    const { name, description, thumbnail, wiki, homepage, comics } = char

    let imgStyle = { objectFit: '' }
    if (thumbnail.includes('image_not_available') || thumbnail.includes('4c002e0305708')) {
        imgStyle = { objectFit: 'unset' }
    }

    return (
        <>
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
                {renderDescription(description, name)}
            </div>
            <div className="char__comics">Comics:</div>
            <ul className="char__comics-list">
                {comics.length > 0 ? null : <p>There is no comics with <span style={{ fontWeight: '600' }}>{name}</span></p>}
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
    )
}

CharInfo.propTypes = {
    charId: PropTypes.number
}

export default CharInfo;