import type { BaseProperty, ResBasePagination } from '../../pages'
import BaseAPI from './_base'

export type ResTypeList = ResBasePagination<BaseProperty[]>

class ApiPokemonType extends BaseAPI {
  constructor() {
    super()
  }

  public async getList() {
    try {
      const { data } = await this._fetch.get<ResTypeList>(`type`)

      return data
    } catch (error) {
      console.error(error)
    }
  }
}

export default new ApiPokemonType()
