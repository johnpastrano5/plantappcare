import React from 'react';
import { View, Image, StyleSheet } from 'react-native';
import { Text, Button } from 'react-native-paper';
import logo from '../assets/444.webp';

const Landing = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <View style={styles.logoContainer}>
        <Image source={logo} style={styles.logo} />
        <Text style={styles.title}>PlantCareApp</Text>
      </View>
      <View style={styles.buttonsContainer}>
        <Button
          icon="login"
          mode="contained"
          onPress={() => navigation.navigate('Login')}
          style={styles.button}
          labelStyle={styles.buttonLabel}
        >
          Get Started
        </Button>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
  },
  logoContainer: {
    alignItems: 'center',
    marginBottom: 30,
  },
  logo: {
    width: 200,
    height: 200,
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    marginTop: 10,
    color: '#000000',
  },
  buttonsContainer: {
    width: '70%',
    marginTop: 30,
  },
  button: {
    paddingVertical: 12,
    borderRadius: 50,
    backgroundColor: '#81B622',
  },
  buttonLabel: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#000000',
  },
});

export default Landing;