import AssetResource from './resources/assets/Asset'

let client = {
  assets: AssetResource,
}

client.assets.getByID(1).then((response) => {
  console.log(response.data)
})

export default client
