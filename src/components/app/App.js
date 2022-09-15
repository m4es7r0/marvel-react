import React from 'react';
import { Routes, Route } from 'react-router-dom'

import AppHeader from "../appHeader/AppHeader";
import { Main, Comics, Comic } from '../pages';

const App = () => {
    const [comicID, setComicID] = React.useState(0)

    const setComic = (id) => {
        setComicID(id)
    }
    console.log(comicID);

    return (
        <div className="app">
            <AppHeader />
            <Routes>
                <Route path='/'>
                    <Route index element={<Main setComic={setComic} />} />
                    <Route path='comics' element={<Comics setComic={setComic} />} />
                    <Route path='comics/*' element={<Comic comicID={comicID} />} />
                </Route>
            </Routes>
        </div>
    )
}

export default App;