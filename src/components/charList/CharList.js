import { useState, useRef, useEffect } from 'react';
import PropTypes from 'prop-types';

import Spinner from '../spinner/Spinner';
import ErrorMessage from '../errorMessage/errorMessage';

import { useGetHeroesQuery } from '../../redux/api/marvel.api';

import { CSSTransition, TransitionGroup } from 'react-transition-group';
import './charList.scss';

const CharList = (props) => {
    const [offset, setOffset] = useState(210)
    const { data = [], isLoading, isFetching, isError } = useGetHeroesQuery(offset)
    const [heroes, setHeroes] = useState([])

    useEffect(() => {
        // first query
        window.addEventListener('scroll', onScroll)
        return () => window.removeEventListener('scroll', onScroll)
    }, [])

    useEffect(() => {
        // upd heroes
        setHeroes(state => [...state, ...data])
    }, [offset])

    const onScroll = () => {
        let scrolled = window.innerHeight + window.pageYOffset
        let pageHeight = document.body.offsetHeight - 20

        if (scrolled >= pageHeight ) {
            setOffset(state => state + 9)
        }
    }

    const itemsRef = useRef([])

    const focusOnItem = (id) => {
        itemsRef[id].focus()
    }

    const renderItems = (arr) => {
        const items = arr.map((card, i) => {
            let { id, name, thumbnail } = card

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
                                    <img src={thumbnail} alt={name} />
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


    const errorMessage = isError ? <ErrorMessage paragraph={true} /> : null
    const content = isError ? errorMessage : renderItems(heroes.length > 0 ? heroes : data)

    return (
        <div className="char__list">
            {content}
            {isLoading || isFetching ? <Spinner /> : null}
            {document.body.offsetHeight <= window.innerHeight
                ? <button
                    className="button button__main button__long"
                    onClick={() => setOffset(state => state + 9)}
                    disabled={isFetching}
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