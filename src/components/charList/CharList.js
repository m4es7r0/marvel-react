import { useState, useRef, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import PropTypes from 'prop-types';

import Spinner from '../spinner/Spinner';
import ErrorMessage from '../errorMessage/errorMessage';

import { fetchHeroes } from '../../redux/actions/fetchAction';

import { CSSTransition, TransitionGroup } from 'react-transition-group';
import './charList.scss';

const CharList = (props) => {
    const dispatch = useDispatch()
    const status = useSelector(({ heroes }) => heroes.heroesListStatus);
    const heroes = useSelector(({ heroes }) => heroes.heroesList)

    const [offset, setOffset] = useState(210)

    useEffect(() => {
        window.addEventListener('scroll', onScroll);
        return () => window.removeEventListener('scroll', onScroll);
        // eslint-disable-next-line
    }, [])

    useEffect(() => {
        dispatch(fetchHeroes(offset))
        // eslint-disable-next-line
    }, [offset])

    const onScroll = () => {
        if (window.innerHeight + window.pageYOffset >= document.body.offsetHeight) {
            setOffset(state => state + 9)
        }
        return
    }

    const itemsRef = useRef([])

    const focusOnItem = (id) => {
        itemsRef[id].focus()
    }

    const renderItems = (arr) => {
        const items = arr.map((card, i) => {
            let { id, name, thumbnail } = card

            let imgStyle = { objectFit: '' }
            if (thumbnail.includes('image_not_available') || thumbnail.includes('4c002e0305708')) {
                imgStyle = { objectFit: 'unset' }
            }

            return (
                <CSSTransition key={id} timeout={450} classNames={"card-node"}>
                    <li className="card"
                        // key={id}
                        ref={(el) => itemsRef[i] = el}
                        tabIndex={0}
                        onClick={() => {
                            props.onCharSelected(id)
                            focusOnItem(i)
                        }}
                        onKeyDown={(e) => {
                            if (e.key === 'Enter') {
                                props.onCharSelected(id)
                                focusOnItem(id)
                            }
                        }}
                    >
                        <div className="card__block">
                            <div className="card__header">
                                <div className="card__header-img">
                                    <img src={thumbnail} alt={name} style={imgStyle} />
                                </div>
                            </div>
                            <div className="card__footer">
                                <p>{name}</p>
                            </div>
                        </div>
                    </li>
                </CSSTransition>
            )
        })

        return (
            <TransitionGroup component={"ul"} className={"char__grid"}>
                {items}
            </TransitionGroup>
        )
    }


    const errorMessage = status === 'rejected' ? <ErrorMessage paragraph={true} /> : null
    const content = status === 'rejected' ? errorMessage : renderItems(heroes)

    return (
        <div className="char__list">
            {content}
            {status === 'pending' ? <Spinner /> : null}
            {document.body.offsetHeight <= window.innerHeight
                ? <button
                    className="button button__main button__long"
                    onClick={() => setOffset(state => state + 9)}
                    disabled={status === 'pending'}
                >
                    <div className="inner">load more</div>
                </button>
                : null}
        </div>
    )
}

CharList.propTypes = {
    onCharSelected: PropTypes.func.isRequired
}

export default CharList;