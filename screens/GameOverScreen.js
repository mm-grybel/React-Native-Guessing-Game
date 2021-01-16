import React from 'react';
import { View, Text, Button, Image, StyleSheet } from 'react-native';

import MainButton from '../components/MainButton';
import DefaultStyles from '../constants/default-styles';
import Colors from '../constants/colors';

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
            <Text style={DefaultStyles.bodyText}>
                Number of rounds: <Text style={styles.highlight}>{props.roundsNumber}</Text>
            </Text>
            <Text style={DefaultStyles.bodyText}>
                Number was: <Text style={styles.highlight}>{props.userNumber}</Text>
            </Text>
            <MainButton onPress={props.onRestart}>NEW GAME</MainButton>
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
    },
    highlight: {
        color: Colors.primary
    }
});

export default GameOverScreen;
