import React, { useState, useEffect } from 'react';
import {
  Text,
  View,
  TouchableOpacity,
  FlatList,
  Platform,
  NativeEventEmitter,
  NativeModules,
} from 'react-native';
import BleManager, {
  BleDisconnectPeripheralEvent,
  BleManagerDidUpdateValueForCharacteristicEvent,
  Peripheral,
} from 'react-native-ble-manager';
import { request, PERMISSIONS } from 'react-native-permissions';

const BleManagerModule = NativeModules.BleManager;
const bleManagerEmitter = new NativeEventEmitter(BleManagerModule);

declare module 'react-native-ble-manager' {
  // enrich local contract with custom state properties needed by App.tsx
  interface Peripheral {
    connected?: boolean;
    connecting?: boolean;
  }
}

export default function App() {
  const [devices, setDevices] = useState(new Map());
  const [scanning, setScanning] = useState(false);
  const [home, setHome] = useState(true);

  const getPermission1 = async () => {
    if (Platform.OS === 'android') {
      const status = await request(PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION);
      return status === 'granted';
    }
    return true;
  };

  const getPermission2 = async () => {
    if (Platform.OS === 'android') {
      const bleStatus = await request(PERMISSIONS.ANDROID.BLUETOOTH_SCAN);
      return bleStatus === 'granted';
    }
    return true;
  };

  const startScan = async () => {
    const permission1 = await getPermission1();
    const permission2 = await getPermission2();
    if (!permission1 && !permission2) {
      alert('Location permission is required to scan for BLE devices.');
      return;
    }

    // setDevices([]);
    setScanning(true);
    setHome(false); // Add this line

    BleManager.scan([], 5, true)
      .then(() => {
        console.log('Scanning started');
      })
      .catch((error) => {
        console.log(error);
      });

    setTimeout(() => {
      BleManager.stopScan()
        .then(() => {
          console.log('Scanning stopped');
          setScanning(false);
        })
        .catch((error) => {
          console.log(error);
        });
    }, 5000);
  };

  const handleUpdateValueForCharacteristic = (
    data: BleManagerDidUpdateValueForCharacteristicEvent,
  ) => {
    console.debug(
      `[handleUpdateValueForCharacteristic] received data from '${data.peripheral}' with characteristic='${data.characteristic}' and value='${data.value}'`,
    );
  };

  const handleDisconnectedPeripheral = (
    event: BleDisconnectPeripheralEvent,
  ) => {
    let peripheral = devices.get(event.peripheral);
    if (peripheral) {
      console.debug(
        `[handleDisconnectedPeripheral][${peripheral.id}] previously connected peripheral is disconnected.`,
        event.peripheral,
      );
      setDevices((prevDevices) => new Map(prevDevices.set(peripheral.id, peripheral)));
    }
    console.debug(
      `[handleDisconnectedPeripheral][${event.peripheral}] disconnected.`,
    );
  };

  const handleStopScan = () => {
    setScanning(false);
    console.debug('[handleStopScan] scan is stopped.');
  };

  const handleDiscoverPeripheral = (peripheral: Peripheral) => {
    console.debug('[handleDiscoverPeripheral] new BLE peripheral=', peripheral);
    if (!peripheral.name) {
      peripheral.name = 'NO NAME';
    }
    setDevices((prevDevices) => new Map(prevDevices.set(peripheral.id, peripheral)));
  };

  useEffect(() => {
    BleManager.start({ showAlert: false });

    const listeners = [
      bleManagerEmitter.addListener(
        'BleManagerDiscoverPeripheral',
        handleDiscoverPeripheral,
      ),
      bleManagerEmitter.addListener('BleManagerStopScan', handleStopScan),
      bleManagerEmitter.addListener(
        'BleManagerDisconnectPeripheral',
        handleDisconnectedPeripheral,
      ),
      bleManagerEmitter.addListener(
        'BleManagerDidUpdateValueForCharacteristic',
        handleUpdateValueForCharacteristic,
      ),
    ];

    return () => {
      console.debug('[app] main component unmounting. Removing listeners...');
      for (const listener of listeners) {
        listener.remove();
      }
    };
  }, []);

  const renderItem = ({item}: {item: Peripheral}) => (
    <View>
      <Text>{item.name || 'Unnamed Device'}</Text>
      <Text>{item.id}</Text>
    </View>
  );

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      {home ? (
        <TouchableOpacity onPress={startScan}>
          <Text style={{ fontSize: 20 }}>Search for devices</Text>
        </TouchableOpacity>
      ) : (
        <>
          <TouchableOpacity onPress={() => setHome(true)}>
            <Text style={{ fontSize: 20 }}>Back</Text>
          </TouchableOpacity>
          <Text style={{ fontSize: 16 }}>{scanning ? 'Scanning...' : 'Devices found:'}</Text>
          <FlatList
            data={Array.from(devices.values())}
            renderItem={renderItem}
            keyExtractor={(item) => item.id}
            style={{ width: '100%' }}
          />
        </>
      )}
    </View>
  );
}