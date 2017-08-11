import { NativeModules, NativeAppEventEmitter, Platform } from 'react-native';
const SessionManager = NativeModules.OpenTokSessionManager;

const listener = null;

export const connect = SessionManager.connect;
export const sendMessage = SessionManager.sendMessage;

export const onMesssageReceived = (callback) => {
  listener = NativeAppEventEmitter.addListener(
      'onMessageReceived',
      (e) => callback(e)
    );
};

export const stopListener = () => listener.remove();
