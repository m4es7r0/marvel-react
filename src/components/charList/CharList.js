import { useState, useRef, useEffect } from 'react';
import PropTypes from 'prop-types';

import Spinner from '../spinner/Spinner';
import ErrorMessage from '../errorMessage/errorMessage';

import useMarvelService from '../../services/MarvelService';

import './charList.scss';

const CharList = (props) => {
    const [charList, setCharList] = useState([])
    const [newItemsLoading, setNewItemsLoading] = useState(true)
    const [offset, setOffset] = useState(210)
    const [isEnd, setIsEnd] = useState(false)

    const { loading, error, getAllCharacters } = useMarvelService()

    useEffect(() => {
        window.addEventListener('scroll', onScroll);
        return () => window.removeEventListener('scroll', onScroll);
    }, [])

    useEffect(() => {
        if (newItemsLoading && !isEnd) onRequest()
        // eslint-disable-next-line
    }, [newItemsLoading])

    const onScroll = () => {
        if (window.innerHeight + window.pageYOffset >= document.body.offsetHeight + 50) {
            setNewItemsLoading(true);
        }
    }

    const onRequest = () => {
        loading ? setNewItemsLoading(false) : setNewItemsLoading(true);
        getAllCharacters(offset)
            .then(listLoaded)
    }

    const listLoaded = (newCharList) => {
        setNewItemsLoading(false);
        setCharList((charList) => [...charList, ...newCharList]);
        setOffset((offset) => offset + 9);
        setIsEnd(newCharList.length < 9 ? true : false);
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
            )
        })

        return (
            <ul className="char__grid">
                {items}
            </ul>
        )
    }

    const errorMessage = error ? <ErrorMessage paragraph={true} /> : null
    const content = error ? errorMessage : renderItems(charList)

    return (
        <div className="char__list">
            {content}
            {newItemsLoading ? <Spinner /> : null}
        </div>
    )
}

CharList.propTypes = {
    onCharSelected: PropTypes.func.isRequired
}

export default CharList;