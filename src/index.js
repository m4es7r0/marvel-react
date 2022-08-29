import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './components/app/App';
import MarvelService from './services/MarvelService';
import './style/style.scss';

const marvelService = new MarvelService()
marvelService.getAllCharacters().then(res => res.data.results.forEach(el => console.log(el.name)))
marvelService.getCharacter(1009230).then(res => console.log(...res.data.results))

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);