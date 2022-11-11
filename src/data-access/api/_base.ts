import axios from 'axios'

export type BaseFetcher = BaseAPI['_fetch']

class BaseAPI {
  protected _fetch = axios.create({ baseURL: 'https://pokeapi.co/api/v2/' })
}

export default BaseAPI
