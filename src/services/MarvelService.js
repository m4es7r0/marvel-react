class MarvelService {
    _apiBase = 'https://gateway.marvel.com:443/v1/public/'
    _apiKey = '5edd85bb5eef761ea6190f242cafb309'

    getResource = async (url) => {
        let res = await fetch(url)

        if (!res.ok) throw new Error(`Could not fetch ${url}, status ${res.status}`)
        else return await res.json()
    }

    getAllCharacters = () => this.getResource(`${this._apiBase}characters?limit=9&offset=230&apikey=${this._apiKey}`)

    getCharacter = (id = 1011136) => this.getResource(`${this._apiBase}characters/${id}?apikey=${this._apiKey}`)
}

export default MarvelService