/* @flow */

export type MessageEvent = {|
  sessionId: string,
  type: string,
  data: string,
|};

export type RNOpenTokEventCallback = (event: { [key: string]: string }) => void;

type OpenTokViewProps = {
  sessionId: string,
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
