import { createEntityAdapter, createSlice } from "@reduxjs/toolkit"
import { fetchSingleHero } from "../actions/fetchAction"
import marvel from "../api/marvel.api"

const heroesAdapter = createEntityAdapter()

const heroesSlice = createSlice({
    name: 'heroes',
    initialState: heroesAdapter.getInitialState({
        selectedHeroStatus: 'waiting',
        randomHeroStatus: 'pending',
        selectedHero: null,
        heroesList: []
    }),
    extraReducers: (builder) => {
        builder
            .addCase(fetchSingleHero.pending, (state) => { state.selectedHeroStatus = 'pending' })
            .addCase(fetchSingleHero.rejected, (state) => { state.selectedHeroStatus = 'rejected' })
            .addCase(fetchSingleHero.fulfilled, (state, action) => {
                state.selectedHeroStatus = 'idle'
                state.selectedHero = action.payload
            })
            .addMatcher(marvel.endpoints.getSingleHero.matchPending, (state) => { state.randomHeroStatus = 'pending' })
            .addMatcher(marvel.endpoints.getSingleHero.matchRejected, (state) => { state.randomHeroStatus = 'rejected' })
            .addMatcher(marvel.endpoints.getSingleHero.matchFulfilled, (state) => { state.randomHeroStatus = 'idle' })
            .addMatcher(marvel.endpoints.getHeroes.matchFulfilled, (state, action) => { state.heroesList = [...state.heroesList, ...action.payload]})
            .addDefaultCase(() => { })
    }
})

export default heroesSlice.reducer

export const { selectAll } = heroesAdapter.getSelectors(state => state.heroes)
export const {
    getMoreHeroes,
    getSingleHero,
} = heroesSlice.actions