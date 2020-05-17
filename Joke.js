import React, { useState, useEffect } from 'react';
import { View, Text, Button, TextInput, StyleSheet, FlatList } from 'react-native';

export default function Joke ( {navigation} ) {

    const [joke, setJoke] = useState('');

    useEffect(() => {
        getJoke();
    }, [])

    const getJoke = () => {
        const url = 'https://icanhazdadjoke.com/slack';
        fetch(url)
        .then((response) => response.json())
        .then((responseJson) => {
            setJoke(responseJson.attachments[0].text)
        } )
    }

    return (
        <View style={styles.container}><Text style={styles.text}>{joke}</Text></View>
    )
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#D7DFFD',
      alignItems: 'center',
      justifyContent: 'center'
    },
text: {
    fontFamily: 'serif',
    fontSize: 30,
    textAlign: 'center'
}});