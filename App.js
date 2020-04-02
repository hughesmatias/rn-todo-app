import React, { useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  TouchableOpacity,
} from 'react-native';

export default function App() {
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

  return (
    <View style={styles.container}>
      <Text style={styles.title}>List of tasks</Text>
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
