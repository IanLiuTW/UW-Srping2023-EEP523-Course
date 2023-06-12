# EE P 523 A Sp 23 - HW1

## Introduction

This application demonstrates a simple React Native code that displays the message "Hello World" and was tested on Android. The application has been further extended to enable users to view and manage a list of items.

The updated application displays a list of items and provides a count of the total number of items in the list. Users can add items to the list by typing the item name in the input box and clicking the "ADD ITEM" button. Similarly, the "REMOVE ITEM" button enables users to delete the last item from the list. The input box and the buttons are located at the bottom of the screen.

**Note**: The introductory video for this application can be found in the same directory as this README file. The video file is named "HW1.mp4".

## Time Spent

- 2 hours on the React Native tutorial
- 1 hours on setting up the development environment
- 2 hours on the assignment
- 1 hour on adjusting the UI
- 0.5 hour on recording the video

Total: 6.5 hours

## Challenges

1. I originally wanted to install the whole development environment in Ubuntu 22.04 running in WSL. However, the virtualization function in WSL2 is not widely supported yet, which caused the Android emulator to not work.

    Solution: I had to switch to Windows 10 to install the development environment. I recommend installing the development environment directly on Windows instead of in WSL as virtualization is not fully supported in WSL2 yet.

2. I was new to React Native and had to learn the basics of React Native and how to use the components and APIs.

    Solution: I followed the documentation and spent time on the examples. React Native has a strong community so I was able to find many examples on websites such as Stack Overflow.

3. The FlatList component was not working as expected. It did not re-render when I push a new item into the state array.

    Solution: I cannot just push another item into the original array that was passed to the FlatList component as the data prop. I had to create a new array and use the set function of the state so the component would think the state was changed and perform re-rendering.

4. I was not familiar with CSS and mobile app UI design.

    Solution: I spent time adjusting the UI to make it look nicer and revisited some basic CSS. I imagine this would take some time in the future since getting the UI right is time-consuming for inexperienced CSS developers like me.

## Acknowledgements

### General

- [ChatGPT](https://chat.openai.com/chat) (For information and code examples)

### Documentation

- [React Native - Introduction](https://reactnative.dev/docs/getting-started)
- [React Native - Components](https://reactnative.dev/docs/components-and-apis)
- [React Native - APIs](https://reactnative.dev/docs/accessibilityinfo)
- [React - Getting Started](https://17.reactjs.org/docs/getting-started.html)

### Online Coding

- [Code Sandbox - React Native](https://codesandbox.io/s/react-native-q4qymyp2l6?file=/src/App.js)
