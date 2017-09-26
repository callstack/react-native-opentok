/* @flow */

export type Message = {
  message: string,
}

type OpenTokViewProps = {
  listeners: {
    [listenerName: string]: Object,
  }
}

export type PublisherViewProps = OpenTokViewProps & {
    onPublishStart: () => void,
    onPublishStop: () => void,
    onPublishError: () => void
}

export type SubscriberViewProps = OpenTokViewProps & {
    onSubscribeStart: () => void,
    onSubscribeStop: () => void,
    onSubscribeError: () => void
}