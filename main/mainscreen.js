import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { getAuth, signOut } from 'firebase/auth';
import PlantListScreen from './PlantListScreen';

const Drawer = createDrawerNavigator();

const MainScreen = ({ navigation }) => {
  const auth = getAuth();

  const handleLogout = () => {
    signOut(auth)
      .then(() => {
        navigation.navigate('Login');
      })
      .catch((error) => {
        console.error('Error signing out:', error.message);
      });
  };

  return (
    <Drawer.Navigator initialRouteName="PlantList">
      <Drawer.Screen name="PlantList" component={PlantListScreen} />
      <Drawer.Screen
        name="LogOut"
        component={() => (
          <View style={styles.container}>
            <Text style={styles.title}>Main Screen</Text>
            <Text>Welcome to your app!</Text>
            <Button title="Log Out" onPress={handleLogout} />
          </View>
        )}
      />
    </Drawer.Navigator>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
  },
  title: {
    fontSize: 24,
    marginBottom: 16,
  },
});

export default MainScreen;