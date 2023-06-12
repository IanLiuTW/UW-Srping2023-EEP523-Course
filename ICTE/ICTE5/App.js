import React, { useEffect } from 'react';
import { Button, FlatList, Pressable, StyleSheet, Text, TextInput, View } from 'react-native';
import "react-native-get-random-values";
import "react-native-url-polyfill/auto";
import { accessKeyId, secretAccessKey } from './cred.js';

const { DynamoDB, PutItemCommand, QueryCommand, DeleteItemCommand, UpdateItemCommand } = require("@aws-sdk/client-dynamodb");
const creds = { accessKeyId: accessKeyId, secretAccessKey: secretAccessKey };
const client = new DynamoDB({ region: "us-west-2", credentials: creds });


export default function App() {
  const [taskTime, setTaskTime] = React.useState(0);
  const [taskTitle, setTaskTitle] = React.useState('');
  const [taskDescription, setTaskDescription] = React.useState('');
  const [data, setData] = React.useState([]);

  const clearTask = () => { setTaskTime(0); setTaskTitle(''); setTaskDescription(''); }
  const setTask = (time, title, description) => { setTaskTime(time); setTaskTitle(title); setTaskDescription(description); }

  const get_state = () => { return taskTime === 0 ? 'creating' : 'updating' }
  state = {
    'creating': {
      title: 'Creating new task',
      button1: {
        title: 'Create',
        action: async () => {
          await create_task(taskTitle, taskDescription)
          await get_tasks()
          clearTask()
        }
      },
      button2: {
        title: 'Reset',
        action: () => {
          clearTask()
        }
      }
    },
    'updating': {
      title: 'Updating the task',
      button1: {
        title: 'Update',
        action: async () => {
          await update_task(taskTime, taskTitle, taskDescription)
          await get_tasks()
          clearTask()
        }
      },
      button2: {
        title: 'Delete',
        action: async () => {
          await delete_task(taskTime)
          await get_tasks()
          clearTask()
        }
      }
    }
  }

  const send_command = async (command) => {
    try {
      const response = await client.send(command);
      return response
    } catch (err) {
      console.error(err);
    }
  }

  const get_tasks = async () => {
    const response = await send_command(
      new QueryCommand({
        TableName: "ICTE5",
        KeyConditionExpression: "tag = :tag",
        ExpressionAttributeValues: {
          ':tag': { S: "task" },
        },
        ConsistentRead: true,
      })
    )
    setData(response.Items)
  }

  const create_task = async (title, description) => {
    const response = await send_command(
      new PutItemCommand({
        TableName: "ICTE5",
        Item: {
          tag: { S: 'task' },
          time: { N: `${Date.now()}` },
          title: { S: title },
          description: { S: description }
        },
      })
    )
  }

  const delete_task = async (time) => {
    const response = await send_command(
      new DeleteItemCommand({
        TableName: "ICTE5",
        Key: {
          tag: { S: 'task' },
          time: { N: `${time}` },
        },
      })
    )
  }

  const update_task = async (time, title, description) => {
    const response = await send_command(
      new UpdateItemCommand({
        TableName: "ICTE5",
        Key: {
          tag: { S: 'task' },
          time: { N: `${time}` },
        },
        UpdateExpression: "set title = :title, description = :description",
        ExpressionAttributeValues: {
          ':title': { S: title },
          ':description': { S: description }
        },
        ReturnValues: "ALL_NEW",
      })
    )
  }

  useEffect(() => {
    get_tasks()
  }, [])

  return (
    <View style={styles.mainScreen}>
      <View style={styles.inputArea}>
        <Text style={styles.title}>{state[get_state()].title}</Text>
        <TextInput
          style={styles.textInput}
          placeholder='Enter task title'
          onChangeText={setTaskTitle}
          value={taskTitle}
        />
        <TextInput
          style={styles.textInput}
          placeholder='Enter task description'
          onChangeText={setTaskDescription}
          value={taskDescription}
        />
        <View style={styles.buttonArea}>
          <Button
            color='#003b69'
            title={state[get_state()].button1.title}
            onPress={state[get_state()].button1.action}
          />
          <Button
            color='#003b69'
            title={state[get_state()].button2.title}
            onPress={state[get_state()].button2.action}
          />
        </View>
      </View>
      <FlatList
        style={styles.resultArea}
        data={data}
        renderItem={({ item }) => (
          < Pressable
            style={styles.item}
            onPress={() => { setTask(item.time.N, item.title.S, item.description.S) }}
          >
            <Text style={styles.itemTitle}> {item.title.S} </Text>
            <Text style={styles.itemDescription}> {item.description.S} </Text>
          </Pressable>
        )}
      />
    </View >
  )
}

const styles = StyleSheet.create({
  mainScreen: {
    flex: 1,
    backgroundColor: 'black',
    alignItems: 'center',
    justifyContent: 'center',
  },
  inputArea: {
    alignItems: 'center',
    margin: 3,
    width: 250,
  },
  buttonArea: {
    margin: 3,
    width: 250,
  },
  title: {
    fontSize: 20,
  },
  textInput: {
    height: 40,
    width: 250,
    borderWidth: 1,
    borderColor: 'white',
    fontSize: 16,
    margin: 3,
  },
  resultArea: {
    margin: 3
  },
  item: {
    backgroundColor: '#525252',
    padding: 10,
    margin: 3,
    width: 250,
    height: 80,
  },
  itemTitle: {
    color: 'white',
    fontSize: 20
  },
  itemDescription: {
    color: 'white',
    fontSize: 12
  }
})