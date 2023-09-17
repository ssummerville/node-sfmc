import AssetResource from './resources/assets/Asset'
import DeletedAssetResource from './resources/assets/DeletedAsset'
import CategoryResource from './resources/assets/Category'
import DataRowsResource from './resources/data/DataRows'
import MessagingResource from './resources/messages/Messaging'

let client = {
  assets: AssetResource,
  deletedassets: DeletedAssetResource,
  categories: CategoryResource,
  datarows: DataRowsResource,
  messaging: MessagingResource,
}


export default client
