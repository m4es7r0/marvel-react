import { configureStore } from '@reduxjs/toolkit'
import transformRespose from './middlewares/transformDataMiddleware'
import heroesReducer from './slices/heroSlice'
import marvel from './api/marvel.api'

const store = configureStore({
    reducer: {
        heroes: heroesReducer,
        [marvel.reducerPath]: marvel.reducer
    },
    middleware: getDefaultMiddleware => (
        [...getDefaultMiddleware().concat(transformRespose, marvel.middleware)]
    ),
    devTools: true
})

export default store