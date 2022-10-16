import { configureStore } from '@reduxjs/toolkit'
import transformRespose from './middlewares/transformDataMiddleware'
import heroesReducer from './slices/heroSlice'

const store = configureStore({
    reducer: {
        heroes: heroesReducer
    },
    middleware: getDefaultMiddleware => getDefaultMiddleware().concat(transformRespose),
    devTools: true
})

export default store