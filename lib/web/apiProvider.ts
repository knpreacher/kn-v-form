import { DefaultSelectionOption } from '@/types.ts'

export interface ListQueryOptions {
  limit?: number,
  offset?: number,

  [key: string]: any
}

export interface PreparedListResponse<T = any> {
  count: number
  offset: number
  limit: number
  items: T[]
}

export interface ApiProviderOptions<OType = any, ListResponse = any> {
  retrieveObject: <T = OType>(itemQuery: any) => Promise<T>
  list: (query: ListQueryOptions) => Promise<ListResponse>
  itemAsOption?: <T = OType>(item: T) => DefaultSelectionOption
  getItemsFromListResponse: <T = OType>(listResponse: ListResponse) => T[]
  getTotalFromListResponse: (listResponse: ListResponse) => number
  getOffsetFromListResponse?: (listResponse: ListResponse) => number
  getLimitFromListResponse?: (listResponse: ListResponse) => number
}

export class BaseApiProvider {
  private _options: ApiProviderOptions

  constructor(
    public options: ApiProviderOptions
  ) {
    this._options = options
  }

  async retrieveObject(itemQuery: any) {
    if (!this._options.retrieveObject) {
      throw new Error('retrieveObject is not defined')
    }
    return this._options.retrieveObject(itemQuery)
  }

  async list(query: ListQueryOptions) {
    if (!this._options.list) {
      throw new Error('list is not defined')
    }
    return this._options.list(query)
  }

  async preparedList(query: ListQueryOptions) {
    const listResponse = await this.list(query)
    const items = this._options.getItemsFromListResponse(listResponse)
    const total = this._options.getTotalFromListResponse(listResponse)
    const offset = this._options.getOffsetFromListResponse ? this._options.getOffsetFromListResponse(listResponse) : 0
    const limit = this._options.getLimitFromListResponse ? this._options.getLimitFromListResponse(listResponse) : 0
    return {
      count: total,
      offset,
      limit,
      items
    } as PreparedListResponse
  }

  itemAsOption(item: any) {
    if (!this._options.itemAsOption) {
      throw new Error('itemAsOption is not defined')
    }
    return this._options.itemAsOption(item)
  }
}