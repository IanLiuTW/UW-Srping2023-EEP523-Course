import Geolocation from '@react-native-community/geolocation';
import axios from 'axios';
import * as React from 'react';
import { Text, View } from 'react-native';
// import the stylesheets and options
import { styles } from './settings.js';

// OpenWeatherMap API Settings
import { OpenWeatherApiKey } from './creds.js';
const currentWeatherEndpoint = 'https://api.openweathermap.org/data/2.5/weather'


// The widget in main screen
export const WeatherWidget = (props) => {
    // Define the variables
    const [city, setCity] = React.useState('N/A')
    const [country, setCountry] = React.useState('N/A')
    const [condition, setCondition] = React.useState('N/A')
    const [temp, setTemp] = React.useState('N/A')
    const [minTemp, setMinTemp] = React.useState('N/A')
    const [maxTemp, setMaxTemp] = React.useState('N/A')

    // Helper function to convert the metric temperature to imperial temperature
    const metricToImperial = (metric) => { return (isNaN(metric)) ? 'N/A' : (metric * 9 / 5 + 32).toFixed(2) }

    // Query the OpenWeatherMap API to get the weather information
    const queryWeatherApi = async () => {
        // Get the current location of the user
        Geolocation.getCurrentPosition(async info => {
            try {
                // Send the query to the API and get the response and set the weather data to the variables
                const response = await axios.get(currentWeatherEndpoint, {
                    params: { appid: OpenWeatherApiKey, units: 'metric', lat: info.coords.latitude, lon: info.coords.longitude } // Using metric as the default unit
                })
                // Set the weather data to the variables based on the response from the API and show the success message 
                data = response.data
                setCity(data.name)
                setCountry(data.sys.country)
                setTemp(data.main.temp)
                setCondition(data.weather[0].main)
                setMinTemp(data.main.temp_min)
                setMaxTemp(data.main.temp_max)
            } catch (error) { // If something goes wrong or the API returns not 2XX response, show the error message 
                if (error.response) {
                    switch (error.response.status) {
                        case 401:
                            props.showToast('error', 'Weather API Error', 'Invalid API key. Please try again later.')
                            break
                        case 404:
                            props.showToast('error', 'Weather API Error', 'Input city not found. Please try a different city.')
                            break
                        case 429:
                            props.showToast('error', 'Weather API Error', 'API limit reached. Please try again later.')
                            break
                        default: // The default case is for the server error (response code >= 500)
                            props.showToast('error', 'Weather API Error', 'Server error. Please try again later.')
                    }
                } else { // If something else goes wrong, show the error message to the user
                    console.log(error)
                    props.showToast('error', 'Weather API Error', 'Unknown error. Please try again later.')
                }
            }
        })
    }

    // Automatically query the user's location when the app is loaded
    React.useEffect(() => { queryWeatherApi() }, [])

    // The widget includes the city name, country, weather condition, current temperature, min. temperature, and max. temperature
    return (
        <View style={styles.weatherView}>
            <Text style={styles.weatherTitle}>Today's Weather Information</Text>
            <Text style={styles.weatherText}>City Name: {city} ({country})</Text>
            <Text style={styles.weatherText}>Weather Condition: {condition}</Text>
            <Text style={styles.weatherText}>Current Temperature: {temp} °C / {metricToImperial(temp)} °F</Text>
            <Text style={styles.weatherText}>Min. Temperature: {minTemp} °C / {metricToImperial(minTemp)} °F</Text>
            <Text style={styles.weatherText}>Max. Temperature: {maxTemp} °C / {metricToImperial(maxTemp)} °F</Text>
        </View>
    )
}