import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

const charlistAPI = createApi({
    reducerPath: 'charList/api',
    baseQuery: fetchBaseQuery({ baseUrl: 'https://gateway.marvel.com:443/v1/public/' }),
    endpoints: (builder) => ({
        getHeroes: builder.query({
            query: (offset) => ({
                url: 'characters',
                params: {
                    offset,
                    limit: 9,
                    apikey: '5edd85bb5eef761ea6190f242cafb309'
                },
                method: 'GET'
            }),
            transformResponse: ({ data }) => {
                return data.results
            }
        })
    })
})

export const { useGetHeroesQuery, useLazyGetHeroesQuery } = charlistAPI

export default charlistAPI