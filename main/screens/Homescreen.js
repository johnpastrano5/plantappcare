import React from 'react';
import { View, Text, StyleSheet, ImageBackground, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Card, Title, Paragraph } from 'react-native-paper';
import logo from '../../assets/logo.webp';
import { ScrollView } from 'react-native-gesture-handler';

const HomeScreen = () => {
  const navigation = useNavigation();

  const dashboardItems = [
    { title: 'View Plants', subtitle: 'Explore your plant collection', screen: 'PlantList' },
    { title: 'Set Care Reminders', subtitle: 'Manage watering and care schedules', screen: 'PlantCareReminders' },
    { title: 'Notes & Photos', subtitle: 'Record observations and add photos', screen: 'NotesAndPhotos' },
    { title: 'User Settings', subtitle: 'Customize your app experience', screen: 'UserSettings' },
  ];

  return (
    
    <ImageBackground
    source={logo}
      style={styles.background}
    > <ScrollView>
      <View style={styles.overlay}>
        <Text style={styles.title}>Welcome to PlantPro</Text>
        <Text style={styles.subtitle}>Your Plant Care Companion</Text>
        <View style={styles.cardContainer}>
          {dashboardItems.map((item, index) => (
            <TouchableOpacity
              key={index}
              onPress={() => navigation.navigate(item.screen)}
              style={styles.cardWrapper}
            >
              <Card style={styles.card}>
                <Card.Content>
                  <Title>{item.title}</Title>
                  <Paragraph>{item.subtitle}</Paragraph>
                </Card.Content>
              </Card>
            </TouchableOpacity>
          ))}
        </View>
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
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
  },
  title: {
    fontSize: 32,
    color: '#fff',
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 20,
    color: '#fff',
    textAlign: 'center',
    marginBottom: 32,
  },
  cardContainer: {
    width: '100%',
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
  },
  cardWrapper: {
    width: '45%',
    margin: 10,
  },
  card: {
    padding: 10,
    borderRadius: 10,
  },
});

export default HomeScreen;
