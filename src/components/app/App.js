import { lazy, Suspense } from 'react';
import { Routes, Route } from 'react-router-dom'

// import { Main, Comics, Comic, NotFound, Character } from '../pages';
import AppHeader from "../appHeader/AppHeader";
import ScrollToTop from '../scrollToTop/ScrollToTop';
import Spinner from '../spinner/Spinner';

const Main = lazy(() => import('../pages/Main'))
const Character = lazy(() => import('../pages/Character'))
const Comics = lazy(() => import('../pages/Comics'))
const Comic = lazy(() => import('../pages/Comic'))
const NotFound = lazy(() => import('../pages/NotFound'))

const App = () => {
    return (
        <div className="app">
            <ScrollToTop />
            <AppHeader />
            <main>
                <Suspense fallback={<Spinner />}>
                    <Routes>
                        <Route path='/'>
                            <Route index element={<Main />} />
                            <Route path='comics' element={<Comics />} />
                            <Route path='comics/:id' element={<Comic />} />
                            <Route path='character/:charId' element={<Character />} />
                            <Route path='*' element={<NotFound />} />
                        </Route>
                    </Routes>
                </Suspense>
            </main>
        </div>
    )
}

export default App;