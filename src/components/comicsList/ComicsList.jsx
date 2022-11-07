import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom'
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import { useLazyGetComicsQuery } from '../../redux/api/marvel.api';
import InfiniteScroll from 'react-infinite-scroll-component';

import ErrorMessage from '../errorMessage/errorMessage';
import Spinner from '../spinner/Spinner';
import './comicsList.scss';

const ComicsList = () => {
    const [offset, setOffset] = useState(200)
    const [fetch, { isLoading, isFetching, isError }] = useLazyGetComicsQuery()
    const data = useSelector(({comics}) => comics.comicsList)

    useEffect(() => {
        onRequest()
    }, [])

    const onRequest = () => {
        fetch(offset)
            .finally(setOffset(s => s + 8))
    }

    const renderComics = (comicsList) => {
        const item = comicsList.map((item, index) => {
            const { id, title, thumbnail, prices } = item

            let priceStyle = prices.print[0].price !== 0 ? { color: '#ce262c' } : { color: 'unset' }

            return (
                <CSSTransition key={index} timeout={450} classNames="comics__item-node">
                    <li
                        className="comics__item"
                    >
                        <Link to={`${id}`}>
                            <img src={thumbnail} alt={title} className="comics__item-img" />
                            <div className="comics__item-name">{title}</div>
                            <div className="comics__item-price">
                                <p
                                    style={priceStyle}
                                >
                                    {prices.print[0].price !== 0 ? `${prices.print[0].price}$` : `not available in print`}
                                </p>
                            </div>
                        </Link>
                    </li>
                </CSSTransition>
            )
        })

        return (
            <ul className="comics__grid">
                <TransitionGroup component={null}>
                    {item}
                </TransitionGroup>
            </ul>
        )
    }

    const errorMessage = isError ? <ErrorMessage /> : null;
    const content = isError ? errorMessage : renderComics(data);

    return (
        <div className="comics__list">
            <InfiniteScroll dataLength={data.length} next={onRequest} hasMore={true} scrollThreshold={.8}>
                {content}
                {isLoading || isFetching ? <Spinner /> : null}
                {document.body.offsetHeight <= window.innerHeight
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

export default ComicsList;