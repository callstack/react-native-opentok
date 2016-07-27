import { requireNativeComponent } from 'react-native';

export const PublisherView = require('./PublisherView').default;
export const SubscriberView = requireNativeComponent('RCTOpenTokSubscriberView');
