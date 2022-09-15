import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom'

import useMarvelService from '../../services/MarvelService';

import ErrorMessage from '../errorMessage/errorMessage';
import Spinner from '../spinner/Spinner';
import './comicsList.scss';

const ComicsList = ({ setComic }) => {
    const [comicsList, setComicsList] = useState([])
    const [newItemsLoading, setNewItemsLoading] = useState(true)
    const [offset, setOffset] = useState(0)
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
        if (window.innerHeight + window.pageYOffset >= document.body.offsetHeight) {
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
                <li
                    className="comics__item"
                    key={id}
                    onClick={() => setComic(id)}>
                    <Link to={`comics/${id}`}>
                        <img src={thumbnail} alt={title} className="comics__item-img" style={imgStyle} />
                        <div className="comics__item-name">{title}</div>
                        <div className="comics__item-price">
                            <p
                                style={priceStyle}
                            >
                                {prices.print[0].price !== 0 ? `${prices.print[0].price}$` : `not avalible in print`}
                            </p>
                        </div>
                    </Link>
                </li>
            )
        })

        return (
            <ul className="comics__grid">
                {item}
            </ul>
        )
    }

    const errorMessage = error ? <ErrorMessage /> : null;
    const content = error ? errorMessage : renderComics(comicsList);

    return (
        <div className="comics__list">
            {content}
            {newItemsLoading ? <Spinner /> : null}
            {/* <button className="button button__main button__long" onClick={() => onRequest()}>
                <div className="inner">load more</div>
            </button> */}
        </div>
    )
}

export default ComicsList;