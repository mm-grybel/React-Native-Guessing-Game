import React from 'react';
import { View, Text, Button, Image, StyleSheet } from 'react-native';

import DefaultStyles from '../constants/default-styles';

const GameOverScreen = props => {
    return (
        <View style={styles.screen}>
            <Text style={DefaultStyles.title}>The Game is Over!</Text>
            <View style={styles.imageContainer}>
                <Image 
                    source={require('../assets/images/success.png')} 
                    style={styles.image} 
                    resizeMode="cover"
                />
            </View>
            <Text style={DefaultStyles.bodyText}>Number of rounds: {props.roundsNumber}</Text>
            <Text style={DefaultStyles.bodyText}>Number was: {props.userNumber}</Text>
            <Button title="NEW GAME" onPress={props.onRestart} />
        </View>
    );
};

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },
    imageContainer: {
        width: 300,
        height:  300,
        borderRadius: 150,
        borderWidth: 3,
        borderColor: 'black',
        overflow: 'hidden',
        marginVertical: 30
    },
    image: {
        width: '100%',
        height: '100%'
    }
});

export default GameOverScreen;
