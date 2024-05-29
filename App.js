import React, { useState, useEffect } from 'react';
import { View, StyleSheet } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { initializeApp } from '@firebase/app';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import LoginScreen from './login/loginscreen';
import RegisterScreen from './login/RegisterScreen';
import MainScreen from './main/mainscreen';
import AccountRecovery from './login/acccountrecovery';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import Header from './Header';
import Footer from './footer';
import Landing from './login/landing';
import AddPlantScreen from './main/screens/AddPlantScreen';

const firebaseConfig = {
  apiKey: "AIzaSyD5cRtWqNW62xe9IiIH8oD0zVh0HV9EYkg",
  authDomain: "plantcareapp-11f5b.firebaseapp.com",
  projectId: "plantcareapp-11f5b",
  storageBucket: "plantcareapp-11f5b.appspot.com",
  messagingSenderId: "817908811746",
  appId: "1:817908811746:web:b199332f2cd207a26e9bbb"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

const Stack = createNativeStackNavigator();

const App = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
    });

    return () => unsubscribe();
  }, []);

  return (
    <SafeAreaProvider>
      <View style={styles.container}>
        <Header />
      </View>
      <NavigationContainer>
        <Stack.Navigator initialRouteName='Landing'>
          {!user ? (
            <>
              <Stack.Screen
                name="Landing"
                component={Landing}
                options={{ headerShown: false }}
              />
              <Stack.Screen
                name="Login"
                component={LoginScreen}
                options={{ headerShown: false }}
              />
              <Stack.Screen
                name="Register"
                component={RegisterScreen}
                options={{ headerShown: false }}
              />
              <Stack.Screen
                name="AccountRecovery"
                component={AccountRecovery}
                options={{ headerShown: false }}
              />
               <Stack.Screen name="AddPlantScreen" component={AddPlantScreen} />
            </>
          ) : (
            <Stack.Screen
              name="Home"
              component={MainScreen}
              options={{ headerShown: false, 
                headerLeft: null,

              }}
            />
            
          )}
        </Stack.Navigator>
      </NavigationContainer>
      <Footer />
    </SafeAreaProvider>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 20,
  },
});

export default App;
