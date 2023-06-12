# EE P 523 A Sp 23 - HW2

## Introduction

This application is designed to create a React Native app that allows users to take two pictures of themselves and swap their faces. Users can also choose to save the resulting image to their phone's gallery.

The app utilizes the device's camera to capture the pictures and will prompt the user if the captured images do not contain any detectable faces. Once the pictures are taken, users have the option to swap the faces or save the images to their phone's gallery. The app also provides an `undo` button to revert the last swap and a `reset` button to return to the initial state.

To ensure optimal functionality and user experience, the app's functionality and user interface have been tested on Android devices in both portrait and landscape modes.

**Note**: The introductory video for this application can be found in the same directory as this README file. The video file is named `HW2.mp4`.

## Time Spent

- Implementing Image Picker: 2 hours
- Researching face detection: 2 hours
- Implementing face detection: 1.5 hours
- Implementing face swapping: 1.5 hours
- Testing and refining face swapping: 1.5 hour
- Researching photo saving: 0.5 hour
- Implementing photo saving: 1 hour
- Researching UI materials: 1 hour
- Enhancing and adjusting UI: 1 hour
- Testing and refining app functionality: 1 hour

Total: 13 hours

## Challenges

1. Getting Image Picker package to work properly on Android phone. I had encountered different errors including building error. And I needed an example code to see if it's working properly.

    Solution: It's always a good idea to init a new project when the original one is having dependency issues. The example code on the package's GitHub repo is very helpful.

2. Getting camera to work and displaying the pictures on the screen.  

    Solution: The documentation of Image Picker package is very limited. However, the package is simple enough so I just need to refer to the example code.

3. Getting face detection to work. I was having trouble finding the right package and method to do the face detection.

    Solution: I refer to the guides in HW2 instructions, but some of them are not completely useful. For example, there is one using Firebase API and I did create a project on Firebase and set up the app correctly to use Firebase dependencies, but I couldn't connect the packages because the guide was using `react-native-camera` package instead of `react-native-image-picker` package. I was facing building error with expo packages and I chose to explore other options.

    I had to find other guides and install different packages such as `react-native-firebase/app` and `react-native-firebase/ml` but shortly found out the ml package is deprecated. The other guides I found was using Java and Kotlin. Eventually I found `react-native-ml-kit`, which seemed to work properly.

4. After detecting the face, I need to mark the face zone on the image from the detection results.

    Solution: I have to carefully examine the detection results and find the right coordinates to draw the rectangle.

5. Implementing the face Swapping function.

    Solution: I need to exchange the face zone of the two images. I need to find the right coordinates to crop the images and paste them to the right position. This task takes some time to figure out and test. But I was able to use a ImageBackground component to display the original image and place the face from another image on top of it.

6. Implementing the photo saving function.

    Solution: Since the face swap is just placing a image on top of another image on the screen, I need to find a way to save the image on the screen. I found a package called `react-native-view-shot` and it's very easy to use. It can take a screenshot of a existing view on the screen and save it to a temporary location.

    After that, I have to save the photos to the gallery. I found a package called `react@react-native-camera-roll/camera-roll` and it's very easy to use. I just need to pass the temporary location of the image to the package API and it will save the image to the gallery.

7. Improving the functionality and UI of the app.

    Solution: I added a reset button to make the app goes back to the initial state. Also I refined the UI of the app to make it more user friendly and look more like the one in the instructions.

## Acknowledgements

### General

- [ChatGPT](https://chat.openai.com/chat) (For information and code examples)

### Documentation

- [React Native - Introduction](https://reactnative.dev/docs/getting-started)
- [React Native - Components](https://reactnative.dev/docs/components-and-apis)
- [React Native - APIs](https://reactnative.dev/docs/accessibilityinfo)
- [ToastAndroid](https://reactnative.dev/docs/toastandroid#:~:text=React%20Native's%20ToastAndroid%20API%20exposes,SHORT%20or%20ToastAndroid.)

### Packages

- [react-native-image-picker](https://github.com/react-native-image-picker/react-native-image-picker)
- [@react-native-ml-kit/face-detection](https://github.com/a7medev/react-native-ml-kit/tree/main/face-detection)
- [react-native-view-shot](https://github.com/gre/react-native-view-shot)
- [@react-native-camera-roll/camera-roll](https://github.com/react-native-cameraroll/react-native-cameraroll)
- [React Navigation](https://reactnavigation.org/docs/getting-started/)

### Guides

- [Use google ML Kit with react native](https://stackoverflow.com/questions/73907773/use-google-ml-kit-with-react-native)
- [How to display specific part of image in square](https://stackoverflow.com/questions/58063673/how-to-display-specific-part-of-image-in-square)
- [React Native Series: How to save or share a React-Native component as an image](https://dev.to/majiyd/react-native-series-how-to-save-or-share-react-native-component-as-an-image-5gd3)
- [React Native Series: How to save an image from a remote url in React Native](https://dev.to/majiyd/react-native-series-how-to-save-an-image-from-a-remote-url-in-react-native-109d)
