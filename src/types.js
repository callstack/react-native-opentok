/* @flow */

export type MessageEvent = {|
  sessionId: string,
  type: string,
  data: string,
|};

export type RNOpenTokEventCallback = (event: { [key: string]: string }) => void;

export type OpenTokEvent =
  | 'onSignalReceived'
  | 'onSessionConnectionCreated'
  | 'onSessionConnectionDestroyed'
  | 'onSessionDidConnect'
  | 'onSessionDidDisconnect'
  | 'onSessionDidFailWithError'
  | 'onSessionStreamCreated'
  | 'onSessionStreamDestroyed';

type OpenTokViewProps = {
  sessionId: string,
  mute?: boolean,
};

type Listeners = {
  listeners: {
    [listenerName: string]: RNOpenTokEventCallback,
  },
};

export type PublisherViewProps = OpenTokViewProps & {
  onPublishStart?: () => void,
  onPublishStop?: () => void,
  onPublishError?: () => void,
};

export type SubscriberViewProps = OpenTokViewProps & {
  onSubscribeStart?: () => void,
  onSubscribeStop?: () => void,
  onSubscribeError?: () => void,
};

export type SubscriberViewPropsWithListeners = SubscriberViewProps & Listeners;
export type PublisherViewPropsWithListeners = PublisherViewProps & Listeners;
