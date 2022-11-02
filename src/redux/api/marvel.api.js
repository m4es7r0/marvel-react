import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

const apikey = '90d8837848db3f5da67d76fb430612fd'

const marvel = createApi({
    reducerPath: 'marvel/api',
    baseQuery: fetchBaseQuery({ baseUrl: 'https://gateway.marvel.com:443/v1/public/' }),
    endpoints: (builder) => ({
        getHeroes: builder.query({
            query: (offset) => ({
                url: 'characters',
                params: {
                    apikey,
                    offset,
                    limit: 9,
                }
            }),
            transformResponse: ({ data }) => {
                return data.results
            }
        }),
        getSingleHero: builder.query({
            query: (id) => ({
                url: `characters/${id}`,
                params: {
                    apikey
                }
            }),
            transformResponse: ({ data }) => {
                return data
            }
        }),
        getHeroByName: builder.query({
            query: (name) => ({
                url: `characters`,
                params: {
                    apikey,
                    name
                }
            }),
            transformResponse: ({ data }) => {
                return data.results
            }
        }),
        getComics: builder.query({
            query: (offset) => ({
                url: 'comics',
                params: {
                    limit: 8,
                    offset,
                    apikey,
                }
            }),
            transformResponse: ({ data }) => {
                return data.results
            }
        }),
        getSingleComic: builder.query({
            query: (id) => ({
                url: `comics/${id}`,
                params: {
                    apikey
                }
            }),
            transformResponse: ({ data }) => {
                return data
            }
        }),
    }),
})

export const {
    useGetHeroesQuery,
    useLazyGetHeroesQuery,
    useGetSingleHeroQuery,
    useLazyGetSingleHeroQuery,
    useGetHeroByNameQuery,
    useLazyGetHeroByNameQuery,
    useGetComicsQuery,
    useLazyGetComicsQuery,
    useGetSingleComicQuery
} = marvel

export default marvel