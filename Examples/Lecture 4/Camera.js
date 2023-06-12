import React, { useEffect, useState, useRef } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Image } from 'react-native';
import { Camera } from 'expo-camera';
import * as Permissions from 'expo-permissions';

export default function App() {
  const [camera, setCamera] = useState({
    hasCameraPermission: null,
    type: Camera.Constants.Type.back,
  });
  const [isCameraVisible, setIsCameraVisible] = useState(false);
  const [photo, setPhoto] = useState(null);
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
          <Camera style={styles.camera} type={camera.type} ref={cameraRef}>
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
        ) : (
          <View style={styles.view}>
            <TouchableOpacity
              style={styles.homeButton}
              onPress={() => setIsCameraVisible(true)}>
              <Text style={styles.homeButtonText}> Take a Photo </Text>
            </TouchableOpacity>
          </View>
        )}
        {photo && <Image source={{ uri: photo }} style={styles.image} />}
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
    height: 200,
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
});

 

