import Geolocation from '@react-native-community/geolocation'
import axios from 'axios'
import React, { useEffect } from 'react'
import { Button, StyleSheet, Text, TextInput, View } from 'react-native'
import Toast from 'react-native-toast-message'


// The info needed to query the OpenWeatherMap API
const ApiKey = '1eadcbe63761c7079676dbc20f1d9560'
const currentWeatherEndpoint = 'https://api.openweathermap.org/data/2.5/weather'

// The main component of the app
export default App = () => {
  // Define the variables for the app
  const [query, setQuery] = React.useState('')
  const [city, setCity] = React.useState('N/A')
  const [country, setCountry] = React.useState('N/A')
  const [condition, setCondition] = React.useState('N/A')
  const [temp, setTemp] = React.useState('N/A')
  const [minTemp, setMinTemp] = React.useState('N/A')
  const [maxTemp, setMaxTemp] = React.useState('N/A')

  // Helper function to show the toast message
  const showToast = (type, title, msg) => { Toast.show({ type: type, text1: title, text2: msg, visibilityTime: 3000 }) }
  // Helper function to convert the metric temperature to imperial temperature
  const metricToImperial = (metric) => { return (isNaN(metric)) ? 'N/A' : (metric * 9 / 5 + 32).toFixed(2) }

  // The search function is used to query the weather information based on the user input
  const search = async () => {
    switch (query) {
      // If the user input is empty, query the weather information of the user's current location with the geolocation API
      // This is also the case when the app is first loaded
      case '':
        Geolocation.getCurrentPosition(async info => {
          queryWeatherApi({ lat: info.coords.latitude, lon: info.coords.longitude }, 'your current location')
        })
        break
      // If the user input is not empty, query the weather information of the input city
      default:
        queryWeatherApi({ q: query }, 'the input city')
    }
  }
  // Query the OpenWeatherMap API to get the weather information
  const queryWeatherApi = async (queryParams, location_info) => {
    showToast('info', 'Info', `Loading the weather information of ${location_info}.`)
    try {
      // Send the query to the API and get the response and set the weather data to the variables
      const response = await axios.get(currentWeatherEndpoint, {
        params: { ...{ appid: ApiKey, units: 'metric' }, ...queryParams } // Using metric as the default unit
      })
      setWeatherData(response.data)
      showToast('success', 'Success', 'Weather information loaded successfully.')
    } catch (error) { // If something goes wrong or the API returns not 2XX response, show the error message 
      if (error.response) {
        switch (error.response.status) {
          case 401:
            showToast('error', 'Error', 'Invalid API key. Please try again later.')
            break
          case 404:
            showToast('error', 'Error', 'Input city not found. Please try a different city.')
            break
          case 429:
            showToast('error', 'Error', 'API limit reached. Please try again later.')
            break
          default: // The default case is for the server error (response code >= 500)
            showToast('error', 'Error', 'Server error. Please try again later.')
        }
      } else { // If something else goes wrong, show the error message to the user
        showToast('error', 'Error', 'Unknown error. Please try again later.')
      }
    }
  }
  // Set the weather data to the variables based on the response from the API and show the success message 
  const setWeatherData = (data) => {
    setCity(data.name)
    setCountry(data.sys.country)
    setTemp(data.main.temp)
    setCondition(data.weather[0].main)
    setMinTemp(data.main.temp_min)
    setMaxTemp(data.main.temp_max)
  }

  // Automatically query the user's location when the app is loaded
  useEffect(() => { search() }, [])

  // The UI of the app contains a message section, a search bar, a button, and a result area, which displays the weather information
  // The result contains the city name, country code, weather condition, current temperature, min. temperature, and max. temperature
  return (
    <View style={styles.mainScreen}>
      <Toast />
      <View style={styles.inputArea}>
        <TextInput
          style={styles.searchInput}
          placeholder='Enter city name to get weather information'
          onChangeText={setQuery}
        />
        <Button
          color='#003b69'
          title="Search"
          onPress={search}
        />
      </View>
      <View style={styles.resultArea}>
        <Text style={styles.resultText}>City Name: {city} ({country})</Text>
        <Text style={styles.resultText}>Weather Condition: {condition}</Text>
        <Text style={styles.resultText}>Current Temperature: {temp} °C / {metricToImperial(temp)} °F</Text>
        <Text style={styles.resultText}>Min. Temperature: {minTemp} °C / {metricToImperial(minTemp)} °F</Text>
        <Text style={styles.resultText}>Max. Temperature: {maxTemp} °C / {metricToImperial(maxTemp)} °F</Text>
      </View>
    </View >
  )
}

// The styles of the app's components
const styles = StyleSheet.create({
  mainScreen: {
    flex: 1,
    backgroundColor: 'black',
    alignItems: 'center',
    justifyContent: 'center',
  },
  inputArea: {
    margin: 3,
    marginTop: 100
  },
  searchInput: {
    height: 50,
    borderWidth: 1,
    borderColor: 'white',
    fontSize: 16,
    margin: 3,
  },
  resultArea: {
    margin: 3
  },
  resultText: {
    backgroundColor: '#525252',
    padding: 10,
    margin: 3,
    fontSize: 16,
    color: 'white',
  },
})