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

import DatePicker from 'react-native-datepicker';

import moment from 'moment';

export default function App() {
  const globalFormat = "YYYY-MM-DD";
  const [ newTask, setNewTask ] = useState("");
  const [ newDate, setNewDate ] = useState(moment().format(globalFormat));
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
  ]);

  const removeTask = (id) => {
    setTask(
      tasks.filter(task => task.id != id)
    )
  }

  const onChangeHandle = text => setNewTask(text);

  const addTask = () => {
    tasks.push({
      id: Math.random(),
      description: newTask,
      date: newDate,
    });
    tasks.sort((t1, t2) => 
      moment(t1.date ? t1.date : moment()).isAfter(moment(t2.date ? t2.date : moment()))? 1: -1);
    setNewTask("");
    setNewDate(moment().format(globalFormat));
  }

  const isEmptyNewTaskInput = () => newTask.length > 0 ? false : true;

  const datePickerText = {
    confirm: 'Confirm',
    cancel: 'Cancel',
    placeholder: 'select date',
  };

  const onDateHandle = date => {setNewDate(date)};

  return (
    <View style={styles.container}>
      <Text style={styles.title}>List of tasks</Text>
      <View style={styles.formNewTask}>
        <TextInput
          style={styles.taskElement}
          placeholder="Write your task."
          onChangeText={onChangeHandle}
          value={newTask}
        />
        <DatePicker
          style={{width: 200}}
          date={newDate}
          mode="date"
          placeholder={datePickerText.placeholder}
          format={globalFormat}
          minDate={moment().format(globalFormat)}
          maxDate={moment().add(1, "year").format(globalFormat)}
          confirmBtnText={datePickerText.confirm}
          cancelBtnText={datePickerText.cancel}
          customStyles={datePickerStyles}
          onDateChange={onDateHandle}
        />
        <Button
          title="Save new Task"
          onPress={addTask}
          disabled={(isEmptyNewTaskInput())}
        />
      </View>
      {
        tasks.length == 0 ?
        <Text style={styles.emptyList}>You dont have any task.</Text>
        :
        <FlatList
          style={styles.listContainer}
          data={tasks}
          renderItem={({ item }) =>
            <TouchableOpacity style={styles.taskElement} onPress={() => removeTask(item.id)}>
              <Text>{item.description}</Text>
              {item.date ? <Text>{item.date}</Text> : null}
            </TouchableOpacity>
          }
          keyExtractor={(item) => item.id.toString()}
        />
      }
    </View>
  );
}

const datePickerStyles = StyleSheet.create({
  dateIcon: {
    position: 'absolute',
    left: 0,
    top: 4,
    marginLeft: 0
  },
  dateInput: {
    marginLeft: 36
  }
});

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f2f2f2',
    paddingTop: 34,
  },
  title: {
    fontSize: 30,
    textAlign: "center",
  },
  emptyList: {
    flex: 1,
    justifyContent: "center",
    alignSelf: "center",
    fontSize: 25,
  },
  listContainer: {
    backgroundColor: '#f0f0f0'
  },
  taskElement: {
    borderColor: 'black',
    borderStyle: 'solid',
    borderWidth: 2,
    margin: 15
  },
  formNewTask: {
    flex: 1,
    alignSelf: "center",
    justifyContent: 'center',
    width: '50%',
  }
});
