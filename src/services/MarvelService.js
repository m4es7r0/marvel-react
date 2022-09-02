class MarvelService {
    _apiBase = 'https://gateway.marvel.com:443/v1/public/'
    _apiKey = '5edd85bb5eef761ea6190f242cafb309'

    getResource = async (url) => {
        let res = await fetch(url)

        if (!res.ok) throw new Error(`Could not fetch ${url}, status ${res.status}`)
        else return await res.json()
    }

    _transformCharacter = (char) => ({
        id: char.id,
        name: char.name,
        description: char.description,
        thumbnail: `${char.thumbnail.path}.${char.thumbnail.extension}`,
        homepage: char.urls[0].url,
        wiki: char.urls[1].url,
    })

    _transformData = (data) => {
        if (data.description.length === 0) return { ...data, description: 'there is no description for this character' }
        else if (data.description.length >= 213) return { ...data, description: data.description.slice(0, 200) + '...' }
        return data
    }

    getAllCharacters = async () => {
        const res = await this.getResource(`${this._apiBase}characters?limit=9&offset=210&apikey=${this._apiKey}`)
        return res.data.results.map(this._transformCharacter)
    }

    getCharacter = async (id = 1011096) => {
        const res = await this.getResource(`${this._apiBase}characters/${id}?apikey=${this._apiKey}`)
        return this._transformData(this._transformCharacter(res.data.results[0]))
    }
}

export default MarvelService