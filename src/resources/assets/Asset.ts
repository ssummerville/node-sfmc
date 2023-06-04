import DeletedAssetResource from './DeletedAsset'

import rest from '../../services/rest'

let BASE_URI = 'asset/v1/content'

let Asset = {
  deleted: DeletedAssetResource,
  // GET
  getByID: (id: number) => rest.get(`${BASE_URI}/assets/${id}`),
  getFile: (id: number) => rest.get(`${BASE_URI}/assets/${id}/file`),
  getSalutations: () => {},
  // POST
  query: (data: any) => rest.post(`${BASE_URI}/assets/query`, data),
  create: (data: any) => rest.post(`${BASE_URI}/assets`, data),
  // PUT
  update: (id: number, data: any) => rest.put(`${BASE_URI}/assets/${id}`, data),
  // DELETE

  /**
   * Deletes an asset by ID.
   * @param id The ID of the asset to delete.
   * @param isCDNDelete Whether to delete the asset from Content Builder and the CDN as well. Use this if you want to break a link to an asset.
   */
  delete: (id: number, isCDNDelete?: boolean) =>
    rest.delete(
      `${BASE_URI}/assets/${id}${isCDNDelete === true ? '/?isCDNDelete=1' : ''}`
    ),
}

export default Asset
