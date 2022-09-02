import { Component } from 'react';
import Spinner from '../spinner/Spinner';
import ErrorMessage from '../errorMessage/errorMessage';

import MarvelService from '../../services/MarvelService';

import './charList.scss';

class CharList extends Component {
    state = {
        charList: [],
        loading: true,
        error: false
    }
    marvelService = new MarvelService()

    componentDidMount() {
        this.updList()
    }

    listLoaded = (charList) => {
        this.setState({ charList, loading: false })
    }

    updList = () => {
        this.marvelService.getAllCharacters().then(this.listLoaded)
    }

    renderItems(arr) {

        const items = arr.map(card => {
            let { id, name, thumbnail } = card

            let imgStyle = { objectFit: '' }
            if (thumbnail.includes('image_not_available') || thumbnail.includes('4c002e0305708')) {
                imgStyle = { objectFit: 'unset' }
            }

            return (
                <li className="card" key={id}>
                    <div className="card__block">
                        <div className="card__header">
                            <div className="card__header-img">
                                <img src={thumbnail} alt="char" style={imgStyle} />
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
        const { charList, loading, error } = this.state
        const cards = this.renderItems(charList)
        const spinner = loading ? <Spinner /> : null
        const errorMessage = error ? <ErrorMessage /> : null

        const content = !loading && !error ? cards : loading && !error ? spinner : !loading && error ? errorMessage : null

        return (
            <div className="char__list">
                {content}
                <button className="button button__main button__long" onClick={() => this.updList()}>
                    <div className="inner">load more</div>
                </button>
            </div>
        )
    }
}

export default CharList;