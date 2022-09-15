import React from 'react';
import { Routes, Route } from 'react-router-dom'

import AppHeader from "../appHeader/AppHeader";
import { Main, Comics, Comic, NotFound, Character } from '../pages';

const App = () => {
    return (
        <div className="app">
            <AppHeader />
            <main>
                <Routes>
                    <Route path='/'>
                        <Route index element={<Main />} />
                        <Route path='character' element={<Character />} />
                        <Route path='comics' element={<Comics />} />
                        <Route path='comics/:id' element={<Comic />} />
                        <Route path='*' element={<NotFound />} />
                    </Route>
                </Routes>
            </main>
        </div>
    )
}

export default App;