import './charList.scss';
import abyss from '../../resources/img/abyss.jpg';

const CharList = () => {
    return (
        <div className="char__list">
            <ul className="char__grid">
                <li className="card">
                    <div className="card__block">
                        <div className="card__header">
                            <div className="card__header-img">
                                <img src={abyss} alt="char" />
                            </div>
                        </div>
                        <div className="card__footer">
                            <p>Abyss</p>
                        </div>
                    </div>
                </li>
            </ul>
            <button className="button button__main button__long">
                <div className="inner">load more</div>
            </button>
        </div>
    )
}

export default CharList;