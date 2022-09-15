import { useHttp } from "../hooks/http.hook"

const useMarvelService = () => {
    const { loading, request, error, clearError } = useHttp();

    const _apiBase = 'https://gateway.marvel.com:443/v1/public/'
    const _apiKey = '90d8837848db3f5da67d76fb430612fd'
    const _charOffset = 210

    const _transformCharacter = (char) => ({
        id: char.id,
        thumbnail: `${char.thumbnail.path}.${char.thumbnail.extension}`,
        name: char.name,
        description: char.description,
        comics: char.comics.items,
        homepage: char.urls[0].url,
        wiki: char.urls[1].url,
    })

    const _transformComic = (comic) => ({
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

    const _transformData = (data) => {
        if (data.description.length === 0) return { ...data, description: `There is no description for ${data.name}` }
        if (data.description.length >= 213) return { ...data, description: data.description.slice(0, 200) + '...' }
        return data
    }

    const getAllCharacters = async (offset = _charOffset) => {
        const res = await request(`${_apiBase}characters?limit=9&offset=${offset}&apikey=${_apiKey}`)
        return res.data.results.map(_transformCharacter)
    }

    const getAllComics = async (offset = 0) => {
        const res = await request(`${_apiBase}comics?noVariants=true&orderBy=-focDate&limit=8&offset=${offset}&apikey=${_apiKey}`)
        return res.data.results.map(_transformComic)
    }

    const getCharacter = async (id = 1011096) => {
        const res = await request(`${_apiBase}characters/${id}?apikey=${_apiKey}`)
        return _transformData(_transformCharacter(res.data.results[0]))
    }

    const getComic = async (id = 84347) => {
        const res = await request(`${_apiBase}comics/${id}?apikey=${_apiKey}`)
        return _transformComic(res.data.results[0])
    }

    return {
        getCharacter,
        getComic,
        getAllCharacters,
        getAllComics,
        loading,
        error,
        clearError
    }
}

export default useMarvelService