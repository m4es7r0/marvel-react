import { useState, useRef, useEffect } from 'react';
import PropTypes from 'prop-types';

import Spinner from '../spinner/Spinner';
import ErrorMessage from '../errorMessage/errorMessage';

import MarvelService from '../../services/MarvelService';

import './charList.scss';

const CharList = (props) => {
    const [charList, setCharList] = useState([])
    const [initialLoading, setInitialLoading] = useState(true)
    const [newItemsLoading, setNewItemsLoading] = useState(true)
    const [offset, setOffset] = useState(210)
    const [isEnd, setIsEnd] = useState(false)
    const [error, setError] = useState(false)

    const marvelService = new MarvelService()

    useEffect(() => {
        if (newItemsLoading && !isEnd) {
            onRequest();
        }
        // eslint-disable-next-line
    }, [newItemsLoading])

    useEffect(() => {
        window.addEventListener('scroll', onScroll);
        return () => window.removeEventListener('scroll', onScroll);
    }, [])

    const onRequest = () => {
        initialLoading ? setNewItemsLoading(false) : setNewItemsLoading(true);
        marvelService.getAllCharacters(offset)
            .then(listLoaded)
            .catch(onError)
            .finally(() => setNewItemsLoading(false))
    }

    const listLoaded = (newCharList) => {
        setInitialLoading(false);
        setCharList((charList) => [...charList, ...newCharList]);
        setOffset((offset) => offset + 9);
        setIsEnd(newCharList.length < 9 ? true : false);
    }

    const onError = () => {
        setError(true)
    }

    const onScroll = () => {
        if (window.innerHeight + window.pageYOffset >= document.body.offsetHeight + 50) {
            setNewItemsLoading(true);
        }
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
                <li className="card"
                    key={id}
                    ref={(el) => itemsRef[i] = el}
                    tabIndex={0}
                    onClick={() => {
                        props.onCharSelected(id)
                        focusOnItem(i)
                    }}
                    onKeyDown={(e) => {
                        if (e.key === ' ' || e.key === 'Enter') {
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
            )
        })

        return (
            <ul className="char__grid">
                {items}
            </ul>
        )
    }

    const cards = renderItems(charList)
    const spinner = initialLoading ? <Spinner /> : null
    const errorMessage = error ? <ErrorMessage /> : null

    const content =
        !initialLoading && !error ? cards
            : initialLoading && !error ? spinner
                : !initialLoading && error ? errorMessage
                    : null

    return (
        <div className="char__list">
            {content}
            {newItemsLoading ? <Spinner /> : null}
            {/* <button
                className="button button__main button__long"
                disabled={newItemsLoading}
                onClick={() => onRequest(offset)}
            >
                <div className="inner">load more</div>
            </button> */}
        </div>
    )
}

CharList.propTypes = {
    onCharSelected: PropTypes.func.isRequired
}

export default CharList;