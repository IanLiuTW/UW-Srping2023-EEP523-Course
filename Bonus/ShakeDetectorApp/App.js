import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { SensorTypes, accelerometer, setUpdateIntervalForType } from 'react-native-sensors';

function App() {
  const [accelerometerData, setAccelerometerData] = useState({ x: 0, y: 0, z: 0 });
  setUpdateIntervalForType(SensorTypes.accelerometer, 100); // time in ms
  const handleAccelerometerData = (data) => {
    setAccelerometerData({
      x: data.x.toFixed(2),
      y: data.y.toFixed(2),
      z: data.z.toFixed(2),
    });
  };

  useEffect(() => {
    const subscription_accelerometer = accelerometer.subscribe(handleAccelerometerData);
    return () => {
      subscription_accelerometer.unsubscribe(); // Unsubscribe from the sensors when the component is unmounted
    }
  }, []);


  const [shakeDetected, setShakeDetected] = useState(false);
  const handelShake = () => {
    const shakeThreshold = 15;
    (Math.abs(accelerometerData.x) + Math.abs(accelerometerData.y) + Math.abs(accelerometerData.z)) > shakeThreshold ?
      setShakeDetected(true) : setShakeDetected(false);
  }

  useEffect(() => {
    handelShake();
  }, [accelerometerData]);

  return (
    <View style={styles.container}>
      {/* <Text style={{ color: 'black' }}>Displaying Data:</Text>
      <Text style={{ color: 'black' }}>X: {accelerometerData.x}</Text>
      <Text style={{ color: 'black' }}>Y: {accelerometerData.y}</Text>
      <Text style={{ color: 'black' }}>Z: {accelerometerData.z}</Text> */}
      <Text style={styles.title}>ShakeDetectorApp</Text>
      <Text style={styles.text}>{shakeDetected ? "Shake Detected!" : "Shake the device to see the message!"}</Text>
    </View>
  );
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    color: 'black',
    fontSize: 38,
    fontWeight: 'bold',
    textAlign: 'center',
    padding: 20,
  },
  text: {
    color: 'black',
    fontSize: 24,
    textAlign: 'center',
    padding: 20,
  }
});

export default App;
