import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import { useDispatch, useSelector } from 'react-redux';
import { fetchSingleHero } from '../../redux/actions/fetchAction';

import { CSSTransition, TransitionGroup } from 'react-transition-group';

import './charInfo.scss';
import { setContent } from '../../utils/setContent';

const CharInfo = ({ charId }) => {
    const dispatch = useDispatch()
    const char = useSelector(({ heroes }) => heroes.selectedHero)
    const status = useSelector(({ heroes }) => heroes.selectedHeroStatus)

    React.useEffect(() => {
        if (charId) dispatch(fetchSingleHero(charId))
        // eslint-disable-next-line
    }, [charId])

    return (
        <TransitionGroup component={null}>
            <div className="char__info" id='sticky'>
                {setContent(status, char, View)}
            </div>
        </TransitionGroup>
    )
}

const View = ({ data, renderDescription }) => {
    const { id, name, thumbnail, wiki, comics } = data

    return (
        <CSSTransition timeout={400} classNames="char__basics-wrapper-node" in={data}>
            <>
                <div className="char__basics-wrapper">
                    <div className="char__basics">
                        <img src={thumbnail} alt={name} />
                        <div>
                            <div className="char__info-name">{name}</div>
                            <div className="char__btns">
                                <div className='char__btns__wrapper'>
                                    <div>
                                        <Link to={`character/${id}`} className="button button__main button__info">
                                            <div className="inner inner__info">homepage</div>
                                        </Link>
                                        <a href={wiki} target='_blank' rel='noreferrer' className="button button__secondary button__info">
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