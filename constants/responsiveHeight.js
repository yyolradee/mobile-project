import { useEffect, useState } from 'react';
import { Keyboard, Dimensions, NativeModules, Platform } from 'react-native';

const {height, width} = Dimensions.get('window');

export const actualDimensions = {
  height:  (height<width) ? width : height,
  width: (width>height) ? height : width
};


export const useKeyboardHeight = () => {
  const [keyboardHeight, setKeyboardHeight] = useState(0);

  useEffect(() => {
    const keyboardDidShowListener = Keyboard.addListener(
      'keyboardDidShow',
      (e) => {
        setKeyboardHeight(e.endCoordinates.height);
      }
    );

    const keyboardDidHideListener = Keyboard.addListener(
      'keyboardDidHide',
      () => {
        setKeyboardHeight(0);
      }
    );

    return () => {
      keyboardDidShowListener.remove();
      keyboardDidHideListener.remove();
    };
  }, []);

  return keyboardHeight;
}

export const statusBarHeight = () => {
  const { StatusBarManager } = NativeModules;
  const [statusBarHeight, setStatusBarHeight] = useState();

  useEffect(() => {
    if (Platform.OS === "ios") {
      StatusBarManager.getHeight((value) => {
        setStatusBarHeight(value.height);
      });
    } else {
      setStatusBarHeight(StatusBarManager.HEIGHT);
    }
  }, []);

  return statusBarHeight;
}