import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import { useDispatch, useSelector } from 'react-redux';
import { fetchSingleHero } from '../../redux/actions/fetchAction';

import { CSSTransition, TransitionGroup } from 'react-transition-group';

import './charInfo.scss';
import { setContent } from '../../utils/setContent';

const CharInfo = (props) => {
    const dispatch = useDispatch()
    const char = useSelector(({ heroes }) => heroes.hero)
    const status = useSelector(({ heroes }) => heroes.HeroloadingStatus)

    React.useEffect(() => {
        if (props.charId) dispatch(fetchSingleHero(props.charId))
        // eslint-disable-next-line
    }, [props.charId])

    return (
        <TransitionGroup component={null}>
            <div className="char__info" id='sticky'>
                {setContent(status, char, View)}
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