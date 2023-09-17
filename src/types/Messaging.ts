export type MessagingChannel = 'email' | 'sms' | 'push'

export type MessagingSystem = 'llts' | 'classic'

interface Recipient {
  messageKey: string
  contactKey: string
  to: string
  attributes: any
}

interface MessagePayload {
  recipients: Recipient[]
}

export interface EmailSendMessagePayload extends MessagePayload {}

export interface EmailSendMessageOptions {
  type?: 'sync' | 'async'
}
