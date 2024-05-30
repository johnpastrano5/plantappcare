import React from 'react';
import { View, Text, StyleSheet, ImageBackground, TouchableOpacity, ScrollView, Image, Dimensions } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Card, Title, Paragraph } from 'react-native-paper';

const windowWidth = Dimensions.get('window').width;

const HomeScreen = () => {
  const navigation = useNavigation();

  const featuredPlants = [
    { name: 'Rose', image: require('../../assets/rose.jpg') },
    { name: 'Snake Plant (Sansevieria)', image: require('../../assets/snake_plant.jpg') },
    { name: 'Snake Monstera Deliciosa (Swiss Cheese Plant)', image: require('../../assets/monstera.jpg') },
  ];

  const dashboardItems = [
    { title: 'View Plants', subtitle: 'Explore your plant collection', screen: 'PlantList' },
    { title: 'Set Care Reminders', subtitle: 'Manage watering and care schedules', screen: 'PlantCareReminders' },
    { title: 'Notes & Photos', subtitle: 'Record observations and add photos', screen: 'NotesAndPhotos' },
    { title: 'User Settings', subtitle: 'Customize your app experience', screen: 'UserSettings' },
    { title: 'My Collection', subtitle: 'Create Personal Collection', screen: 'OwnCollectionScreen' }
    // Add more dashboard items
  ];

  const navigateToScreen = async (screen) => {
    switch (screen) {
      case 'PlantList':
        navigation.navigate(screen);
        break;
      case 'PlantCareReminders':
        navigation.navigate(screen);
        break;
      case 'NotesAndPhotos':
        navigation.navigate(screen);
        break;
      case 'UserSettings':
        navigation.navigate(screen);
        break;
      case 'OwnCollectionScreen':
        navigation.navigate(screen);
        break;
      default:
        break;
    }
  };

  const handleSearch = () => {
    navigation.navigate('SearchScreen');
  };
  

  return (
    <ImageBackground source={require('../../assets/333.jpg')} style={styles.background}>
      <ScrollView contentContainerStyle={styles.container}>
        <Text style={styles.title}>Welcome to PlantCare Companion</Text>
        <Text style={styles.subtitle}>Your Guide to Green Thumb</Text>
        <TouchableOpacity onPress={handleSearch} style={styles.featuredContainer}>
          <Text style={styles.featuredTitle}>Featured Plants</Text>
          <ScrollView horizontal={true} showsHorizontalScrollIndicator={false} style={styles.featuredPlants}>
            {featuredPlants.map((plant, index) => (
              <TouchableOpacity key={index} onPress={() => navigation.navigate('PlantDetails', { plant })} style={styles.featuredPlant}>
                <ImageBackground source={plant.image} style={styles.featuredPlantImage}>
                  <Text style={styles.featuredPlantName}>{plant.name}</Text>
                </ImageBackground>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </TouchableOpacity>
        <View style={styles.optionsContainer}>
          {dashboardItems.map((item, index) => (
            <TouchableOpacity key={index} onPress={() => navigateToScreen(item.screen)} style={styles.option}>
              <Text style={styles.optionText}>{item.title}</Text>
              <Text style={styles.optionSubtitle}>{item.subtitle}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  background: {
    flex: 1,
    resizeMode: 'cover',
    justifyContent: 'center',
  },
  container: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 16,
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 28,
    color: '#fff',
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 18,
    color: '#fff',
    textAlign: 'center',
    marginBottom: 32,
  },
  featuredContainer: {
    marginBottom: 24,
    width: '100%',
  },
  featuredTitle: {
    fontSize: 20,
    color: '#fff',
    fontWeight: 'bold',
    marginBottom: 16,
    textAlign: 'center',
  },
  featuredPlants: {
    flexDirection: 'row',
    width: '100%',
  },
  featuredPlant: {
    marginRight: 16,
    width: 100,
    height: 100,
    borderRadius: 8,
    overflow: 'hidden',
  },
  featuredPlantImage: {
    width: '100%',
    height: '100%',
    justifyContent: 'flex-end',
    padding: 8,
  },
  featuredPlantName: {
    fontSize: 14,
    color: '#fff',
    fontWeight: 'bold',
    textAlign: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    padding: 4,
  },
  optionsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    flexWrap: 'wrap',
  },
  option: {
    width: windowWidth > 400 ? '45%' : '90%',
    marginVertical: 8,
    padding: 16,
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
    borderRadius: 8,
    alignItems: 'center',
  },
  optionText: {
    fontSize: 16,
    color: '#000',
    fontWeight: 'bold',
    marginBottom: 8,
    textAlign: 'center',
  },
  optionSubtitle: {
    fontSize: 14,
    color: '#666',
    textAlign: 'center',
  },
});

export default HomeScreen;
