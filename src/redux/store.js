import { configureStore } from '@reduxjs/toolkit'
import transformRespose from './middlewares/transformDataMiddleware'
import heroesReducer from './slices/heroSlice'
import charlistAPI from './api/charlist.api'

const store = configureStore({
    reducer: {
        heroes: heroesReducer,
        [charlistAPI.reducerPath]: charlistAPI.reducer
    },
    middleware: getDefaultMiddleware => (
        [...getDefaultMiddleware().concat(transformRespose, charlistAPI.middleware)]
    ),
    devTools: true
})

export default store