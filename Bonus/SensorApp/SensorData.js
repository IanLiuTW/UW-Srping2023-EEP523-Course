import React, { useEffect, useState } from 'react';
import { Button, StyleSheet, Text, View } from 'react-native';
import { SensorTypes, accelerometer, gyroscope, setUpdateIntervalForType } from 'react-native-sensors';

function SensorData() {
    // State variables to store the accelerometer and gyroscope data
    const [accelerometerData, setAccelerometerData] = useState({ x: 0, y: 0, z: 0 });
    setUpdateIntervalForType(SensorTypes.accelerometer, 100); // time in ms
    const handleAccelerometerData = (data) => {
        setAccelerometerData({
            x: data.x.toFixed(2),
            y: data.y.toFixed(2),
            z: data.z.toFixed(2),
        });
    };

    const [gyroscopeData, setGyroscopeData] = useState({ x: 0, y: 0, z: 0 });
    setUpdateIntervalForType(SensorTypes.gyroscope, 100); // time in ms
    const handleGyroscopeData = (data) => {
        setGyroscopeData({
            x: data.x.toFixed(2),
            y: data.y.toFixed(2),
            z: data.z.toFixed(2),
        });
    };

    // Subscribe to updates from the accelerometer and gyroscope
    useEffect(() => {
        const subscription_accelerometer = accelerometer.subscribe(handleAccelerometerData);
        return () => {
            subscription_accelerometer.unsubscribe(); // Unsubscribe from the sensors when the component is unmounted
        }
    }, []);
    useEffect(() => {
        const subscription_gyroscope = gyroscope.subscribe(handleGyroscopeData);
        return () => {
            subscription_gyroscope.unsubscribe(); // Unsubscribe from the sensors when the component is unmounted
        }
    }, []);


    const [displayData, setDisplayData] = useState('Accelerometer');
    const mapping = { "Accelerometer": accelerometerData, "Gyroscope": gyroscopeData };

    // Render the accelerometer and gyroscope data on the screen
    return (
        <View testID='main'>
            <Button testID='switchButton' title="Switch between Accelerometer/Gyroscope" onPress={() => {
                switch (displayData) {
                    case 'Accelerometer':
                        setDisplayData('Gyroscope');
                        break;
                    case 'Gyroscope':
                        setDisplayData('Accelerometer');
                        break;
                    default:
                        setDisplayData('Accelerometer');
                        break;
                }
            }} />
            <Text testID='dataText' style={styles.title}>Displaying {displayData} Data:</Text>
            <Text testID='dataX' style={styles.text}>X: {mapping[displayData].x}</Text>
            <Text testID='dataY' style={styles.text}>Y: {mapping[displayData].y}</Text>
            <Text testID='dataZ' style={styles.text}>Z: {mapping[displayData].z}</Text>
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
        fontSize: 20,
        fontWeight: 'bold',
        textAlign: 'center',
        padding: 20,
    },
    text: {
        color: 'black',
        fontSize: 18,
        textAlign: 'center',
    }
});

export default SensorData;