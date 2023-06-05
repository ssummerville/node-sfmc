let DataRowsResource = {
  insert: (key: string, data: any) => {
    console.log(`Inserting ${data} into ${key}`)

    let requestId = 'random'

    return {
      requestId,
      status: () => {},
    }
  },
}

export default DataRowsResource
