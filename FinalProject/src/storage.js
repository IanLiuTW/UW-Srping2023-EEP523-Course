import * as React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import "react-native-get-random-values";
import "react-native-url-polyfill/auto";
const { DynamoDB, PutItemCommand, QueryCommand } = require("@aws-sdk/client-dynamodb");
// import the stylesheets and options
import { styles } from './settings.js';
// import the modules
import { SessionHistoryWidget } from './session.js';
import { getDataString, removeData, storeDataString } from './utilities.js';

// AWS API settings
import { awsAccessKeyId, awsSecretAccessKey } from './creds.js';
const creds = { accessKeyId: awsAccessKeyId, secretAccessKey: awsSecretAccessKey };
const client = new DynamoDB({ region: "us-west-2", credentials: creds });

// Backup operation settings
const STORAGE_KEYS = ['sessions', 'subsessions', 'sessionPhotos', 'calories']

// The widget in history screen
export const StorageWidget = (props) => {
    const [lastOperation, setLastOperation] = React.useState('')

    const backupData = async () => {
        for (let i = 0; i < STORAGE_KEYS.length; i++) {
            let data = await getDataString(STORAGE_KEYS[i])
            if (data == null) data = ''
            await setAwsData(STORAGE_KEYS[i], data)
        }
        props.showToast('info', 'Data Storage', 'Data backed up to cloud storage')
        setLastOperation('Backup')
    }

    const resyncData = async () => {
        for (let i = 0; i < STORAGE_KEYS.length; i++) {
            let data = await getAwsData(STORAGE_KEYS[i])
            data = data.Items[0].data.S
            if (data == null) continue
            await storeDataString(STORAGE_KEYS[i], data)
        }
        props.showToast('info', 'Data Storage', 'Data resynced from cloud storage')
        setLastOperation('Resync')
    }

    const deleteData = async () => {
        for (let i = 0; i < STORAGE_KEYS.length; i++) {
            await removeData(STORAGE_KEYS[i])
        }
        props.showToast('info', 'Data Storage', 'All data deleted')
        setLastOperation('Delete')
    }

    return (
        <View style={styles.storageWidgetView}>
            <SessionHistoryWidget date={props.date} lastOperation={lastOperation} />
            <View style={styles.storageWidgetButtonView}>
                <TouchableOpacity style={styles.storageWidgetButton} onPress={backupData}>
                    <Text style={styles.storageWidgetButtonText} >Backup Data</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.storageWidgetButton} onPress={resyncData}>
                    <Text style={styles.storageWidgetButtonText} >Resync Data</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.storageWidgetButton} onPress={deleteData}>
                    <Text style={styles.storageWidgetButtonText} >Delete Data</Text>
                </TouchableOpacity>
            </View>
            {/* <Button title="Test" onPress={async () => {
                for (let i = 0; i < STORAGE_KEYS.length; i++) {
                    let data = await getDataString(STORAGE_KEYS[i])
                    console.log(STORAGE_KEYS[i])
                    console.log(data)
                }
            }} /> */}
        </View>
    )
}

const send_command = async (command) => {
    try {
        const response = await client.send(command);
        return response
    } catch (err) {
        console.error(err);
    }
}

const getAwsData = async (tag) => {
    const response = await send_command(
        new QueryCommand({
            TableName: "Final",
            KeyConditionExpression: "tag = :tag",
            ExpressionAttributeValues: { ':tag': { S: tag }, },
            ConsistentRead: true,
        })
    )
    return response
}

const setAwsData = async (tag, data) => {
    const response = await send_command(
        new PutItemCommand({
            TableName: "Final",
            Item: { tag: { S: tag }, data: { S: data }, },
        })
    )
    return response
}