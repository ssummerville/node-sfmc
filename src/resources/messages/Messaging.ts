import rest from '../../services/rest'

import type {
  EmailSendMessageOptions,
  EmailSendMessagePayload,
  MessagingChannel,
  MessagingSystem,
} from '../../types/Messaging'

let constructBaseLink = (
  key: string,
  channel: MessagingChannel,
  method: MessagingSystem
) => {
  let base: string

  // Pretty simple for LLTS
  if (method === 'llts') {
    base = `messaging/v1/${channel}/messages/`
  }

  // Everything else is a bit more complicated
  if (method === 'classic') {
    switch (channel) {
      case 'email':
        base = `messaging/v1/messageDefinitionSends/key:${key}/`
        break
      case 'sms':
        base = `sms/`
        break
      case 'push':
        base = `push/v1/`
        break
    }
  }

  // Not sure why this is erroring about base not being defined. Ignore for now.
  // @ts-ignore
  return base
}

let MessagingResource = {
  // Send Definitons
  definitions: {
    list() {},
    get(key: string) {},
    create(key: string) {},
    update(key: string) {},
    delete(key: string) {},
    // Shortcut functions, not sure if these can be implemented
    republish() {},
    activate() {},
    deactivate() {},
    queue: {
      get(key: string) {},
      clear(key: string) {},
    },
  },
  // Channels
  email: {
    send(
      key: string,
      payload: EmailSendMessagePayload,
      method: MessagingSystem,
      options?: EmailSendMessageOptions
    ) {},
  },
  sms: {
    send(key: string, payload: any, options?: any) {},
  },
  push: {
    send(key: string, payload: any, options?: any) {},
  },
}

export default MessagingResource
