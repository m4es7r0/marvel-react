import { createAsyncThunk } from "@reduxjs/toolkit"

const _apiBase = 'https://gateway.marvel.com:443/v1/public/'
const _apiKey = '90d8837848db3f5da67d76fb430612fd'

export const fetchHeroes = createAsyncThunk(
    'heroes/fetchHeroes',
    async (offset, api) => {
        const res = await fetch(`${_apiBase}characters?limit=9&offset=${offset}&apikey=${_apiKey}`)
            .then(res => res.json())
        return res
    }
)

export const fetchSingleHero = createAsyncThunk(
    'heroes/fetchSingleHero',
    async (id, api) => {
        const res = await fetch(`${_apiBase}characters/${id}?apikey=${_apiKey}`)
            .then(res => res.json())
        return res
    }
)

export const fetchSingleHeroByName = createAsyncThunk(
    'heroes/fetchSingleHeroByName',
    async (name = '', api) => {
        const res = await fetch(`${_apiBase}characters?name=${name}&apikey=${_apiKey}`)
            .then(res => res.json())
        return res
    }
)

export const fetchComics = createAsyncThunk(
    'heroes/fetchComics',
    async (offset, api) => {
        const res = await fetch(`${_apiBase}comics?noVariants=true&orderBy=-focDate&limit=8&offset=${offset}&apikey=${_apiKey}`)
            .then(res => res.json())
        return res
    }
)

export const fetchSingleComic = createAsyncThunk(
    'heroes/fetchSingleComic',
    async (id, api) => {
        const res = await fetch(`${_apiBase}comics/${id}?apikey=${_apiKey}`)
            .then(res => res.json())
        return res
    }
)