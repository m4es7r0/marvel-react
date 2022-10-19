import { createEntityAdapter, createSlice } from "@reduxjs/toolkit"
import { fetchHeroes, fetchSingleHero, fetchSingleHeroByName } from "../actions/fetchAction"

const heroesAdapter = createEntityAdapter()

const heroesSlice = createSlice({
    name: 'heroes',
    initialState: heroesAdapter.getInitialState({
        heroesListStatus: 'idle',
        selectedHeroStatus: 'waiting',
        heroesList: [],
        selectedHero: null
    }),
    reducers: {
        getMoreHeroes: (state, action) => {

        },
        getSingleHero: (state, action) => {

        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchHeroes.pending, (state) => { state.heroesListStatus = 'pending' })
            .addCase(fetchHeroes.rejected, (state) => { state.heroesListStatus = 'rejected' })
            .addCase(fetchHeroes.fulfilled, (state, action) => {
                state.heroesListStatus = 'idle'
                state.heroesList.push(...action.payload)
                // heroesAdapter.setAll(state, action.payload)
            })
            .addCase(fetchSingleHero.pending, (state) => {state.selectedHeroStatus = 'pending'})
            .addCase(fetchSingleHero.rejected, (state) => { state.selectedHeroStatus = 'rejected' })
            .addCase(fetchSingleHero.fulfilled, (state, action) => {
                state.selectedHeroStatus = 'idle'
                state.selectedHero = action.payload
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