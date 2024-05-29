import React, { useState, useEffect } from "react";
import { View, StyleSheet, Image, ScrollView, TouchableOpacity, Alert } from "react-native";
import { Text, Button, TextInput } from "react-native-paper";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { doc, setDoc, deleteDoc } from 'firebase/firestore';
import { db, auth } from '../../firebaseConfig'; // Adjust the path to your firebaseConfig

const PlantDetailsScreen = ({ route, navigation }) => {
  const { plant } = route.params;
  const [isFavorite, setIsFavorite] = useState(false);
  const [editablePlant, setEditablePlant] = useState(plant);

  useEffect(() => {
    const checkFavoriteStatus = async () => {
      try {
        const favorites = await AsyncStorage.getItem('favorites');
        if (favorites) {
          const parsedFavorites = JSON.parse(favorites);
          setIsFavorite(parsedFavorites.includes(plant.id));
        }
      } catch (error) {
        console.error('Error checking favorite status:', error);
      }
    };
    checkFavoriteStatus();
  }, [plant.id]);

  const toggleFavorite = async () => {
    try {
      let favorites = await AsyncStorage.getItem('favorites');
      if (!favorites) {
        favorites = [];
      } else {
        favorites = JSON.parse(favorites);
      }

      if (isFavorite) {
        favorites = favorites.filter(id => id !== plant.id);
      } else {
        favorites.push(plant.id);
      }

      await AsyncStorage.setItem('favorites', JSON.stringify(favorites));
      setIsFavorite(!isFavorite);

      // Also add/remove from Firestore favorites collection
      const user = auth.currentUser;
      if (user) {
        if (isFavorite) {
          // Remove from favorites
          await deleteDoc(doc(db, 'users', user.uid, 'favorites', plant.id));
        } else {
          // Add to favorites
          await setDoc(doc(db, 'users', user.uid, 'favorites', plant.id), plant);
        }
      }

    } catch (error) {
      console.error('Error toggling favorite:', error);
    }
  };

  const handleAddToCollection = async () => {
    const user = auth.currentUser;
    if (user) {
      try {
        await setDoc(doc(db, 'users', user.uid, 'collection', plant.id), plant);
        alert('Plant added to your collection');
      } catch (error) {
        console.error('Error adding to collection: ', error);
        alert('Failed to add plant to collection');
      }
    } else {
      alert('You need to be logged in to add plants to your collection');
    }
  };

  const handleUpdatePlant = async () => {
    const user = auth.currentUser;
    if (user) {
      try {
        await setDoc(doc(db, 'users', user.uid, 'collection', plant.id), editablePlant);
        alert('Plant details updated');
      } catch (error) {
        console.error('Error updating plant: ', error);
        alert('Failed to update plant details');
      }
    } else {
      alert('You need to be logged in to update plant details');
    }
  };

  const handleDeletePlant = async () => {
    const user = auth.currentUser;
    if (user) {
      try {
        await deleteDoc(doc(db, 'users', user.uid, 'collection', plant.id));
        alert('Plant deleted');
        navigation.goBack(); // Go back to the previous screen
      } catch (error) {
        console.error('Error deleting plant: ', error);
        alert('Failed to delete plant');
      }
    } else {
      alert('You need to be logged in to delete plant details');
    }
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>{editablePlant.name}</Text>
        <Image source={{ uri: editablePlant.imageUrl }} style={styles.image} />
      </View>
      <TouchableOpacity onPress={toggleFavorite} style={styles.favoriteButton}>
        <Text style={styles.favoriteButtonText}>{isFavorite ? 'Remove from Favorites' : 'Add to Favorites'}</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={handleAddToCollection} style={styles.collectionButton}>
        <Text style={styles.collectionButtonText}>Add to Collection</Text>
      </TouchableOpacity>
      <Text style={styles.sectionHeader}>Description:</Text>
      <TextInput
        style={styles.textInput}
        value={editablePlant.description}
        onChangeText={(text) => setEditablePlant({ ...editablePlant, description: text })}
      />
      <Text style={styles.sectionHeader}>Care Instructions:</Text>
      <TextInput
        style={styles.textInput}
        value={editablePlant.careInstructions}
        onChangeText={(text) => setEditablePlant({ ...editablePlant, careInstructions: text })}
      />
      <Text style={styles.sectionHeader}>Watering Guidelines:</Text>
      <TextInput
        style={styles.textInput}
        value={editablePlant.wateringGuidelines}
        onChangeText={(text) => setEditablePlant({ ...editablePlant, wateringGuidelines: text })}
      />
      <Text style={styles.sectionHeader}>Sunlight Requirements:</Text>
      <TextInput
        style={styles.textInput}
        value={editablePlant.sunlightRequirements}
        onChangeText={(text) => setEditablePlant({ ...editablePlant, sunlightRequirements: text })}
      />
      <Text style={styles.sectionHeader}>Additional Tips:</Text>
      <TextInput
        style={styles.textInput}
        value={editablePlant.additionalTips}
        onChangeText={(text) => setEditablePlant({ ...editablePlant, additionalTips: text })}
      />
      <Button mode="contained" style={styles.updateButton} onPress={handleUpdatePlant}>
        Update Plant
      </Button>
      <Button mode="contained" style={styles.deleteButton} onPress={() => Alert.alert(
        'Delete Plant',
        'Are you sure you want to delete this plant?',
        [
          { text: 'Cancel', style: 'cancel' },
          { text: 'OK', onPress: handleDeletePlant },
        ]
      )}>
        Delete Plant
      </Button>
      <View style={styles.detailsContainer}>
        <Text style={styles.detailsText}>Scientific Name: {plant.scientificName}</Text>
        <Text style={styles.detailsText}>Plant Type: {plant.plantType}</Text>
        <Text style={styles.detailsText}>Family: {plant.family}</Text>
        {/* Add more details as needed */}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5",
    padding: 16,
  },
  header: {
    alignItems: "center",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 16,
    textAlign: "center",
  },
  image: {
    width: 200,
    height: 200,
    marginBottom: 16,
    borderRadius: 8,
  },
  sectionHeader: {
    fontSize: 18,
    fontWeight: "bold",
    marginTop: 16,
    marginBottom: 8,
  },
  textInput: {
    backgroundColor: "#fff",
    borderRadius: 8,
    padding: 8,
    marginBottom: 8,
  },
  favoriteButton: {
    backgroundColor: "#007bff",
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 8,
    alignSelf: 'center',
    marginVertical: 16,
  },
  favoriteButtonText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 16,
  },
  collectionButton: {
    backgroundColor: "#28a745",
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 8,
    alignSelf: 'center',
    marginVertical: 16,
  },
  collectionButtonText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 16,
  },
  updateButton: {
    backgroundColor: "#ffc107",
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 8,
    alignSelf: 'center',
    marginVertical: 16,
  },
  deleteButton: {
    backgroundColor: "#dc3545",
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 8,
    alignSelf: 'center',
    marginVertical: 16,
  },
  detailsContainer: {
    marginTop: 16,
  },
  detailsText: {
    fontSize: 16,
    marginBottom: 8,
  },
});

export default PlantDetailsScreen;