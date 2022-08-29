import { Component } from 'react';

import './randomChar.scss';
import mjolnir from '../../resources/img/mjolnir.png';
import MarvelService from '../../services/MarvelService';

class RandomChar extends Component {
    constructor(props) {
        super(props)
        this.updChar()
    }

    state = {
        char: {}
    }

    marvelService = new MarvelService()

    onCharLoaded = (char) => {
        this.setState({ char })
    }

    updChar = () => {
        this.marvelService
            .getCharacter(Math.floor(Math.random() * (1011400 - 1011000) + 1011000))
            .then(this.onCharLoaded)
    }

    render() {
        let { name, description, thumbnail, homepage, wiki } = this.state.char
        // let imgStyle = { objectFit: 'cover' }
        // if (thumbnail.includes('image_not_avalible') || thumbnail.includes('image_not_avalible')) imgStyle = { objectFit: 'fill' }

        return (
            <div className="randomchar">
                <div className="randomchar__block">
                    <img src={thumbnail} alt="Random character" className="randomchar__img" style={{objectFit: 'fill'}}/>
                    <div className="randomchar__info">
                        <p className={`randomchar__name`}>{name}</p>
                        <p className="randomchar__descr">
                            {description}
                        </p>
                        <div className="randomchar__btns">
                            <a href={homepage} className="button button__main">
                                <div className="inner">homepage</div>
                            </a>
                            <a href={wiki} className="button button__secondary">
                                <div className="inner">Wiki</div>
                            </a>
                        </div>
                    </div>
                </div>
                <div className="randomchar__static">
                    <p className="randomchar__title">
                        Random character for today!<br />
                        Do you want to get to know him better?
                    </p>
                    <p className="randomchar__title">
                        Or choose another one
                    </p>
                    <button className="button button__main">
                        <div className="inner" onClick={() => this.updChar()}>try it</div>
                    </button>
                    <img src={mjolnir} alt="mjolnir" className="randomchar__decoration" />
                </div>
            </div>
        )
    }
}

export default RandomChar;