import DeletedAssetResource from './DeletedAsset'

import rest from '../../services/rest'

let asset = {
  deleted: DeletedAssetResource,
  getByID: (id: number) => rest.get(`asset/v1/content/assets/${id}`),
  getSalutations: () => {},
}

export default asset
