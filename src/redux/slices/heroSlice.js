import { createAsyncThunk, createEntityAdapter, createSlice } from "@reduxjs/toolkit"

import { _transformCharacter } from "../middlewares/transformDataMiddleware"

const _apiBase = 'https://gateway.marvel.com:443/v1/public/'
const _apiKey = '90d8837848db3f5da67d76fb430612fd'

const heroesAdapter = createEntityAdapter()

export const fetchHeroes = createAsyncThunk(
    'heroes/fetchHeroes',
    async (prop, api) => {
        const res = await fetch(`${_apiBase}characters?limit=9&offset=${prop}&apikey=${_apiKey}`)
            .then(res => res.json())
        return res.data.results.map(_transformCharacter)
    }
)

const heroesSlice = createSlice({
    name: 'heroes',
    initialState: heroesAdapter.getInitialState({
        heroesLoadingStatus: 'idle',
        heroesList: []
    }),
    reducers: {
        getMoreHeroes: (state, action) => {

        },
        getSingleHero: (state, action) => {

        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchHeroes.pending, (state) => { state.heroesLoadingStatus = 'pending' })
            .addCase(fetchHeroes.rejected, (state) => { state.heroesLoadingStatus = 'rejected' })
            .addCase(fetchHeroes.fulfilled, (state, action) => {
                state.heroesLoadingStatus = 'idle'
                state.heroesList.push(...action.payload)
                // heroesAdapter.setAll(state, action.payload)
            })
            .addDefaultCase(() => { })
    }
})

export default heroesSlice.reducer

export const { selectAll } = heroesAdapter.getSelectors(state => state.heroes)
export const {
    getMoreHeroes,
    getSingleHero
} = heroesSlice.actions