import { useState, useRef, useEffect } from 'react';
import { useSelector } from 'react-redux';
import PropTypes from 'prop-types';

import InfiniteScroll from 'react-infinite-scroll-component';
import Spinner from '../spinner/Spinner';
import ErrorMessage from '../errorMessage/errorMessage';

import { useLazyGetHeroesQuery } from '../../redux/api/marvel.api';

import { CSSTransition, TransitionGroup } from 'react-transition-group';
import './charList.scss';

const CharList = (props) => {
    const [offset, setOffset] = useState(210)
    const [fetch, { isLoading, isFetching, isError }] = useLazyGetHeroesQuery()
    const data = useSelector(({heroes}) => heroes.heroesList)

    useEffect(() => {
        onRequest()
    }, [])

    const onRequest = () => {
        fetch(offset)
            .finally(setOffset(s => s + 9))
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
                            props.activeModal(true)
                            focusOnItem(i)
                        }}
                        onKeyDown={(e) => {
                            if (e.key === 'Enter') {
                                props.onCharSelected(id)
                                props.activeModal(true)
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
    const content = isError ? errorMessage : renderItems(data)

    return (
        <div className="char__list">
            <InfiniteScroll dataLength={data.length} next={onRequest} hasMore={true} scrollThreshold={.8} scrollableTarget={window}>
                {content}
                {isLoading || isFetching ? <Spinner /> : null}
                {document.body.clientHeight <= window.innerHeight
                    ? <button
                        className="button button__main button__long"
                        onClick={onRequest}
                        disabled={isFetching}
                    >
                        <div className="inner">load more</div>
                    </button>
                    : null}
            </InfiniteScroll>
        </div>
    )
}

CharList.propTypes = {
    onCharSelected: PropTypes.func.isRequired
}

export default CharList;