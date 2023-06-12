import React, { useEffect, useState, useRef } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Image } from 'react-native';
import { Camera } from 'expo-camera';
import * as Permissions from 'expo-permissions';
import * as ImageManipulator from 'expo-image-manipulator';
import * as FaceDetector from 'expo-face-detector';
export default function App() {
  const [camera, setCamera] = useState({
    hasCameraPermission: null,
    type: Camera.Constants.Type.back,
  });
  const [isCameraVisible, setIsCameraVisible] = useState(false);
  const [photo, setPhoto] = useState(null);
  const [faces, setFaces] = useState([]);
  const cameraRef = useRef(null);

  useEffect(() => {
    (async () => {
      const { status } = await Permissions.askAsync(Permissions.CAMERA);
      setCamera((prevState) => ({
        ...prevState,
        hasCameraPermission: status === 'granted',
      }));
    })();
  }, []);

  async function takePicture() {
    if (cameraRef.current) {
      const options = { quality: 0.5, base64: true };
      const data = await cameraRef.current.takePictureAsync(options);
      setPhoto(data.uri);
      setIsCameraVisible(false);
    }
  }

  if (camera.hasCameraPermission === null) {
    return <View />;
  } else if (camera.hasCameraPermission === false) {
    return <Text>No access to camera</Text>;
  } else {
    return (
  <View style={styles.container}>
    {isCameraVisible ? (
      <View style={{ position: "relative", flex: 1 }}>
        <Camera
          style={styles.camera}
          type={camera.type}
          ref={cameraRef}
          faceDetectorSettings={{
            mode: FaceDetector.FaceDetectorMode.accurate,
            detectLandmarks: FaceDetector.FaceDetectorLandmarks.none,
            runClassifications: FaceDetector.FaceDetectorClassifications.none,
            minDetectionInterval: 100 / 5,
            tracking: false
          }}
          onFacesDetected={({ faces }) => {
            setFaces(faces);
          }}
        >
          <View style={styles.view}>
            <TouchableOpacity
              style={styles.touchableOpacity}
              onPress={() => {
                setCamera({
                  ...camera,
                  type:
                    camera.type === Camera.Constants.Type.back
                      ? Camera.Constants.Type.front
                      : Camera.Constants.Type.back,
                });
              }}>
              <Text style={styles.text}> Flip </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.touchableOpacity}
              onPress={takePicture}>
              <Text style={styles.text}> Take photo </Text>
            </TouchableOpacity>
          </View>
        </Camera>
        {faces.map(({ bounds }, i) => {
          return (
            <View
              key={i}
              style={[
                styles.faceBox,
                {
                  width: bounds.size.width,
                  height: bounds.size.height,
                  left: bounds.origin.x,
                  top: bounds.origin.y,
                },
              ]}
            />
          );
        })}
      </View>
    ) : (
      <View style={styles.view}>
        <TouchableOpacity
          style={styles.homeButton}
          onPress={() => setIsCameraVisible(true)}>
          <Text style={styles.homeButtonText}> Take a Photo </Text>
        </TouchableOpacity>
      </View>
    )}
    {photo && (
      <View>
        <Image source={{ uri: photo }} style={styles.image} />
        {faces.map(({ bounds }, i) => {
          return (
            <View
              key={i}
              style={[
                styles.faceBox,
                {
                  width: bounds.size.width,
                  height: bounds.size.height,
                  left: bounds.origin.x,
                  top: bounds.origin.y,
                },
              ]}
            />
          );
        })}
      </View>
    )}
  </View>
);
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  camera: {
    flex: 1,
  },
  view: {
    flex: 1,
    backgroundColor: 'transparent',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  touchableOpacity: {
    flex: 1,
    alignSelf: 'flex-end',
    alignItems: 'left',
    paddingLeft: 10,
    paddingBottom: 10,
  },
  text: {
    fontSize: 18,
    marginBottom: 10,
    color: 'white',
  },
  image: {
    width: '100%',
    height: 500,
    marginBottom: 10,
  },
  homeButton: {
    padding: 15,
    backgroundColor: '#2196F3',
    borderRadius: 5,
  },
  homeButtonText: {
    color: 'white',
    fontSize: 18,
  },
  faceBox: {
    position: "absolute",
    borderWidth: 4,
    borderColor: "#89ff00",
    borderStyle: "solid",
    zIndex: 9,
  },
});



//--------------

import React, { useEffect, useState, useRef } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
} from 'react-native';
import { Camera } from 'expo-camera';
import * as Permissions from 'expo-permissions';
import * as ImageManipulator from 'expo-image-manipulator';
import * as FaceDetector from 'expo-face-detector';
//import { TextRecognizer } from 'expo-google-ml-kit';

