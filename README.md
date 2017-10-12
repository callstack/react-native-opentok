# react-native-opentok

<a title="Join on Slack" href="https://slack.callstack.io/"><img src="https://slack.callstack.io/badge.svg" /></a>

[![OpenTok](https://res.cloudinary.com/crunchbase-production/image/upload/v1397239567/b6e16559b20f878d11be8a66e92d9c00.png)](https://tokbox.com)

**React Native OpenTok** is wrapper over native [TokBox OpenTok SDK](https://tokbox.com/developer/). The OpenTok platform, developed by TokBox, makes it easy to embed high-quality interactive video, voice, messaging, and screen sharing into web and mobile apps. OpenTok uses WebRTC for audio-video communications 👀🎧. For more info on how OpenTok works, check out [OpenTok Basics](https://tokbox.com/developer/guides/basics/).

## Requirements:
-  `react-native` >=0.49.3

Supported OpenTok SDK version:
- `OpenTok SDK` 2.11.4

## Table of contents
- [Installation](#installation)
- [API Reference](#api-reference)
- [Components](#components)
- [Usage](#usage)

## Installation
React native OpenTok SDK depends on native OpenTok SDK implementations. You need to integrate OpenTok SDK into your existing application. Following steps needs to be done in order to have library working correctly:

Add library using `yarn` 📦 (or `npm`):

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

  pod 'yoga', path: "#{node_modules_path}/react-native/ReactCommon/yoga/yoga.podspec"
  pod 'React', path: "#{node_modules_path}/react-native"

  pod 'RNOpenTok', path: "#{node_modules_path}/react-native-opentok/ios"
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
5. Open <YOUR_PROJECT_NAME>.xcworkspace file (you'll need to use it as a starting file from now on).
6. Add `OPENTOK_API_KEY` key to your `Info.plist`:
```xml
<key>OPENTOK_API_KEY</key>
<string>YOUR_API_KEY</string>
```
7. Run the project 🎉.

### Android

1. Run `react-native link`.
2. Edit your `android/build.gradle` file and update *allprojects* section:
```gradle
allprojects {
    repositories {
        ...
        maven {
            url "http://tokbox.bintray.com/maven"
        }
    }
}
```
3. Add `OPENTOK_API_KEY` to your `AndroidManifest.xml`(within `<application>` tag):
```xml
<meta-data android:name="OPENTOK_API_KEY" android:value="YOUR_OPENTOK_API_KEY" />
```
4. Run the project 🎉.

## API Reference

#### connect(sessionId: string, token: string): Promise<boolean | Error>
Connects to choosen session.
```js
const connectToSession = async () => {
  try {
    await OpenTok.connect('YOUR_SESSION_ID', 'YOUR_TOKEN');
  } catch (e) {
    console.log(e)
  }
}
```

#### disconnect(sessionId: string): void
Disconnects from chosen session.
```js
OpenTok.disconnect('YOUR_SESSION_ID');
```

#### disconnectAll(): void
Disconnects all available sessions.
```js
OpenTok.disconnectAll();
```

#### sendSignal(sessionId: string, type: string, message: string): Promise<boolean | Error>
Send signal to chosen session.
```js
const connectToSession = async () => {
  try {
    await OpenTok.connect('YOUR_SESSION_ID', 'YOUR_TOKEN');
  } catch (e) {
    console.log(e)
  }
}
```

#### events 
Constants for events thrown in app. Available values:
- *ON_SIGNAL_RECEIVED*
- *ON_SESSION_CONNECTION_CREATED*
- *ON_SESSION_CONNECTION_DESTROYED*
- *ON_SESSION_DID_CONNECT*
- *ON_SESSION_DID_DISCONNECT*
- *ON_SESSION_DID_FAIL_WITH_ERROR*
- *ON_SESSION_STREAM_CREATED*
- *ON_SESSION_STREAM_DESTROYED*

#### on(name: string, callback: Function)
Event listener, for events listed above.
```js
OpenTok.on(OpenTok.events.ON_SIGNAL_RECEIVED, e => console.log(e));
```

#### removeListener(name: string): void
Removes listener.
```js
OpenTok.removeListener(OpenTok.events.ON_SIGNAL_RECEIVED);
```

## Components

#### <PublisherView />
Component used for publishing the video to the stream.

Available props:
- `sessionId: string` - ID of the session (you need to connect it before using this component).
- `onPublishStart?: Function` - Invoked when publishing starts. Optional.
- `onPublishStop?: () => void` - Invoked when publishing stops. Optional.
- `onPublishError?: () => void` - Invoked when publish error occurs. Optional.
- every [View property](https://facebook.github.io/react-native/docs/viewproptypes.html#props).

```js
<OpenTok.PublisherView
  style={{ height: 100, width: 200 }}
  sessionId={sessionId} 
  onPublishStart={() => { console.log('started')}} 
/>
```

#### <SubscriberView />
Component used for publishing the video to the stream. 

Available props:
- `sessionId: string` - ID of the session (you need to connect it before using this component).
- `onSubscribeStart?: Function` - Invoked when stream starts. Optional.
- `onSubscribeStop?: () => void` - Invoked when stream stops. Optional.
- `onSubscribeError?: () => void` - Invoked when subscribing error occurs. Optional.
- every [View property](https://facebook.github.io/react-native/docs/viewproptypes.html#props).

```js
<OpenTok.SubscriberView 
  style={{ height: 100, width: 200 }}
  sessionId={sessionId} 
  onSubscribeStop={() => { console.log('stopped')}} 
/>
```

## Usage

Simply import the library and use methods/components listed above.

```js
import OpenTok from 'react-native-opentok';
```

Check out [example project](https://github.com/callstack/react-native-opentok/tree/master/example).

### Contributors

<!-- ALL-CONTRIBUTORS-LIST:START - Do not remove or modify this section -->
| [<img src="https://callstack.com/static/assets/team/chudziak@2x.jpg" width="100px;"/><br /><sub>Michał Chudziak</sub>](https://twitter.com/michal_chudziak)<br />[💻](https://github.com/callstack/react-native-opentok/commits?author=mike866 "Code") | [<img src="https://callstack.com/static/assets/team/dratwa@2x.jpg" width="100px;"/><br /><sub>Piotr Drapich</sub>](https://twitter.com/dratwas)<br />[💻](https://github.com/callstack/react-native-opentok/commits?author=dratwas "Code") | [<img src="https://callstack.com/static/assets/team/mike@2x.jpg" width="100px;"/><br /><sub>Mike Grabowski</sub>](https://twitter.com/grabbou)<br />[💻](https://github.com/callstack/react-native-opentok/commits?author=grabbou "Code") |
| :---: | :---: | :---: |
<!-- ALL-CONTRIBUTORS-LIST:END -->

### Credits

Thanks to [TokBox](https://tokbox.com/) for native SDKs development.
