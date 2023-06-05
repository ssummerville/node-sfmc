import AssetResource from './resources/assets/Asset'
import DeletedAssetResource from './resources/assets/DeletedAsset'
import CategoryResource from './resources/assets/Category'
import DataRowsResource from './resources/data/DataRows'

let client = {
  assets: AssetResource,
  deletedassets: DeletedAssetResource,
  categories: CategoryResource,
  datarows: DataRowsResource,
}

client.assets.get(1).then((response) => {
  console.log(response.data.id)
})

export default client
