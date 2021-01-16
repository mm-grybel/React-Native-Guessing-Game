import React, { useState, useRef, useEffect } from 'react';
import { View, Text, FlatList, Alert, StyleSheet } from 'react-native';
import { AntDesign } from '@expo/vector-icons';

import Card from '../components/Card';
import MainButton from '../components/MainButton';
import DefaultStyles from '../constants/default-styles';
import NumberContainer from '../components/NumberContainer';

const generateRandomBetween = (min, max, exclude) => {
    min = Math.ceil(min);
    max = Math.floor(max);
    const rndNum = Math.floor(Math.random() * (max - min)) + min;
    if (rndNum === exclude) {
        return generateRandomBetween(min, max, exclude);
    } else {
        return rndNum;
    }
};

const renderListItem = (listLength, itemData) => (
    <View style={styles.listItem}>
        <Text style={DefaultStyles.bodyText}>#{listLength - itemData.index}</Text>
        <Text style={DefaultStyles.bodyText}>{itemData.item}</Text>
    </View>
);

const GameScreen = props => {
    const initialGuess = generateRandomBetween(1, 100, props.userChoice);
    const [currentGuess, setCurrentGuess] = useState(initialGuess);
    const [pastGuesses, setPastGuesses] = useState([initialGuess.toString()]);

    const currentLow = useRef(1);
    const currentHigh = useRef(100);

    const { userChoice, onGameOver } = props;

    useEffect(() => {
        if (currentGuess === userChoice) {
            onGameOver(pastGuesses.length);
        }
    }, [currentGuess, userChoice, onGameOver]);

    const nextGuessHandler = direction => {
        if (
            (direction === 'lower' && currentGuess < props.userChoice) || 
            (direction === 'greater' && currentGuess > props.userChoice)
            ) {
                Alert.alert('Don\'t lie!', 'You know that this is wrong...', [
                    {text: 'Sorry!', style:'cancel'}
                ]);
                return;
        }

        if (direction === 'lower') {
            currentHigh.current = currentGuess;
        } else {
            currentLow.current = currentGuess + 1;
        }

        const nextNumber = generateRandomBetween(
            currentLow.current, 
            currentHigh.current, 
            currentGuess
        ); 
        setCurrentGuess(nextNumber);
        setPastGuesses(curPastGuesses => [nextNumber.toString(), ...curPastGuesses]);
    };

    return (
        <View style={styles.screen}>
            <Text style={DefaultStyles.title}>Opponent's Guess</Text>
            <NumberContainer>{currentGuess}</NumberContainer>
            <Card style={styles.buttonContainer}>
                <MainButton onPress={nextGuessHandler.bind(this, 'lower')}>
                    <AntDesign name="down" size={24} color="white" />
                </MainButton> 
                <MainButton onPress={nextGuessHandler.bind(this, 'greater')}>
                    <AntDesign name="up" size={24} color="white" />
                </MainButton>
            </Card>
            <View style={styles.listContainer}>
                <FlatList 
                    keyExtractor={(item) => item}
                    data={pastGuesses} 
                    renderItem={renderListItem.bind(this, pastGuesses.length)} 
                    contentContainerStyle={styles.list}
                />
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        padding: 10,
        alignItems: 'center'
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        marginTop: 20,
        width: 400,
        maxWidth: '90%'
    },
    listContainer: {
        flex: 1,
        width: '60%'
    },
    listItem: {
        borderColor: '#ccc',
        borderWidth: 1,
        padding: 15,
        marginVertical: 10,
        backgroundColor: 'white',
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '100%'
    },
    list: {
        flexGrow: 1,
        justifyContent: 'flex-end'
    }
});

export default GameScreen;
