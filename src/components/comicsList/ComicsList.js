import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom'
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import { useGetComicsQuery } from '../../redux/api/marvel.api';

import ErrorMessage from '../errorMessage/errorMessage';
import Spinner from '../spinner/Spinner';
import './comicsList.scss';

const ComicsList = () => {
    const [offset, setOffset] = useState(210)
    const { data = [], isLoading, isFetching, isError } = useGetComicsQuery(offset)
    const [list, setList] = useState([])

    useEffect(() => {
        // first query
        window.addEventListener('scroll', onScroll)
        return () => window.removeEventListener('scroll', onScroll)
    }, [])

    useEffect(() => {
        // upd heroes
        setList(state => [...state, ...data])
    }, [offset])

    const onScroll = () => {
        let scrolled = window.innerHeight + window.pageYOffset
        let pageHeight = document.body.offsetHeight - 1

        if (scrolled >= pageHeight ) {
            setOffset(state => state + 8)
        }
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
    const content = isError ? errorMessage : renderComics(list.length > 0 ? list : data);

    return (
        <div className="comics__list">
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

export default ComicsList;