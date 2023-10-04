import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';

// import Navigator from './navigation/bottomNavigator';
// import LoginScreen from './screens/LoginScreen';
import MainNavigator from './navigation/mainNavigator';
import LocationScreen from './screens/LocationScreen';

export default function App() {
  return (
    <MainNavigator />
    // <LocationScreen />
  );
}
