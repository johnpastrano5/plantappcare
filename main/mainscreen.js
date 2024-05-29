import React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { NavigationContainer } from '@react-navigation/native';
import HomeScreen from './screens/Homescreen';
import PlantListScreen from './screens/PlantListScreen';
import LogoutScreen from './screens/Logout';
//import PlantDetailsScreen from './screens/PlantdetailsScreen';
import PlantCareRemindersScreen from './screens/PlantCarereminderScreen';
import NotesAndPhotosScreen from './screens/NotesAndPhotosScreen';
//import SearchScreen from './screens/SearchScreen';
import OfflineAccessScreen from './screens/OfflineAccessScreen';
import UserSettingsScreen from './screens/UserSettingScreen';
import OwnCollectionScreen from './screens/OwnCollectionScreen';
import AddPlantScreen from './screens/AddPlantScreen';
import AboutScreen from './screens/About';
import ContactUsScreen from './screens/Contactus';


const Drawer = createDrawerNavigator();

const MainScreen = () => {
  return (
    <NavigationContainer independent={true}>
      <Drawer.Navigator initialRouteName="Home">
        <Drawer.Screen name="Home" component={HomeScreen} />
        <Drawer.Screen name="PlantList" component={PlantListScreen} />
        <Drawer.Screen name="PlantCareReminders" component={PlantCareRemindersScreen} />
        <Drawer.Screen name="NotesAndPhotos" component={NotesAndPhotosScreen} />
        <Drawer.Screen name="OfflineAccess" component={OfflineAccessScreen} />
        <Drawer.Screen name="OwnCollectionScreen" component={OwnCollectionScreen} options={{ title: 'My Collection' }} />
        <Drawer.Screen name="AddPlant" component={AddPlantScreen} />
        <Drawer.Screen name="UserSettings" component={UserSettingsScreen} />
        <Drawer.Screen name="About" component={AboutScreen} />
        <Drawer.Screen name="Contactus" component={ContactUsScreen} />
        <Drawer.Screen name="Logout" component={LogoutScreen} />
      </Drawer.Navigator>
    </NavigationContainer>
  );
};

export default MainScreen;
