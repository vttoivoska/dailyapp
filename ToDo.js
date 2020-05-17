import * as React from 'react';
import { useState, useEffect } from 'react';
import { StyleSheet, Text, View, TextInput, FlatList } from 'react-native';
import * as SQLite from 'expo-sqlite';
import { Input, Button, ListItem, Header } from 'react-native-elements';
import DatePicker from 'react-native-datepicker';

export default function App( { navigation }) {

  const [todo, setTodo] = useState('');
  const [date, setDate] = useState('');
  const [todolist, setTodolist] = useState([]);

  const db = SQLite.openDatabase('list.db');

  React.useEffect(() => {
    db.transaction(tx => {
      tx.executeSql('create table if not exists list (id integer primary key'
        + ' not null, todo text, date text);');
    }, null, updateList)
  }, []);


    const saveItem = () => {
      db.transaction(tx => {
        tx.executeSql('insert into list (todo, date) values (?, ?);',
        [todo, date]);
      }, null, updateList
       )
      setTodo(''); setDate('');}

    const updateList = () => {
      db.transaction(tx => {
        tx.executeSql('select * from list;', [], (_, { rows }) =>
        setTodolist(rows._array)
        );
      });
    }

    const deleteItem = (id) => {
      db.transaction(tx => {
        tx.executeSql('delete from list where id = ?;', [id]);
      }, null, updateList)
    }

  return (
    <View style={styles.container}>
      <Header centerComponent={{ text: 'To-do', style: { color: 'white', paddingBottom: 15 }, }} 
        containerStyle={{
          backgroundColor: '#8D6DCC',
          justifyContent: 'space-around'
        }}/>

      <Input placeholder='Task' label='Task'
        style={{width: 200, borderColor: 'gray', borderWidth: 1}}
        onChangeText={(todo) => setTodo(todo)}
        value={todo}/>
      <DatePicker
        style={{paddingBottom: 20}}
        onDateChange={date => setDate(date)}/>

      <Button raised icon={{name: 'save'}} style={styles.Button} onPress={saveItem}  title="SAVE" />

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
  );
}

const styles = StyleSheet.create({
  Header: {
    padding: 10
  },
  Button: {
    padding: 10,
  },
  Input: {
    padding: 10
  },
  paragraph: {
    padding: 20
  },
  container: {
    paddingTop: 20,
    flex: 1,
    backgroundColor: '#fff',
    justifyContent: 'center',
  },
});


