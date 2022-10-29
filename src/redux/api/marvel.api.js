import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

const apikey = '5edd85bb5eef761ea6190f242cafb309'

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
                return data.results[0]
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
                return data.results[0]
            }
        })
    }),
})

export const {
    useGetHeroesQuery,
    useLazyGetHeroesQuery,
    useGetSingleHeroQuery,
    useLazyGetSingleHeroQuery,
    useGetHeroByNameQuery,
    useLazyGetHeroByNameQuery,
} = marvel

export default marvel