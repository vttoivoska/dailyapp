import React, { useState, useEffect } from 'react';
import { View, Text, Button, TextInput, StyleSheet, FlatList, Image } from 'react-native';

const key = '0099a659743f7dd8aa780f96bf481298';
//http://api.openweathermap.org/data/2.5/weather?lat=37.422001&lon=-122.0840142&APPID=0099a659743f7dd8aa780f96bf481298

export default function Weather ( {route, navigation} ) {

    const {lat, long} = route.params;
 
    const [weather, setWeather] = useState('');
    const [temp, setTemp] = useState('');
    const [icon, setIcon] = useState('');
    const [city, setCity] = useState('');

    useEffect(() => {
        getWeather();
    }, [])

    const getWeather = () => {
        const url = 'https://api.openweathermap.org/data/2.5/weather?lat='+ lat + '&lon=' + long +'&APPID=0099a659743f7dd8aa780f96bf481298';
        fetch(url)
        .then((response) => response.json())
        .then((responseJson) => {
            setWeather(responseJson.weather[0].main)
            setTemp((responseJson.main.temp-273.15).toFixed(1))
            setIcon(responseJson.weather[0].icon)
            setCity(responseJson.name)
        } )
    }

    return (
    <View style={styles.container}>
        <Text style={styles.text}>Weather in</Text>
        <Text style={styles.weather}>{city}</Text>
        <Text style={styles.text}>Weather at the Moment:</Text>
        <Text style={styles.weather}>{weather}</Text>
        <Text style={styles.text}>Temperature at the Moment:</Text>
        <Text style={styles.weather}>{temp} °C</Text>
        <Image style={{width: 100, height: 100}} source={{uri:'http://openweathermap.org/img/w/'+icon+'.png'}}/>
    </View>
    )
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'center',
    },
    weather: {
        fontSize: 30,
        fontFamily: 'serif',
        paddingBottom: 20
    },
    text: {
        fontFamily: 'serif',
        fontSize: 20,
    },
    location: {
        fontSize: 20,
        fontFamily: 'serif',
        paddingBottom: 20
    }
  });