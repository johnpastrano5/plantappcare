import React from 'react';
import { View, StyleSheet } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { initializeApp } from 'firebase/app';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import LoginScreen from './login/loginscreen';
import RegisterScreen from './login/RegisterScreen';
import MainScreen from './main/mainscreen';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import Header from './Header';
import Footer from './footer';
import { firebaseConfig } from './firebaseConfig'; // Import the Firebase configuration

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

const Stack = createNativeStackNavigator();

const App = () => {
  const [user, setUser] = React.useState(null);

  React.useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
    });

    return () => unsubscribe();
  }, []);

  return (
    <SafeAreaProvider>
      <View>
        <Header />
      </View>
      <NavigationContainer>
        <Stack.Navigator>
          {!user ? (
            <>
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
                  headerTitle: '',
                  headerShown: false,
                }}
              />
            </>
          ) : (
            <Stack.Screen
              name="Main"
              component={MainScreen}
              options={{ headerShown: false }}
            />
          )}
        </Stack.Navigator>
      </NavigationContainer>
      <Footer />
    </SafeAreaProvider>
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