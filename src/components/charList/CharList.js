import { Component } from 'react';
import PropTypes from 'prop-types';

import Spinner from '../spinner/Spinner';
import ErrorMessage from '../errorMessage/errorMessage';

import MarvelService from '../../services/MarvelService';

import './charList.scss';

class CharList extends Component {
    state = {
        offset: 210,
        charList: [],
        charEnded: false,
        loading: true,
        loadingNewItem: false,
        error: false,
    }
    marvelService = new MarvelService()

    componentDidMount() {
        if (this.state.offset < 219) {
            this.onRequest()
        }
        window.addEventListener('scroll', this.onScrollLoading)
    }

    componentWillUnmount() {
        window.removeEventListener(this.onScrollLoading)
    }

    onScrollLoading = () => {
        if (this.state.loadingNewItem) return
        if (this.state.charEnded) return

        if (window.innerHeight + window.scrollY >= document.body.offsetHeight + 50) {
            this.onRequest(this.state.offset);
        }
    }

    onRequest = (offset) => {
        this.onListLoading()
        this.marvelService.getAllCharacters(offset)
            .then(this.listLoaded)
            .catch(this.onError)
    }

    onListLoading = () => {
        this.setState({ loadingNewItem: true })
    }

    listLoaded = (newCharList) => {
        let ended = false
        if (newCharList.length < 9) ended = true

        this.setState(({ charList, offset }) => ({
            charList: [...charList, ...newCharList],
            loading: false,
            loadingNewItem: false,
            offset: offset + 9,
            charEnded: ended
        }))
    }

    onError = () => {
        this.setState({ loading: false, error: true })
    }

    renderItems(arr) {

        const items = arr.map(card => {
            let { id, name, thumbnail } = card

            let imgStyle = { objectFit: '' }
            if (thumbnail.includes('image_not_available') || thumbnail.includes('4c002e0305708')) {
                imgStyle = { objectFit: 'unset' }
            }

            return (
                <li className="card" key={id} onClick={() => this.props.onCharSelect(id)}>
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

    render() {
        const { charList, loading, loadingNewItem, error, offset } = this.state
        const cards = this.renderItems(charList)
        // const spinner = loading ? <Spinner /> : null
        const errorMessage = error ? <ErrorMessage /> : null

        const content =
            !loading && !error ? cards
                //  : loading && !error ? spinner 
                : !loading && error ? errorMessage
                    : null

        return (
            <div className="char__list">
                {content}
                {loadingNewItem ? <Spinner /> : null}
                {/* <button
                    className="button button__main button__long"
                    disabled={loadingNewItem}
                    onClick={() => this.onRequest(offset)}
                >
                    <div className="inner">load more</div>
                </button> */}
            </div>
        )
    }
}

CharList.propTypes = {
    onCharSelect: PropTypes.func.isRequired
}

export default CharList;