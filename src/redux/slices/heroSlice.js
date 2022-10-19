import { createEntityAdapter, createSlice } from "@reduxjs/toolkit"
import { fetchHeroes, fetchSingleHero, fetchSingleHeroByName } from "../actions/fetchAction"

const heroesAdapter = createEntityAdapter()

const heroesSlice = createSlice({
    name: 'heroes',
    initialState: heroesAdapter.getInitialState({
        loadingStatus: 'idle',
        HeroloadingStatus: 'waiting',
        heroesList: [],
        hero: null
    }),
    reducers: {
        getMoreHeroes: (state, action) => {

        },
        getSingleHero: (state, action) => {

        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchHeroes.pending, (state) => { state.loadingStatus = 'pending' })
            .addCase(fetchHeroes.rejected, (state) => { state.loadingStatus = 'rejected' })
            .addCase(fetchHeroes.fulfilled, (state, action) => {
                state.loadingStatus = 'idle'
                state.heroesList.push(...action.payload)
                // heroesAdapter.setAll(state, action.payload)
            })
            .addCase(fetchSingleHero.pending, (state) => {state.HeroloadingStatus = 'pending'})
            .addCase(fetchSingleHero.rejected, (state) => { state.HeroloadingStatus = 'rejected' })
            .addCase(fetchSingleHero.fulfilled, (state, action) => {
                state.HeroloadingStatus = 'idle'
                state.hero = action.payload
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