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
    // if (action.type === 'heroes/fetchHeroes/fulfilled') {
    //     action.payload = action.payload.results.map(_transformCharacter)
    //     return next(action)
    // }
    return next(action)
}

export default transformRespose