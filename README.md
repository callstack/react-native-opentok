# react-native-opentok

<a title="Join on Slack" href="https://slack.callstack.io/"><img src="https://slack.callstack.io/badge.svg" /></a>

React Native OpenTok is wrapper over native [TokBox OpenTok SDK](https://tokbox.com/developer/). 

Requirements:
-  `react-native` >= 0.49.3

Supported OpenTok SDK version:
- OpenTok SDK 2.11.4

## Content
- [Installation](#installation)
- [API Reference](#api)
- [Components](#components)

## Installation
React native OpenTok SDK depends on native OpenTok SDK implementations. You need to integrate OpenTok SDK into your existing application. Following steps needs to be done in order to have library working correctly:

```bash
yarn add git+ssh://git@github.com:callstack/react-native-opentok.git
```

### iOS

1. Install [CocoaPods](https://cocoapods.org/) on your computer.
2. Within you application `ios/` directory please run `pod init`.
3. Replace content within your brand-new `Podfile` with:
```ruby
source 'https://github.com/CocoaPods/Specs.git'

platform :ios, '9.0'

target '<YOUR_PROJECT_NAME>' do
  node_modules_path = '../node_modules'

  pod 'yoga', path: "#{node_modules_path}/react-native/ReactCommon/yoga/Yoga.podspec"
  pod 'React', path: "#{node_modules_path}/react-native", subspecs: [
    'Core',
    'RCTActionSheet',
    'RCTAnimation',
    'RCTGeolocation',
    'RCTImage',
    'RCTLinkingIOS',
    'RCTNetwork',
    'RCTSettings',
    'RCTText',
    'RCTVibration',
    'RCTWebSocket',
    'BatchedBridge'
  ]

  pod 'RNOpenTok', path: "#{node_modules_path}/react-native-opentok"
end

post_install do |installer|
  installer.pods_project.targets.each do |target|
    if target.name == "React"
      target.remove_from_project
    end
  end
end
```
4. Run `pod install`.
5. Open <YOUR_PROJECT_NAME>.xcworkspace file and run the project 🎉
6. Add `OPENTOK_API_KEY` key to your `Info.plist`:
```xml
<key>OPENTOK_API_KEY</key>
<string>YOUR_API_KEY</string>
```

### Android

1. Run `react-native link`.
2. Edit your `android/build.gradle` file and update *allprojects* section:
```gradle
allprojects {
    repositories {
        ...
        maven {
            url  "http://tokbox.bintray.com/maven"
        }
    }
}
```
3. Add `OPENTOK_API_KEY` to your `AndroidManifest.xml`:
```xml
<meta-data android:name="OPENTOK_API_KEY" android:value="YOUR_OPENTOK_API_KEY" />
```

## API

- `connect(sessionId: string, token: string): Promise<boolean | Error>` - Connects to choosen session.
- `disconnect(sessionId: string): void` - Disconnects from chosen session.
- `disconnectAll(): void` - Disconnects all available sessions.
- `sendSignal(sessionId: string, type: string, message: string): Promise<boolean | Error>` - Send signal to chosen session.
- `events` - constants for events thrown in app. Available values:
    - ON_SIGNAL_RECEIVED
    - ON_SESSION_COONECTION_CREATED
    - ON_SESSION_CONNECTION_DESTROYED
    - ON_SESSION_DID_CONNECT
    - ON_SESSION_DID_DISCONNECT
    - ON_SESSION_DID_FAIL_WITH_ERROR
    - ON_SESSION_STREAM_CREATED
    - ON_SESSION_STREAM_DESTROYED
- `on(name: string, callback: Function)` - Event listener, for events listed above.
- `removeListener(name: string): void` - Removes listener.

## Components

- `<PublisherView />` - Component used for publishing the video to the stream. Available props:
    - `sessionId: string` - ID of the session (you need to connect it before using this component).
    - `onPublishStart: Function` - Invoked when publishing starts.
    - `onPublishStop: () => void` - Invoked when publishing stops.
    - `onPublishError: () => void` - Invoked when publish error occurs.

- `<SubscriberView />` - Component used for publishing the video to the stream. Available props:
    - `sessionId: string` - ID of the session (you need to connect it before using this component).
    - `onSubscribeStart: Function` - Invoked when stream starts.
    - `onSubscribeStop: () => void` - Invoked when stream stops.
    - `onSubscribeError: () => void` - Invoked when subscribing error occurs.
