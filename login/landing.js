import React from 'react';
import { View, Image, StyleSheet } from 'react-native';
import { Text, Button } from 'react-native-paper';
import logo from '../assets/logo.webp';

const Landing = ({ navigation }) => {
    return (
        <View style={styles.container}>
            <View><Image source={logo} style={styles.logoheader} /></View>
            <Text style={styles.title}>PLantCareApp</Text>
            <View style={styles.buttonsContainer}>
                <Button
                    icon="login"
                    mode="contained"
                    onPress={() => navigation.navigate('Login')}
                    style={styles.button}
                    labelStyle={styles.buttonLabel}
                >
                   Get's Started
                </Button>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 0.9,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#ffffff',
    },
    logoheader: {
        width: 200,
        height: 200,
        marginBottom: 20,
    },
    title: {
        fontSize: 18,
        marginBottom: 7,
        fontWeight: 'bold',
        color: 'black',
    },
    buttonsContainer: {
        width: '60%',
    },
    button: {
        marginTop: 5,
        paddingVertical: 8,
        borderRadius: 50,
        backgroundColor: '#D8D7D5',
    },
    buttonLabel: {
        fontSize: 14,
        fontWeight: 'bold',
        color: 'black',
    },
});

export default Landing;
