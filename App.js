import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import LoginScreen from './login/loginscreen';
import RegisterScreen from './login/RegisterScreen';

const firebaseConfig = {
  apiKey: "AIzaSyD5cRtWqNW62xe9IiIH8oD0zVh0HV9EYkg",
  authDomain: "plantcareapp-11f5b.firebaseapp.com",
  projectId: "plantcareapp-11f5b",
  storageBucket: "plantcareapp-11f5b.appspot.com",
  messagingSenderId: "817908811746",
  appId: "1:817908811746:web:b199332f2cd207a26e9bbb"
};

const app = initializeApp(firebaseConfig);

const Stack = createNativeStackNavigator();

const App = () => {
  const auth = getAuth(app);

  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="Login"
          component={LoginScreen}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="Register"
          component={RegisterScreen}
          options={{
            headerShown: false,
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

const styles = StyleSheet.create({
  backImage: {
    width: 24,
    height: 24,
    marginLeft: 12,
  },
});

export default App;