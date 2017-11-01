/* @flow */

/**
 * ViewPropTypes package is shipped together with React
 */
// eslint-disable-next-line
import type { ViewProps } from "ViewPropTypes";

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

type OpenTokViewProps = {|
  sessionId: string,
  mute?: boolean,
  style?: $PropertyType<ViewProps, 'style'>,
|};

type Listeners = {|
  listeners: {
    [listenerName: string]: RNOpenTokEventCallback,
  },
|};

export type CameraType = 'front' | 'back' | 'unspecified';

export type PublisherProps = {|
  ...OpenTokViewProps,
  camera?: CameraType,
  onPublishStart?: () => void,
  onPublishStop?: () => void,
  onPublishError?: () => void,
|};

export type PublisherState = {
  camera: CameraType,
};

export type SubscriberProps = {|
  ...OpenTokViewProps,
  onSubscribeStart?: () => void,
  onSubscribeStop?: () => void,
  onSubscribeError?: () => void,
|};

export type SubscriberViewProps = {
  ...SubscriberProps,
  ...Listeners,
};

export type PublisherViewProps = {
  ...PublisherProps,
  ...Listeners,
};
