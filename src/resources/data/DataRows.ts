import rest from '../../services/rest'

import type { Method } from 'axios'
import type {
  PayloadType,
  AsyncPayload,
  SyncPayload,
} from '../../types/DataRows'

let BASE_URI: string = 'data/v1/async'

/**
 * Helper function that creates a request to the DataEvents API
 * and can alter the shape of the payload and endpoint called based on
 * runtime variables. */
let _req = (
  key: string,
  method: Method,
  payload: PayloadType,
  async?: boolean
) => {
  let url: string
  let data: any

  // Depending on whether we're making an async/sync request, we need to use a different
  // endpoint and data structure for our payload. Why? Your guess is as good as mine.
  if (async) {
    url = `${BASE_URI}/dataextensions/key:${key}/rows`
    data = { items: payload }
  } else {
    url = `hub/v1/dataevents/key:${key}/rowset`
    data = payload as SyncPayload[]
  }

  return rest.request({
    url,
    method,
    data,
  })
}

let DataRowsResource = {
  // GET
  /**
   * Retrieve the results of a processed Async API request.
   * @param requestId
   */
  results(requestId: string) {
    return rest.get(`${BASE_URI}/${requestId}/results`)
  },
  /**
   * Retrieve the status of a submitted Async API request.
   * @param requestId
   */
  status(requestId: string) {
    return rest.get(`${BASE_URI}/${requestId}/status`)
  },
  // POST
  insertSync(key: string, values: SyncPayload[]) {
    return _req(key, 'post', values)
  },
  insertAsync(key: string, values: AsyncPayload) {
    return _req(key, 'post', values, true)
  },
  // PUT
  update(key: string, values: AsyncPayload) {
    return _req(key, 'put', values, true)
  },
  /**
   * Increment a specific column of a row in a data extension.
   * @param key The external key of the data extension
   * @param primaryKey
   * @param incrementedColumn The column that will have its value incremented
   * @param step How much to increment the value of the column by. Defaults to 1.
   */
  incrementValue(
    key: string,
    primaryKey: { column: string; value: string },
    incrementedColumn: string,
    step: number = 1
  ) {
    let { column, value } = primaryKey
    return rest.request({
      url: `hub/v1/dataevents/key:${key}/rows/${column}:${value}/column/${incrementedColumn}/increment`,
      method: 'put',
      params: { step },
    })
  },
}

export default DataRowsResource
