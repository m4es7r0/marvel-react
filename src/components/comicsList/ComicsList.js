import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom'
import { CSSTransition, TransitionGroup } from 'react-transition-group';

import useMarvelService from '../../services/MarvelService';

import ErrorMessage from '../errorMessage/errorMessage';
import Spinner from '../spinner/Spinner';
import './comicsList.scss';

const ComicsList = () => {
    const [comicsList, setComicsList] = useState([])
    const [newItemsLoading, setNewItemsLoading] = useState(true)
    const [offset, setOffset] = useState(8)
    const [isEnd, setIsEnd] = useState(false)

    const { loading, error, getAllComics } = useMarvelService()

    useEffect(() => {
        window.addEventListener('scroll', onScroll);
        return () => window.removeEventListener('scroll', onScroll);
    }, [])

    useEffect(() => {
        if (newItemsLoading && !isEnd) onRequest()
        // eslint-disable-next-line
    }, [newItemsLoading])

    const onScroll = () => {
        if (window.innerHeight + window.pageYOffset >= document.body.offsetHeight - 1) {
            setNewItemsLoading(true);
        }
    }

    const onRequest = () => {
        loading ? setNewItemsLoading(false) : setNewItemsLoading(true);
        getAllComics(offset)
            .then(listLoaded)
    }

    const listLoaded = (newComics) => {
        setNewItemsLoading(false)
        setComicsList(state => [...state, ...newComics])
        setOffset(offset => offset + 8)
        setIsEnd(newComics.length < 8 ? true : false)
    }

    const renderComics = (comicsList) => {
        const item = comicsList.map((item, index) => {
            const { id, title, thumbnail, prices } = item

            let imgStyle = thumbnail.includes('image_not_available') || thumbnail.includes('4c002e0305708') ? { objectFit: 'unset' } : { objectFit: '' }
            let priceStyle = prices.print[0].price !== 0 ? { color: '#ce262c' } : { color: 'unset' }

            return (
                <CSSTransition key={index} timeout={450} classNames="comics__item-node">
                    <li
                        className="comics__item"
                    >
                        <Link to={`${id}`}>
                            <img src={thumbnail} alt={title} className="comics__item-img" style={imgStyle} />
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

    const errorMessage = error ? <ErrorMessage /> : null;
    const content = error ? errorMessage : renderComics(comicsList);

    return (
        <div className="comics__list">
            {content}
            {newItemsLoading ? <Spinner /> : null}
            {document.body.offsetHeight < window.innerHeight
                ? <button className="button button__main button__long" onClick={() => setNewItemsLoading(true)}>
                    <div className="inner">load more</div>
                </button>
                : null}
        </div>
    )
}

export default ComicsList;