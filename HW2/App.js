import { CameraRoll } from "@react-native-camera-roll/camera-roll";
import FaceDetection from '@react-native-ml-kit/face-detection';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import * as React from 'react';
import { Button, Image, ImageBackground, ScrollView, StyleSheet, ToastAndroid, View } from 'react-native';
import * as ImagePicker from 'react-native-image-picker';
import { captureRef } from 'react-native-view-shot';


// Define the navigation stack
const Stack = createStackNavigator();

// The App component
export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen
          name="HW2"
          component={MainScreen}
          options={{
            headerShown: true,
            headerStyle: {
              backgroundColor: '#2596be',
            },
            headerTintColor: 'white',
            headerTitleStyle: {
              fontWeight: 'bold',
              fontSize: 30
            },
            headerTitleAlign: 'center'
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

// The main app screen
function MainScreen({ navigation }) {
  // Define the state of the app
  const firstPhotoRef = React.useRef();
  const [firstPhoto, setFirstPhoto] = React.useState(null);
  const [firstPhotoResult, setFirstPhotoResult] = React.useState(null);
  const secondPhotoRef = React.useRef();
  const [secondPhoto, setSecondPhoto] = React.useState(null);
  const [secondPhotoResult, setSecondPhotoResult] = React.useState(null);
  const [swapFace, setSwapFace] = React.useState(false);

  // Get the action to take based on the current state
  const get_action = () => {
    // Define the action to take based on the current state
    const actions = {
      // If there is no first photo, the action is to take the first photo
      NO_FIRST_PHOTO: {
        title: 'Take First Photo',
        buttonAction: takePhoto,
        photoSetter: setFirstPhoto,
        resultSetter: setFirstPhotoResult,
      },
      // If there is no second photo, the action is to take the second photo
      NO_SECOND_PHOTO: {
        title: 'Take Second Photo',
        buttonAction: takePhoto,
        photoSetter: setSecondPhoto,
        resultSetter: setSecondPhotoResult,
      },
      // If there are two photos but the swapFace state is false, the action is to swap the faces
      AWAITING_FACE_SWAP: {
        title: 'Swap Faces',
        buttonAction: () => setSwapFace(true)
      },
      // If there are two photos and the swapFace state is true, the action is to undo the swap
      DONE_FACE_SWAP: {
        title: 'Undo Swap',
        buttonAction: () => setSwapFace(false)
      }
    }
    // Return the action to take based on the current state
    if (!firstPhotoResult) {
      return actions.NO_FIRST_PHOTO
    } else if (!secondPhotoResult) {
      return actions.NO_SECOND_PHOTO
    } else if (!swapFace) {
      return actions.AWAITING_FACE_SWAP
    } else {
      return actions.DONE_FACE_SWAP
    }
  }

  // Using the react-native-image-picker library to take a photo
  const takePhoto = () => {
    // Define the options for the image picker
    ImagePicker.launchCamera({
      cameraType: 'front',
      mediaType: 'photo',
      maxHeight: 480,
      maxWidth: 360,
      includeBase64: false,
    }, async (image) => {
      // If the image is null, the user cancelled the camera action
      if (!image || !image.assets || !image.assets[0]) return;
      // Get the uri of the image
      image_uri = image.assets[0].uri;
      // Check if the picture is in portrait mode by checking the height and width of the image
      Image.getSize(image_uri, async (width, height) => {
        // If the image is in landscape mode, show a toast to the user and don't proceed
        if (height <= width) {
          ToastAndroid.showWithGravity(
            'Please rotate your device to portrait mode.', ToastAndroid.LONG, ToastAndroid.CENTER);
          return;
        }
        // Detect the faces in the image, and if there are none, show a toast to the user and don't proceed
        FaceDetectionResult = await FaceDetection.detect('file://' + image_uri, {});
        if (!FaceDetectionResult || !FaceDetectionResult.length) {
          ToastAndroid.showWithGravity(
            'No face detected!\nPlease retake the photo.', ToastAndroid.LONG, ToastAndroid.CENTER);
          return;
        }
        // If there is a face, set the photo information and the face detection result
        get_action()['photoSetter'](image);
        get_action()['resultSetter'](FaceDetectionResult);
      }
      );
    })
  }

  // Get the image and the swapping face section components
  const get_image = (photoUri, photoResult, swapPhoto, swapPhotoResult, photoRef) => {
    // Get the swapping face section component
    const get_face = (uri, photoResult) => {
      // This View contains only the face image based on the face detection result
      return (
        <View
          style={{
            overflow: 'hidden',
            width: photoResult[0]?.frame.width / 2,
            height: photoResult[0]?.frame.height / 2,
          }} >
          <Image
            source={{ uri }}
            style={StyleSheet.compose(styles.image, {
              bottom: photoResult[0]?.frame.top * 1.5 / 2,
              right: photoResult[0]?.frame.left * 1.5 / 2
            })} />
        </View>
      )
    }

    // This View contains the image and the swapping face section
    // The face section component will be placed on top of the original image and shift to the right position to cover the original face
    // The face section component will only be shown when the swapFace state is true
    return (
      <View style={styles.imageContainer} ref={photoRef}>
        <ImageBackground
          resizeMode="contain"
          style={styles.image}
          source={{ uri: photoUri }} >
          {swapFace && swapPhoto?.assets &&
            <View
              style={{
                width: swapPhotoResult[0]?.frame.width / 2,
                height: swapPhotoResult[0]?.frame.height / 2,
                left: (photoResult[0]?.frame.left * 1.5 / 2) + (photoResult[0]?.frame.width / 2) / 2 - (swapPhotoResult[0]?.frame.width / 2) / 2,
                top: (photoResult[0]?.frame.top * 1.5 / 2) + (photoResult[0]?.frame.height / 2) / 2 - (swapPhotoResult[0]?.frame.height / 2) / 2,
              }} >
              {get_face(swapPhoto.assets[0].uri, swapPhotoResult)}
            </View>
          }
        </ImageBackground>
      </View>
    )
  }

  // Save both photos
  const save_photos = async () => {
    try {
      // Capture the refs of the photos and save them to the HW2 album
      const firstPhotoUri = await captureRef(firstPhotoRef, { quality: 1 });
      const secondPhotoUri = await captureRef(secondPhotoRef, { quality: 1 });
      CameraRoll.save(firstPhotoUri, { type: 'photo', album: 'HW2' })
      CameraRoll.save(secondPhotoUri, { type: 'photo', album: 'HW2' })
      // Display a success toast to the user
      ToastAndroid.showWithGravity(
        'Images saved to the album "HW2"!', ToastAndroid.LONG, ToastAndroid.CENTER);
    } catch (e) {
      // If there is an error, display a failure toast to the user
      ToastAndroid.showWithGravity(
        'Images failed to save! Please check permissions and try again.', ToastAndroid.LONG, ToastAndroid.CENTER);
    }
  }

  // Reset the app state
  const reset = () => {
    setFirstPhoto(null);
    setFirstPhotoResult(null);
    setSecondPhoto(null);
    setSecondPhotoResult(null);
    setSwapFace(false);
  }

  // Get the action button component
  const get_action_button = () => {
    return (
      <Button
        title={get_action()['title']}
        onPress={get_action()['buttonAction']}
      />
    )
  }

  // Get the save button component
  const get_save_button = () => {
    return (
      <Button
        title="Save Images"
        onPress={save_photos}
        disabled={!firstPhotoResult || !secondPhotoResult}
      />)
  }

  const get_reset_button = () => {
    return (
      <Button
        title="Reset"
        onPress={reset}
      />)
  }

  // Return the main app component, which contains the action button, the save button, and the two photos
  return (
    <ScrollView style={styles.MainScreen}>
      <View style={styles.container}>
        <View style={styles.buttonContainer}>
          {get_action_button()}
          {get_save_button()}
          {get_reset_button()}
        </View>
        {firstPhoto?.assets && get_image(firstPhoto.assets[0].uri, firstPhotoResult, secondPhoto, secondPhotoResult, firstPhotoRef)}
        {secondPhoto?.assets && get_image(secondPhoto.assets[0].uri, secondPhotoResult, firstPhoto, firstPhotoResult, secondPhotoRef)}
      </View >
    </ScrollView >
  );
}

// Define the styles for the components
const styles = StyleSheet.create({
  MainScreen: {
    backgroundColor: '#2e3f45'
  },
  container: {
    justifyContent: 'space-evenly',
    flexDirection: 'row',
    flexWrap: 'wrap'
  },
  buttonContainer: {
    width: 200,
    height: 250,
    margin: 2,
    flexDirection: 'column',
    justifyContent: 'space-evenly',
  },
  imageContainer: {
    marginVertical: 10,
    alignItems: 'center',
  },
  image: {
    height: 240,
    width: 180,
  },
});