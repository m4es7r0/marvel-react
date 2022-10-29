import { Routes, Route } from 'react-router-dom'

import { Main, Comics, Comic, Character, NotFound } from '../pages';
import AppHeader from "../appHeader/AppHeader";
import ScrollToTop from '../scrollToTop/ScrollToTop';

// import { lazy, Suspense } from 'react';
// const Main = lazy(() => import('../pages/Main'))
// const Comics = lazy(() => import('../pages/Comics'))
// const Character = lazy(() => import('../pages/Character'))
// const Comic = lazy(() => import('../pages/Comic'))
// const NotFound = lazy(() => import('../pages/NotFound'))


const App = () => {
    return (
        <div className="app">
            <ScrollToTop />
            <AppHeader />
            <Routes>
                <Route path='/'>
                    <Route index element={<Main />} />
                    <Route path='comics' element={<Comics />} />
                    <Route path='comics/:id' element={<Comic />} />
                    <Route path='character/:charId' element={<Character />} />
                    <Route path='*' element={<NotFound />} />
                </Route>
            </Routes>
        </div>
    )
}

export default App;