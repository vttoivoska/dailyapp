import React, { useState, useEffect } from 'react';
import { View, Text, Button, TextInput, StyleSheet, FlatList } from 'react-native';
import { Icon } from 'react-native-elements';
import MapView, { Marker } from 'react-native-maps';
import * as Location from 'expo-location';
//import Icon from 'react-native-vector-icons/dist/FontAwesome';
//import Icon from 'react-native-vector-icons/FontAwesome';

key = 'LMEUQDue4tb51ijuQV0Zq8EuNseDWNpG'

export default function HomeScreen ( {navigation} ) {

    const [location, setLocation] = useState(null);

    useEffect(() => {
        getLocation();
    }, [])

    const [long, setLong] = useState(24.943508);
    const [lat, setLat] = useState(60.166628);

    const getLocation = async() => {
        let {status} = await Location.requestPermissionsAsync();
        if (status !== 'granted') {
          Alert.alert('No permission to access location');
        }
        else {
          let location = await Location.getCurrentPositionAsync({});
          setLocation(location);
          setLat(location.coords.latitude);
          setLong(location.coords.longitude);
        }
    }

    return (
        <View style={styles.container}>
            <Text style={styles.welcome}>Welcome to the DailyApp</Text>
            <View style={styles.choose}>
            <View style={styles.row}>
            <Icon name="check" type="entypo" color='green' size={60} reverse='false' reverseColor='white' onPress={() => navigation.navigate('ToDo')} />
            <Icon name="calendar" type="entypo" color='#F74C5D' size={60} reverse='false' reverseColor='white' onPress={() => navigation.navigate('Calendar')} />
            </View>
            <View style={styles.row}>
            <Icon name="snowflake-o" type="font-awesome" color='#89C3EF' size={60} reverse='false' reverseColor='white' onPress={() => navigation.navigate('Weather', {lat, long})} />
            <Icon name="smile-o" type="font-awesome" color='#F78336' size={60} reverse='false' reverseColor='white' onPress={() => navigation.navigate('Joke')} />
            </View>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#FDEFFB',
      alignItems: 'center',
      justifyContent: 'center',
    },
    row: {
        paddingTop: 10,
        flexDirection: "row",
        alignItems: "center",
    },
    choose: {
        paddingTop: 45,
        alignItems: "center"
    },
    welcome: {
        fontFamily: 'serif',
        fontSize: 20,
        textAlign: 'center'
    }
  });