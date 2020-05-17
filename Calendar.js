import React, { useState, useEffect } from 'react';
import { View, Text, Button, TextInput, StyleSheet, FlatList } from 'react-native';
import {Calendar, CalendarList, Agenda} from 'react-native-calendars';
import { Input, ListItem, Header } from 'react-native-elements';
import * as SQLite from 'expo-sqlite';
import { set } from 'react-native-reanimated';
import moment from 'moment';

export default function Calendarview () {
   
    const [todolist, setTodolist] = useState([]);
    const [text, setText] = useState('');
    const [task, setTask] = useState([]);
    let today = moment().format('YYYY-MM-DD').toString();
    const [date, setDate] = useState(today);
    const [tasklist, setTasklist] = useState([]);

    const db = SQLite.openDatabase('list.db');

    React.useEffect(() => {
        db.transaction(tx => {
          tx.executeSql('select * from list where date=?;', [date], (_, { rows }) =>
          setTodolist(rows._array)
          );
        });
      })

      const deleteItem = (id) => {
        db.transaction(tx => {
          tx.executeSql('delete from list where id = ?;', [id]);
        }, null, updateList)
      }

      const updateList = () => {
        db.transaction(tx => {
          tx.executeSql('select * from list;', [], (_, { rows }) =>
          setTodolist(rows._array)
          );
        });
      }

    return (
        <View>
            <Calendar
                showWeekNumbers={true}
                firstDay={1}
                style={{
                  borderWidth: 1,
                  borderColor: 'gray',
                }}
                theme={{
                  backgroundColor: '#ffffff',
                  calendarBackground: 'grey',
                }}
            />
            <Text style={styles.text}>Päivän tehtävät:</Text>
            <FlatList 
              keyExtractor={item => item.id.toString()}
              data={todolist}
              renderItem={({item}) => (
            <ListItem
              title={item.todo}
              subtitle={item.date}
              rightTitle='Done'
              bottomDivider
              onPress={() => deleteItem(item.id)}
              onLongPress={() => deleteItem(item.id)}/>
              )}
            />  
        </View>
    )
}
const styles = StyleSheet.create({
  text: {
    fontSize: 20,
    fontFamily: 'serif',
    paddingBottom: 20,
    justifyContent: 'center'
}
});

