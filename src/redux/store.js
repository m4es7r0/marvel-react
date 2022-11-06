import { configureStore } from '@reduxjs/toolkit'
import transformRespose from './middlewares/transformDataMiddleware'
import heroesReducer from './slices/heroSlice'
import comicsReducer from './slices/comicSlice'
import marvel from './api/marvel.api'

const store = configureStore({
    reducer: {
        heroes: heroesReducer,
        comics: comicsReducer,
        [marvel.reducerPath]: marvel.reducer
    },
    middleware: getDefaultMiddleware => (
        [...getDefaultMiddleware().concat(transformRespose, marvel.middleware)]
    ),
    devTools: true
})

export default store