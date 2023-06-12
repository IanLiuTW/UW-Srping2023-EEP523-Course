import React, { useEffect, useState } from 'react';
import { Text, View } from 'react-native';
import { SensorTypes, accelerometer, setUpdateIntervalForType } from 'react-native-sensors';

const AccelerometerComponent = () => {
  const [accelerometerData, setAccelerometerData] = useState({
    x: 0,
    y: 0,
    z: 0,
  });
  setUpdateIntervalForType(SensorTypes.accelerometer, 100); // time in ms
  const handleAccelerometerData = (data) => {
    setAccelerometerData({
      x: data.x.toFixed(2),
      y: data.y.toFixed(2),
      z: data.z.toFixed(2),
    });
  };
  useEffect(() => {
    const subscription = accelerometer.subscribe(handleAccelerometerData);
    return () => {
      subscription.unsubscribe();
    };
  }, []);
  return (
    <View>
      <Text>Accelerometer Data:</Text>
      <Text>X: {accelerometerData.x}</Text>
      <Text>Y: {accelerometerData.y}</Text>
      <Text>Z: {accelerometerData.z}</Text>
    </View>
  );
};
export default AccelerometerComponent;
