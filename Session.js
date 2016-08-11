import { NativeModules, NativeAppEventEmitter } from 'react-native';
const SessionManager = NativeModules.RCTOpenTokSessionManager;

const listener = null;

console.log(NativeModules);

export const connect = SessionManager.connect;
export const sendMessage = SessionManager.sendMessage;

export const onMessageRecieved = (callback) => {
  listener = NativeAppEventEmitter.addListener(
    'onMessageRecieved',
    (e) => callback(e.message)
  );
};

export const stopListener = () => listener.remove();
