import type { AxiosResponse } from 'axios'
import type { BaseProperty, ResBasePagination, UrlString } from '../../pages'
import BaseAPI from './_base'

export interface PokemonDetail {
  id: number
  name: string
  base_experience: number
  height: number
  is_default: boolean
  weight: number
  forms: BaseProperty[]
  location_area_encounters: UrlString
  species: BaseProperty
  abilities: {
    ability: BaseProperty
    is_hidden: boolean
    slot: number
  }[]
  sprites: {
    back_default: UrlString
    back_female: UrlString
    back_shiny: UrlString
    back_shiny_female: UrlString
    front_default: UrlString
    front_female: UrlString
    front_shiny: UrlString
    front_shiny_female: UrlString
    other: {
      'dream_world': {
        front_default: UrlString
        front_female: UrlString
      }
      'home': {
        front_default: UrlString
        front_female: UrlString
        front_shiny: UrlString
        front_shiny_female: UrlString
      }
      'official-artwork': {
        front_default: UrlString
      }
    }
  }
  stats: {
    base_stat: number
    effort: number
    stat: BaseProperty
  }[]
  types: {
    slot: number
    type: BaseProperty
  }[]
}

export type ResPokemonList = ResBasePagination<BaseProperty[]>

class ApiPokemon extends BaseAPI {
  constructor() {
    super()
  }

  public async getList(limit: number) {
    try {
      const { data } = await this._fetch.get<ResPokemonList>(`pokemon/?limit=${limit}`)

      return data
    } catch (error) {
      console.error(error)
    }
  }

  public async getDetail(pokemonId: PokemonDetail['id']) {
    try {
      const { data } = await this._fetch.get<PokemonDetail>(`pokemon/${pokemonId}`)

      return data
    } catch (error) {
      console.error(error)
    }
  }

  public async getDetailMany(pokemonIds: Promise<AxiosResponse<PokemonDetail, any>>[]) {
    try {
      const resPokemonsDetail = await Promise.all(pokemonIds)

      return resPokemonsDetail.map(pd => pd.data)
    } catch (error) {
      console.error(error)
      return []
    }
  }

  public buildPokemonDetailPromise(pokemons: ResPokemonList['results']) {
    /**
     * get the id from url
     * ex: poke.com/pokemons/17/ -> pokemonId = 17
     */
    const extractPokemonId = (url: BaseProperty['url']) => {
      const segments = url.split('/')
      return segments[segments.length - 2]
    }

    return pokemons.map(p => {
      const pokemonId = extractPokemonId(p.url)
      return this._fetch.get<PokemonDetail>(`pokemon/${pokemonId}`)
    })
  }
}

export default new ApiPokemon()
