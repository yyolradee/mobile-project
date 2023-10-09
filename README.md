# KMITL TROUBLE

## build project:
    npx expo prebuild
## run:
    ios: npx expo run:ios
    android: npx expo run:android
    run appication: npx expo start

### if andoid can't build:
    1. Create new file in android/
    2. Add this line to the file:
        MAC: sdk.dir = /Users/{UserName}/Library/Android/sdk
        WINDOWS: sdk.dir=C:\\Users\\{UserName}\\AppData\\Local\\Android\\sdk
    3. If still not working open terminal or CMD
    4. Use use command:
        MAC: export ANDROID_HOME=/Users/{UserName}/Library/Android/sdk
        WINDOWS: export ANDROID_HOME=C:\\Users\\{UserName}\\AppData\\Local\\Android\\sdk
    5. Try to build again.

    if still not working:
        eas build --profile development --platform android
## others method for run application use eas clouds:
    npm install -g eas-cli //install eas to your device
    eas build:configure // for configuration
    eas login // use expo account for login
    eas build --profile development --platform (android or ios) //building appication
    eas credentials -p (android or ios) // for generate credentials
