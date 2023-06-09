import rest from '../../services/rest'

let BASE_URI: string = 'asset/v1/content/assets'

let AssetResource = {
  // GET
  get(id: number) {
    return rest.get(`${BASE_URI}/${id}`)
  },
  getFile(id: number) {
    return rest.get(`${BASE_URI}/${id}/file`)
  },
  // POST
  query(data: any) {
    return rest.post(`${BASE_URI}/query`, data)
  },
  create(data: any) {
    return rest.post(`${BASE_URI}/`, data)
  },
  // PUT
  update(id: number, data: any) {
    return rest.put(`${BASE_URI}/${id}`, data)
  },
  // DELETE

  /**
   * Deletes an asset by ID.
   * @param id The ID of the asset to delete.
   * @param isCDNDelete Whether to delete the asset from Content Builder and the CDN as well. Use this if you want to break a link to an asset.
   */
  delete(id: number, isCDNDelete: boolean = false) {
    return rest.delete(`${BASE_URI}/assets/${id}`, { params: { isCDNDelete } })
  },
}

export default AssetResource
