export const _transformCharacter = (char) => ({
    id: char.id,
    thumbnail: `${char.thumbnail.path}.${char.thumbnail.extension}`,
    name: char.name,
    description: char.description,
    comics: char.comics.items,
    homepage: char.urls[0].url,
    wiki: char.urls[1].url,
})

export const _transformComic = (comic) => ({
    id: comic.id,
    digitalId: comic.digitalId,
    title: comic.title,
    description: comic.description,
    pages: comic.pageCount,
    prices: {
        print: comic.prices.filter(item => item.type === 'printPrice'),
        digital: comic.prices.filter(item => item.type === 'digitalPurchasePrice')
    },
    thumbnail: `${comic.thumbnail.path}.${comic.thumbnail.extension}`,
    language: comic.textObjects.language || 'en-us'
})

export const _transformData = (data) => {
    if (data.description.length === 0) return { ...data, description: `There is no description for ${data.name}` }
    if (data.description.length >= 213) return { ...data, description: data.description.slice(0, 200) + '...' }
    return data
}

const transformRespose = store => next => action => {
    // rtq
    if (action.type === 'marvel/api/executeQuery/fulfilled' && action.meta.arg.endpointName === 'getSingleHero') action.payload = _transformData(_transformCharacter(action.payload.results[0]))
    if (action.type === 'marvel/api/executeQuery/fulfilled' && action.meta.arg.endpointName === 'getHeroes') action.payload = action.payload.map(_transformCharacter)
    if (action.type === 'marvel/api/executeQuery/fulfilled' && action.meta.arg.endpointName === 'getHeroByName') action.payload = action.payload.map(_transformCharacter)
    if (action.type === 'marvel/api/executeQuery/fulfilled' && action.meta.arg.endpointName === 'getComics') action.payload = action.payload.map(_transformComic)

    // reducers
    if (action.type === 'heroes/fetchSingleHero/fulfilled') action.payload = _transformData(_transformCharacter(action.payload.data.results[0]))
    return next(action)
}

export default transformRespose