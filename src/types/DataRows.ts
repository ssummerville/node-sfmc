export type AsyncPayload = object[]
export type PayloadType = AsyncPayload | SyncPayload[]

export interface SyncPayload {
  keys: any
  values: any
}
