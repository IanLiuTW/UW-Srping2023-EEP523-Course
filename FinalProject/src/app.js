import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import * as React from 'react';
import { Button, View } from 'react-native';
import Toast from 'react-native-toast-message';
// import the stylesheets and options
import { screenOptions, styles } from './settings.js';
// import the modules
import { CaloriesSetterWidget } from './calories.js';
import { QuoteWidget } from './quote.js';
import { SessionInfoWidget } from './session.js';
import { SessionPhotoWidget } from './sessionPhoto.js';
import { StorageWidget } from './storage.js';
import { SubsessionWidget } from './subsession.js';
import { get_date, showToast } from './utilities.js';
import { WeatherWidget } from './weather.js';

// Define navigation component and screen names
const Stack = createStackNavigator();
const screenNames = {
  home: 'Exercise Tracker - Home 🏠',
  session: 'Exercise Tracker - Session 🥇',
  history: 'Exercise Tracker - History 📑',
}


// The App component, contains the navigation container and the stack navigator
export default function App() {
  return (
    <>
      <NavigationContainer>
        <Stack.Navigator initialRouteName={screenNames.home} >
          <Stack.Screen name={screenNames.home} component={MainScreen} options={screenOptions.default} />
          <Stack.Screen name={screenNames.session} component={SessionScreen} options={screenOptions.default} />
          <Stack.Screen name={screenNames.history} component={HistoryScreen} options={screenOptions.default} />
        </Stack.Navigator>
      </NavigationContainer>
      <Toast />
    </>
  )
}

// The main screen
const MainScreen = ({ navigation }) => {
  // Get the current date
  const date = get_date()
  // The main screen includes the weather, quote, calories setter, session info and history buttons
  return (
    <View style={styles.mainScreen} testID='mainScreen'>
      <WeatherWidget showToast={showToast} />
      <QuoteWidget showToast={showToast} />
      <CaloriesSetterWidget showToast={showToast} date={date} />
      <View style={styles.mainScreenButtonView}>
        <Button title='Start Session' onPress={() => navigation.navigate(screenNames.session)} />
      </View>
      <SessionInfoWidget showToast={showToast} date={date} />
      <View style={styles.mainScreenButtonView}>
        <Button title='Session History' onPress={() => navigation.navigate(screenNames.history)} />
      </View>
    </View >
  )
}

// The session screen
const SessionScreen = ({ navigation }) => {
  // Get the current date
  const date = get_date()
  // The session screen includes the session photo and subsession widgets
  return (
    <View style={styles.mainScreen} testID='sessionScreen'>
      <SessionPhotoWidget showToast={showToast} date={date} />
      <SubsessionWidget showToast={showToast} date={date} />
    </View >
  )
}

// The history screen
const HistoryScreen = ({ navigation }) => {
  // Get the current date
  const date = get_date()
  // The history screen includes the session widget and storage widget
  return (
    <View style={styles.mainScreen} testID='historyScreen'>
      <StorageWidget showToast={showToast} date={date} />
    </View >
  )
}