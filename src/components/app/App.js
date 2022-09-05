import { Component } from "react";

import ErrorBoundary from "../errorBoundary/ErrorBoundary";
import AppHeader from "../appHeader/AppHeader";
import RandomChar from "../randomChar/RandomChar";
import CharList from "../charList/CharList";
import CharInfo from "../charInfo/CharInfo";

import decoration from '../../resources/img/vision.png';

class App extends Component {
    state = {
        charSelected: null
    }

    onCharSelect = (id) => {
        this.setState({ charSelected: id })
    }

    transformDescriptonForCharInfo = (description, name) => {
        if (description === `There is no description for ${name}`) {
            return (
                <>
                    {description.replace(name, '')}
                    <p style={{ fontWeight: '600', display: 'inline' }}>{name}</p>
                </>
            )
        }
        return description
    }

    render() {
        return (
            <div className="app">
                <AppHeader />
                <main>
                    <ErrorBoundary><RandomChar /></ErrorBoundary>
                    <div className="char__content">
                        <ErrorBoundary>
                            <CharList onCharSelect={this.onCharSelect} />
                        </ErrorBoundary>
                        <ErrorBoundary>
                            <CharInfo
                                charId={this.state.charSelected}
                                renderDescription={(description, name) => this.transformDescriptonForCharInfo(description, name)} />
                        </ErrorBoundary>
                    </div>
                    <img className="bg-decoration" src={decoration} alt="vision" />
                </main>
            </div>
        )
    }
}

export default App;