export default function App() {
  const [camera, setCamera] = useState({
    hasCameraPermission: null,
    type: Camera.Constants.Type.back,
  });
  const [isCameraVisible, setIsCameraVisible] = useState(false);
  const [photo, setPhoto] = useState(null);
  const [faces, setFaces] = useState([]);
  const [recognizedText, setRecognizedText] = useState(null);
  const cameraRef = useRef(null);

  useEffect(() => {
    (async () => {
      const { status } = await Permissions.askAsync(Permissions.CAMERA);
      setCamera((prevState) => ({
        ...prevState,
        hasCameraPermission: status === 'granted',
      }));
    })();
  }, []);

  async function takePicture() {
  if (cameraRef.current) {
    const options = { quality: 0.5, base64: true };
    const data = await cameraRef.current.takePictureAsync(options);
    setPhoto(data.uri);
    setIsCameraVisible(false);

    const manipResult = await ImageManipulator.manipulateAsync(
      data.uri,
      [{ resize: { width: 600 } }],
      { compress: 0.7, format: ImageManipulator.SaveFormat.JPEG }
    );

    const { faces } = await FaceDetector.detectFacesAsync(manipResult.uri, {
      mode: FaceDetector.Constants.Mode.accurate,
      detectLandmarks: FaceDetector.Constants.Landmarks.none,
      runClassifications: FaceDetector.Constants.Classifications.none,
    });

    setFaces(faces);
    setPhoto(manipResult.uri);
  }
}


  if (camera.hasCameraPermission === null) {
    return <View />;
  } else if (camera.hasCameraPermission === false) {
    return <Text>No access to camera</Text>;
  } else {
    return (
  <View style={styles.container}>
    {isCameraVisible ? (
      <View style={{ position: 'relative', flex: 1 }}>
        <Camera
          style={styles.camera}
          type={camera.type}
          ref={cameraRef}
        >
          <View style={styles.view}>
            <TouchableOpacity
              style={styles.touchableOpacity}
              onPress={() => {
                setCamera({
                  ...camera,
                  type:
                    camera.type === Camera.Constants.Type.back
                      ? Camera.Constants.Type.front
                      : Camera.Constants.Type.back,
                });
              }}
            >
              <Text style={styles.text}> Flip </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.touchableOpacity}
              onPress={takePicture}
            >
              <Text style={styles.text}> Take photo </Text>
            </TouchableOpacity>
          </View>
        </Camera>
      </View>
    ) : (
      <View style={styles.view}>
        <TouchableOpacity
          style={styles.homeButton}
          onPress={() => setIsCameraVisible(true)}
        >
          <Text style={styles.homeButtonText}> Take a Photo </Text>
        </TouchableOpacity>
      </View>
    )}
    {photo && (
      <View>
        <Image source={{ uri: photo }} style={styles.image} />
        {faces.map(({ bounds }, i) => {
          return (
            <View
              key={i}
              style={[
                styles.faceBox,
                {
                  width: bounds.size.width,
                  height: bounds.size.height,
                  left: bounds.origin.x,
                  top: bounds.origin.y,
                },
              ]}
            />
          );
        })}
        {recognizedText && (
          <View style={styles.recognizedTextContainer}>
            <Text style={styles.recognizedText}>{recognizedText}</Text>
          </View>
        )}
      </View>
    )}
  </View>
);
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  camera: {
    flex: 1,
  },
  view: {
    flex: 1,
    backgroundColor: 'transparent',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  touchableOpacity: {
    flex: 1,
    alignSelf: 'flex-end',
    alignItems: 'left',
    paddingLeft: 10,
    paddingBottom: 10,
  },
  text: {
    fontSize: 18,
    marginBottom: 10,
    color: 'white',
  },
  image: {
    width: '100%',
    height: 500,
    marginBottom: 10,
  },
  homeButton: {
    padding: 15,
    backgroundColor: '#2196F3',
    borderRadius: 5,
  },
  homeButtonText: {
    color: 'white',
    fontSize: 18,
  },
  faceBox: {
    position: 'absolute',
    borderWidth: 4,
    borderColor: '#89ff00',
    borderStyle: 'solid',
    zIndex: 9,
  },
  recognizedTextContainer: {
    backgroundColor: 'rgba(0,0,0,0.7)',
    padding: 10,
    marginHorizontal: 10,
    marginTop: -70,
    borderRadius: 5,
    alignSelf: 'flex-start',
  },
  recognizedText: {
    fontSize: 18,
    color: '#fff',
  },
});
