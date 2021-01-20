import React, { useState, useEffect } from 'react';
import { 
    View, 
    Text, 
    Image, 
    ScrollView, 
    Dimensions, 
    StyleSheet 
} from 'react-native';

import MainButton from '../components/MainButton';
import DefaultStyles from '../constants/default-styles';
import Colors from '../constants/colors';

const GameOverScreen = props => {
    const [detectedDeviceWidth, setDetectedDeviceWidth] = useState(Dimensions.get('window').width);
    const [detectedDeviceHeight, setDetectedDeviceHeight] = useState(Dimensions.get('window').height);

    useEffect(() => {
        const updateLayout = () => {
            setDetectedDeviceWidth(Dimensions.get('window').width);
            setDetectedDeviceHeight(Dimensions.get('window').height);
        };

        Dimensions.addEventListener('change', updateLayout);

        return () => {
            Dimensions.removeEventListener('change', updateLayout);
        };
    });

    return (
        <ScrollView>
            <View style={styles.screen}>
                <Text style={DefaultStyles.title}>Game Over!</Text>
                <View style={{...styles.imageContainer, ...{
                    width: detectedDeviceWidth * 0.7,
                    height: detectedDeviceWidth * 0.7,
                    borderRadius: (detectedDeviceWidth * 0.7) / 2,
                    marginVertical: detectedDeviceHeight / 30

                }}}>
                    <Image 
                        source={require('../assets/images/success.jpeg')} 
                        style={styles.image} 
                        resizeMode="cover"
                    />
                </View>
                <Text style={DefaultStyles.bodyText}>
                    The number of rounds: <Text style={styles.highlight}>{props.roundsNumber}</Text>
                </Text>
                <Text style={DefaultStyles.bodyText}>
                    Selected number was: <Text style={styles.highlight}>{props.userNumber}</Text>
                </Text>
                <MainButton onPress={props.onRestart}>NEW GAME</MainButton>
            </View>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 10
    },
    imageContainer: {
        borderWidth: 3,
        borderColor: 'black',
        overflow: 'hidden',
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