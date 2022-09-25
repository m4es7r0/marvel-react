import { useState, useRef, useEffect } from 'react';
import PropTypes from 'prop-types';

import Spinner from '../spinner/Spinner';
import ErrorMessage from '../errorMessage/errorMessage';

import useMarvelService from '../../services/MarvelService';

import './charList.scss';
import { CSSTransition, TransitionGroup } from 'react-transition-group';

const CharList = (props) => {
    const [charList, setCharList] = useState([])
    const [newItemsLoading, setNewItemsLoading] = useState(true)
    const [offset, setOffset] = useState(210)
    const [isEnd, setIsEnd] = useState(false)

    const node = useRef()

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
        if (window.innerHeight + window.pageYOffset >= document.body.offsetHeight - 1) {
            setNewItemsLoading(true);
        }
    }
    const onRequest = () => {
        loading ? setNewItemsLoading(false) : setNewItemsLoading(true);
        getAllCharacters(offset)
            .then(listLoaded);
    }

    const itemsRef = useRef([])

    const focusOnItem = (id) => {
        itemsRef[id].focus()
    }

    const listLoaded = (newCharList) => {
        setNewItemsLoading(false);
        setCharList((charList) => [...charList, ...newCharList]);
        setOffset((offset) => offset + 9);
        setIsEnd(newCharList.length < 9 ? true : false);
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
            <ul className="char__grid">
                <TransitionGroup component={null}>
                    {items}
                </TransitionGroup>
            </ul>
        )
    }


    const errorMessage = error ? <ErrorMessage paragraph={true} /> : null
    const content = error ? errorMessage : renderItems(charList)

    return (
        <div className="char__list" ref={node}>
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

CharList.propTypes = {
    onCharSelected: PropTypes.func.isRequired
}

export default CharList;