# EE P 523 A Sp 23 - HW3

## Introduction

This application is designed to create a React Native app that let the user enter a city name and display the current weather information of that city. The information is retrieved from the OpenWeather API (<https://openweathermap.org/>). The information contains the city name, country code, temperature, weather condition, the minimum and maximum temperature.

The API connection is implemented by using the `axios` package. When first loaded the app or the input field is empty, the app will display the weather information of the current location of the user. This function is implemented by using the `geolocation` package. The app will show success toast message to the user. The app will also display a toast message when the user enters an invalid city name or when the app is unable to retrieve the weather information.

**Note**: The introductory video for this application can be found in the same directory as this README file. The video file is named `HW3.mp4`.

## Time Spent

- Researching and implementing axios package: 0.5 hours
- Researching and connecting to OpenWeather API: 0.5 hours
- API data testing and error handling: 1 hour
- Researching and implementing geolocation package: 0.5 hours
- Researching and implementing Tosatify package: 0.5 hours
- UI design and implementation: 1 hour
- Documentation and video: 0.5 hours

Total: 4.5 hours

## Challenges

1. Choosing the method to connect the API.

    Solution: There are many options to connect the API. In the assignment instructions, it is suggested to use `axios` or `react-native-weather-api` package. I chose to use `axios` because it is more popular and has more documentation. Also, it is more fun to work on the bottom level where I can handle the response data myself instead of using a package that does everything for me.

2. I want to increase the stability of the application. I need to handle error code from openweather API and display the error message to the user.

    Solution: I looked up the error code from the API documentation (<https://openweathermap.org/faq>) and handle all of the error code in the application. I also added the function of showing toast messages to notify the user when different error occurs.

3. Getting the information of the user's current location.

    Solution: I used the `@react-native-community/geolocation` package to get the user's current location. It was easy to use and the API response is straightforward.

4. Displaying the information to the user.

    Solution: I used the `react-native-toast-message` package to display the information to the user. It was also easy to use. I have experimented a few different packages and this one is the best one that I found. The toast messages in the application include not only the error messages but some loading information and success messages to provide better user experience.

## Acknowledgements

### General

- [ChatGPT](https://chat.openai.com/chat) (For information and code examples)

### Documentation

- [React Native - Introduction](https://reactnative.dev/docs/getting-started)
- [React Native - Components](https://reactnative.dev/docs/components-and-apis)
- [React Native - APIs](https://reactnative.dev/docs/accessibilityinfo)

### Packages & Examples

- [Axios](https://axios-http.com/)
- [Axios - Minimal Example](https://axios-http.com/docs/example)
- [OpenWeather](https://openweathermap.org/)
- [OpenWeather - Current weather data](https://openweathermap.org/current)
- [OpenWeather - FAQ](https://openweathermap.org/faq)
- [@react-native-community/geolocation](https://github.com/michalchudziak/react-native-geolocation)
- [react-native-toast-message](https://github.com/calintamas/react-native-toast-message)
