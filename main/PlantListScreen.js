// PlantListScreen.js
import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, Image, TouchableOpacity, StyleSheet } from 'react-native';
import { db } from '../firebaseConfig';
import { addPlantDataToFirestore } from './FirestoreFunctions';

const PlantListScreen = ({ navigation }) => {
  const [plants, setPlants] = useState([]);

  useEffect(() => {
    addPlantDataToFirestore(); // Add plant data when the component mounts
  }, []);

  useEffect(() => {
    const fetchPlants = async () => {
      const plantCollection = collection(db, 'plants');
      const snapshot = await getDocs(plantCollection);
      const plantList = snapshot.docs.map((doc) => doc.data());
      setPlants(plantList);
    };

    fetchPlants();
  }, []);

  const handlePlantPress = (plant) => {
    navigation.navigate('PlantDetails', { plant });
  };

  const renderPlantItem = ({ item }) => (
    <TouchableOpacity onPress={() => handlePlantPress(item)}>
      <View style={styles.plantItem}>
        <Image source={{ uri: item.imageUrl }} style={styles.image} />
        <Text>{item.name}</Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={plants}
        renderItem={renderPlantItem}
        keyExtractor={(item) => item.id}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  plantItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
  },
  image: {
    width: 50,
    height: 50,
    marginRight: 10,
  },
});

export default PlantListScreen;