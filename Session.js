import { NativeModules, NativeAppEventEmitter, Platform } from 'react-native';
const SessionManager = NativeModules.OpenTokSessionManager;

const listener = null;

export const connect = SessionManager.connect;
export const sendMessage = SessionManager.sendMessage;

export const onMessageRecieved = (callback) => {
  listener = NativeAppEventEmitter.addListener(
      'onMessageRecieved',
      (e) => callback(e)
    );
};

export const stopListener = () => listener.remove();
