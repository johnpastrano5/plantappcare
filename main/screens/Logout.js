import React from 'react';
import { View, StyleSheet, Text, Pressable, Image } from 'react-native';
import { getAuth, signOut } from 'firebase/auth'; // Import getAuth and signOut
import logo from '../../assets/444.webp';

const LogoutScreen = ({ navigation }) => {
  const handleLogout = async () => {
    const auth = getAuth();
    try {
      await signOut(auth);
      console.log('User signed out!');
      navigation.navigate('Landing'); // Navigate to the Landing screen
    } catch (error) {
      console.error('Sign out error:', error.message);
    }
  };

  return (
    <View style={styles.screen}>
       <View style={styles.logoContainer}>
        <Image source={logo} style={styles.logo} />
      </View>
      <Text style={styles.message}>Are you sure you want to log out?</Text>
      <Pressable
        style={[styles.button, { backgroundColor: '#3D550C' }]} // Update the style to change the background color
        onPress={handleLogout} // Call handleLogout on press
      >
        <Text style={styles.buttonLabel}>Log Out</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
    paddingHorizontal: 20,
  },
  message: {
    fontSize: 18,
    marginBottom: 20,
    textAlign: 'center',
  },
  button: {
    borderRadius: 8,
    width: 150,
    padding: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonLabel: {
    fontSize: 16,
    color: 'white', // Change the text color to white
  },
    logo: {
      width: 250,
      height: 250,
      borderRadius: 40,
      marginBottom: 10,
    },
  },
);

export default LogoutScreen;
