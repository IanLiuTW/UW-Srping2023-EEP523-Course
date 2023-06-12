import React, { useState, useEffect } from "react";
import { Text, View, StyleSheet } from 'react-native';

import { Camera } from "expo-camera";
import * as FaceDetector from "expo-face-detector";
  
  export default function App() {
    const [faces, setFaces] = useState([]);
    const [hasPermission, setPermission] = useState(false);
  
    useEffect(() => {
      getPermissions();
    }, []);
  
    const getPermissions = async () => {
      const { status } = await Camera.requestCameraPermissionsAsync();
      setPermission(status === "granted");
    };
  
    if(!hasPermission) return <Text>Camera permission not granted.</Text>
    
    return (
      <View style={styles.container}>
        <Text style={styles.paragraph}>Faces detected: {faces.length}</Text>
  
        <View style={{ position: "relative", flex: 1, zIndex: 1 }}>
          <Camera
            style={{ flex: 1 }}
            type={Camera.Constants.Type.front}
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
          />
  
          {faces.map(({ bounds }, i) => {
            return (
              <View
                key={i}
                style={{
                  position: "absolute",
                  borderWidth: 4,
                  borderColor: "#89ff00",
                  borderStyle: "solid",
                  width: bounds.size.width,
                  height: bounds.size.height,
                  left: bounds.origin.x,
                  top: bounds.origin.y,
                  zIndex: 9
                }}
              >
              </View>
            );
          })}
  
        </View>
      </View>
    );
  }
  
  const styles = StyleSheet.create({
    container: { paddingTop: 50, flex: 1 }
  });