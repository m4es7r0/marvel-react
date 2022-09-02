import { Component } from 'react';
import ErrorMessage from '../errorMessage/errorMessage';
import Spinner from '../spinner/Spinner';
import Skeleton from '../skeleton/Skeleton'

import MarvelService from '../../services/MarvelService';

import './charInfo.scss';

class CharInfo extends Component {
    state = {
        char: null,
        loading: false,
        error: false,
    }

    marvelService = new MarvelService()

    componentDidMount() {
        this.updChar()
    }

    componentDidUpdate(prevProps, prevState) {
        if (this.props.charId !== prevProps.charId) {
            this.updChar()
        }
    }

    onLoaded = (char) => {
        this.setState({ char, loading: false })
    }

    onError = () => {
        this.setState({ loading: false, error: true })
    }

    updChar = () => {
        const { charId } = this.props
        if (!charId) {
            return
        }

        this.setState({ loading: true, error: false })

        this.marvelService.getCharacter(charId)
            .then(this.onLoaded)
            .catch(this.onError)
    }

    render() {
        const { char, loading, error } = this.state

        const errorMessage = error ? <ErrorMessage /> : null
        const spinner = loading ? <Spinner /> : null
        const skeleton = char || errorMessage || spinner ? null : <Skeleton />
        const content = !(loading || error || !char) ? <View char={char} /> : null

        return (
            <div className="char__info">
                {skeleton}
                {spinner}
                {errorMessage}
                {content}
            </div>
        )
    }
}

const View = ({ char }) => {
    const { name, description, thumbnail, wiki, homepage, comics } = char
    return (
        <>
            <div className="char__basics">
                <img src={thumbnail} alt={name} />
                <div>
                    <div className="char__info-name">{name}</div>
                    <div className="char__btns">
                        <div className='char__btns__wrapper'>
                            <div>
                                <a href={homepage} className="button button__main button__info">
                                    <div className="inner inner__info">homepage</div>
                                </a>
                                <a href={wiki} className="button button__secondary button__info">
                                    <div className="inner inner__info">Wiki</div>
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="char__descr">{description}</div>
            <div className="char__comics">Comics:</div>
            <ul className="char__comics-list">
                {comics.length > 0 ? null : `There is no comics with ${name}`}
                {
                    comics.map((item, i) => {
                        if (i >= 6) return;
                        let comicId = item.resourceURI.replace('http://gateway.marvel.com/v1/public/comics/', '')
                        return (
                            <li key={comicId} className="char__comics-item">
                                {item.name}
                            </li>
                        )
                    })
                }
            </ul>
        </>
    )
}

export default CharInfo;