import React, { useEffect, useState } from 'react';
import { View, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import { Text, ActivityIndicator, Card, Title, Paragraph, FAB } from 'react-native-paper';
import { collection, getDocs } from 'firebase/firestore';
import {  useNavigation } from '@react-navigation/native';
import { db, auth } from '../../firebaseConfig';  // Adjust the path to your firebaseConfig




const OwnCollectionScreen = () => {
  const navigation = useNavigation();
  const [collectionPlants, setCollectionPlants] = useState([]);
  const [favoritePlants, setFavoritePlants] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPlants = async () => {
      try {
        const user = auth.currentUser;
        if (user) {
          const userCollection = collection(db, 'users', user.uid, 'collection');
          const userFavorites = collection(db, 'users', user.uid, 'favorites');

          const collectionSnapshot = await getDocs(userCollection);
          const favoritesSnapshot = await getDocs(userFavorites);

          const collectionData = collectionSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
          const favoritesData = favoritesSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));

          setCollectionPlants(collectionData);
          setFavoritePlants(favoritesData);
        }
      } catch (error) {
        console.error('Error fetching user plants: ', error);
      } finally {
        setLoading(false);
      }
    };

    fetchPlants();
  }, []);

  const handleViewMore = (item) => {
    navigation.navigate('PlantDetails', { plant: item });
  };

  const renderPlantItem = ({ item }) => (
    <TouchableOpacity onPress={() => handleViewMore(item)} style={styles.plantItem}>
      <Card style={styles.card}>
        <Card.Cover source={{ uri: item.imageUrl }} style={styles.image} />
        <Card.Content>
          <Title style={styles.name}>{item.name}</Title>
          <Paragraph style={styles.category}>{item.category}</Paragraph>
        </Card.Content>
        <Card.Actions>
          <TouchableOpacity onPress={() => handleViewMore(item)} style={styles.viewMoreButton}>
            <Text style={styles.viewMoreButtonText}>View More</Text>
          </TouchableOpacity>
        </Card.Actions>
      </Card>
    </TouchableOpacity>
  );


  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator animating={true} size="large" />
      </View>
    );
  }



  return (
    
    <View style={styles.container}>
        

      <Text style={styles.title}>My Collection</Text>
      <Text style={styles.subtitle}>Personal Collection</Text>
      {collectionPlants.length > 0 ? (
        <FlatList
          data={collectionPlants}
          keyExtractor={(item) => item.id}
          renderItem={renderPlantItem}
          contentContainerStyle={styles.plantsContainer}
        />
      ) : (
        <Text style={styles.emptyMessage}>No plants in your collection.</Text>
      )}
      <Text style={styles.subtitle}>Favorites</Text>
      {favoritePlants.length > 0 ? (
        <FlatList
          data={favoritePlants}
          keyExtractor={(item) => item.id}
          renderItem={renderPlantItem}
          contentContainerStyle={styles.plantsContainer}
        />
      ) : (
        <Text style={styles.emptyMessage}>No favorite plants.</Text>
      )}
      <FAB
        style={styles.fab}
        icon="plus"
        onPress={() => navigation.navigate('AddPlant')}
      />
    </View>
    
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
    padding: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 16,
    marginBottom: 8,
    textAlign: 'center',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  plantsContainer: {
    paddingBottom: 16,
  },
  plantItem: {
    marginBottom: 16,
    alignItems: 'center',
  },
  card: {
    width: '100%',
    elevation: 4,
    borderRadius: 8,
  },
  image: {
    height: 200,
    borderRadius: 8,
  },
  name: {
    fontSize: 18,
    marginBottom: 8,
  },
  category: {
    fontSize: 14,
    marginBottom: 8,
  },
  viewMoreButton: {
    backgroundColor: '#f2f2f2',
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 4,
  },
  viewMoreButtonText: {
    color: '#777',
    fontWeight: 'bold',
  },
  emptyMessage: {
    alignSelf: 'center',
    fontSize: 16,
    marginTop: 32,
  },
  fab: {
    position: 'absolute',
    margin: 16,
    right: 0,
    bottom: 0,
    backgroundColor: '#007bff',
  },
});

export default OwnCollectionScreen;

