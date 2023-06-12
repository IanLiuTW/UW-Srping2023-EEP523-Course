# EE P 523 A Sp 23 - Final Project

[Instructions](https://docs.google.com/document/d/1Nd_B0UMPcYw8rY0ztFhb06O--9AbDXfidTmtfHrImCk/edit)

[Report Template](https://docs.google.com/document/d/118J1q3kmPyItrQdA2h6HBdJNK0yKPo1F8TvTBSfiyD4/edit>)

[Project Figma](https://www.figma.com/file/ohhIbaX0soSQKjQmQpeVot/Final-Project?type=design&node-id=0-1&t=CCy1G16YWXJiFqOI-0)

[Noun Project (Free Icons)](https://thenounproject.com/)

## Introduction

This application is a daily exercise tracker designed to help users monitor their exercise routines and maintain a summary of their exercise history. Users can set their desired daily calories goal and input their daily exercise activities. The application tracks the calories burned based on exercise type and duration, providing a comprehensive summary for each day. The user's data can be securely backed up to and restored from cloud storage.

In this application, a "session" refers to a day, and individual exercises are called "subsessions." The primary objective of this application is to track the calories burned in relation to the user's daily calories goal, providing valuable information such as calories burned, remaining calories to reach the goal, and estimated time required.

The application consists of three main pages:

Home Page: This serves as the main page, displaying the current weather conditions and motivational quotes. It also shows the user's daily calories goal and provides a summary of the current day's exercise progress.

Session Page: Users can initiate a new exercise session on this page. They can choose the exercise type, start or end different exercises, and track the calories burned. The page displays a summary of the current day's exercise progress, allows users to take a picture to document their activities, and provides access to detailed exercise information. The application supports shake detection to facilitate starting or ending an exercise session.

History Page: This page enables users to review their past exercise sessions, including information and images from previous days. Users can also back up their exercise history to the cloud storage, restore previously saved data, and delete individual history entries. This functionality simulates the backup and restore features commonly found in modern applications.

## Time Spent

- Application design and API research: 2 hours
- Application Figma design: 1 hour
- Development package and test suite setup: 1 hour
- Integrating `async storage` and `moment` library: 1 hour
- Main/Subsession/History components and screen options: 1 hour
- Weather widget: 1.5 hours
- Quote widget: 0.5 hour
- Calories Setter widget: 1 hour
- Subsession widget: 2 hours
- Session widget: 2.5 hours
- Sensor for shake detection: 1 hour
- AWS DynamoDB setup: 0.5 hour
- AWS Backup function: 1 hour
- Backup widget: 1 hour
- Session History widget: 1.5 hours
- UI/UX enhancement/Animation and transition: 1.5 hours
- Integration Testing: 2 hours
- Test code/Detox Testing: 1.5 hours
- Project README file: 1 hour
- Project report: 1.5 hours
- Project demo video: 1.5 hours

Total: 27 hours

## Challenges

- Challenge: Sorting the source code and avoiding writing everything in one file for the larger application.

Solution: To address this, I utilized JavaScript modules and separated the source code into multiple files. By doing so, I improved the organization and maintainability of the codebase. Additionally, I leveraged the props attribute of React Native components to pass data between different components.

- Challenge: Ensuring smooth navigation between the three pages of the application.

Solution: To achieve seamless navigation, I integrated the react-navigation package into the application. This package provided a user-friendly solution for handling page transitions and ensuring a smooth user experience.

- Challenge: Converting past codes into reusable components for the final project to avoid repetitive work.

Solution: To overcome this challenge, I reviewed previous assignments, identified useful code snippets, and transformed them into reusable components. I ensured the components could be integrated effectively and retained their functionality.

- Challenge: Finding a free alternative API for motivational quotes since the original API was not free.

Solution: I discovered a free API called Quotable that could be utilized for the application. Quotable not only offered motivational quotes but also provided parameters to filter the quotes based on specific criteria.

- Challenge: Storing data locally to prevent data loss when the application is closed.

Solution: I identified and implemented the async storage package, which allowed for easy and efficient local data storage within the application.

- Challenge: Converting pictures taken from the camera into a string format for easier integration with AWS DynamoDB.

Solution: To avoid the need for additional services like AWS S3, I converted the pictures to base64 format and stored them as strings. Fortunately, the react-native-image-picker package offered a built-in option for converting photos to base64 format. The React Native Image component was then used to display the images by accepting base64 format strings.

- Challenge: Limited support for activities in the Calories Burned API.

Solution: I manually selected a set of common activities and hard-coded them into the application. Care was taken to ensure that the chosen activities were distinct and not overly similar to one another.

- Challenge: Performing calculations on activity duration and calories burned while ensuring accurate data display.

Solution: I dedicated time to verifying the accuracy of the calculations and ensuring proper data display. Special attention was given to correctly updating the data when the user modified the activity duration. Integration of the data with React Native components required careful handling to ensure appropriate updates.

- Challenge: Compatibility issues with the react-native-sensors package in relation to the latest version of Gradle.

Solution: Instead of attempting to fix the outdated react-native-sensors package, I opted to use an alternative package called react-native-shake to detect shake events. This new package proved to be more reliable and easier to implement.

- Challenge: Backing up data by converting it into a suitable format for AWS DynamoDB and designing the table format.

Solution: To address this challenge, I used the JSON stringify function to convert the data into a string format suitable for storage. The converted data was then stored in local storage and easily uploaded to DynamoDB as a string. When downloading the data, the string was stored back into local storage. Additionally, I categorized the data based on the components used to display it.

- Challenge: Rerendering components after updating the state of the current component.

Solution: To enable communication between components and facilitate rerendering, I utilized the props attribute to pass data between components. Rerendering of components was achieved by utilizing the useEffect hook to update components when the state of the current component changed. To prevent unnecessary rerendering, the useCallback hook was also employed.

- Challenge: Meeting the requirement of an interactive user experience with visual effects.

Solution:

1. To enhance interactivity, I focused on the arrangement of widgets and incorporated toast messages to provide feedback to the user. Additionally, I integrated shake detection, allowing users to trigger specific features by shaking their phone.
2. To provide visual effects, I implemented animations using the Animated package. Items in a ListView were given a fade-in effect upon loading or addition, resulting in a more engaging user experience.

- Challenge: Exceeding basic requirements in the application.

Solution:

1. The application incorporated four external APIs, including a cloud storage service, to enhance its functionality.
2. The async storage package was leveraged to store data locally, a valuable feature for real-world applications.
3. The application integrated the camera, geolocation API, and sensors, such as shake detection, to provide additional functionality.
4. The components were thoughtfully separated into widgets and organized into pages, improving the overall structure and maintainability of the application. The project serves as a demonstration of React Native skills and showcases the design of an expandable real-world application.

- Challenge: Implementing tests for the application as required.

Solution: To fulfill the requirement of having tests, I utilized the Detox test suite, which was used in the class. I invested time in understanding the Jest syntax and wrote comprehensive test cases to ensure thorough testing of the application.

## Acknowledgements

### General

- [ChatGPT](https://chat.openai.com/chat) (For information and code examples)

### React & React Native Documentation

- [React Native - Introduction](https://reactnative.dev/docs/getting-started)
- [React Native - Components](https://reactnative.dev/docs/components-and-apis)
- [React Native - APIs](https://reactnative.dev/docs/accessibilityinfo)

### Packages & Examples

- [Axios](https://axios-http.com/)
- [Axios - Minimal Example](https://axios-http.com/docs/example)
- [@react-native-community/geolocation](https://github.com/michalchudziak/react-native-geolocation)
- [react-native-toast-message](https://github.com/calintamas/react-native-toast-message)
- [React Native Sensors](https://github.com/react-native-sensors/react-native-sensors)
- [React Native Shake Event Detector](https://github.com/Doko-Demo-Doa/react-native-shake)
- [react-native-image-picker](https://github.com/react-native-image-picker/react-native-image-picker)
- [@react-native-async-storage/async-storage](https://github.com/react-native-async-storage/async-storage)
- [React Navigation](https://reactnavigation.org/docs/getting-started/)

### External APIs

- [OpenWeather](https://openweathermap.org/api)
- [Zen Quotes](https://zenquotes.io/)
- [Quotable](https://github.com/lukePeavey/quotable)
- [Calories Burned API - API Ninjas](https://api-ninjas.com/api/caloriesburned)
- [AWS SDK for JavaScript v3](https://docs.aws.amazon.com/AWSJavaScriptSDK/v3/latest/index.html)
- [DynamoDB examples using SDK for JavaScript (v3)](https://docs.aws.amazon.com/sdk-for-javascript/v3/developer-guide/javascript_dynamodb_code_examples.html)
