import React, { useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  TouchableOpacity,
  TextInput,
  Button,
} from 'react-native';

export default function App() {
  const [ newTask, setNewTask ] = useState("");
  const [ tasks, setTask ] = useState([
    {
      id: 1,
      description: "Task 1"
    },
    {
      id: 2,
      description: "Task 2"
    },
    {
      id: 3,
      description: "Task 3"
    },
    {
      id: 4,
      description: "Task 4"
    }
  ])

  const removeTask = (id) => {
    setTask(
      tasks.filter(task => task.id != id)
    )
  }

  const onChangeHandle = text => setNewTask(text)

  const addTask = () => {
    tasks.push({
      id: Math.random(),
      description: newTask,
    });
    setNewTask("");
  }

  const isEmptyNewTaskInput = () => newTask.length > 0 ? false : true;

  return (
    <View style={styles.container}>
      <Text style={styles.title}>List of tasks</Text>
      <View>
        <TextInput
          placeholder="Write your task."
          onChangeText={onChangeHandle}
          value={newTask}
        />
        <Button
          title="Save new Task"
          onPress={addTask}
          disabled={(isEmptyNewTaskInput())}
        />
      </View>
      {
        tasks == 0 ?
        <Text style={styles.emptyList}>You dont have any task.</Text>
        :
        <FlatList
          style={styles.listContainer}
          data={tasks}
          renderItem={({ item }) =>
            <TouchableOpacity style={styles.taskElement} onPress={() => removeTask(item.id)}>
              <Text>{item.description}</Text>
            </TouchableOpacity>
          }
          keyExtractor={(item) => item.id.toString()}
        />
      }
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f2f2f2',
    paddingTop: 34,
  },
  title: {
    backgroundColor: 'red',
    fontSize: 30,
  },
  emptyList: {
    fontSize: 25,
  },
  listContainer: {
    backgroundColor: '#f0f0f0'
  },
  taskElement: {
    borderColor: 'black',
    borderStyle: 'solid',
    borderWidth: 2,
    fontSize: 20,
    margin: 15
  }
});
