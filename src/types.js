/* @flow */

export type MessageEvent = {
  sessionId: string,
  type: string,
  data: string,
};

export type RNOpenTokEventCallback = (event: { [key: string]: string }) => void;

type OpenTokViewProps = {
  listeners: {
    [listenerName: string]: RNOpenTokEventCallback,
  },
  sessionId: string,
};

export type PublisherViewProps = OpenTokViewProps & {
  onPublishStart: () => void,
  onPublishStop: () => void,
  onPublishError: () => void,
};

export type SubscriberViewProps = OpenTokViewProps & {
  onSubscribeStart: () => void,
  onSubscribeStop: () => void,
  onSubscribeError: () => void,
};
