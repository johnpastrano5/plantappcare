import React, { useEffect, useState } from 'react';
import { View, StyleSheet, FlatList, ActivityIndicator } from 'react-native';
import { Text, Button, Snackbar } from 'react-native-paper';
import NetInfo from '@react-native-community/netinfo';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../../firebaseConfig';

const OfflineAccessScreen = () => {
  const [plants, setPlants] = useState([]);
  const [isOffline, setIsOffline] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [showSnackbar, setShowSnackbar] = useState(false);

  const fetchPlants = async () => {
    try {
      const plantsCollection = await getDocs(collection(db, 'plants'));
      const plantsList = plantsCollection.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setPlants(plantsList);
      await AsyncStorage.setItem('plants', JSON.stringify(plantsList));
      setIsLoading(false);
    } catch (error) {
      console.error('Error fetching plant data:', error);
      setShowSnackbar(true);
      setIsLoading(false);
    }
  };

  const fetchOfflineData = async () => {
    try {
      const plantsList = JSON.parse(await AsyncStorage.getItem('plants'));
      if (plantsList) {
        setPlants(plantsList);
      }
      setIsLoading(false);
    } catch (error) {
      console.error('Error fetching offline plant data:', error);
      setShowSnackbar(true);
      setIsLoading(false);
    }
  };

  const handleRetry = async () => {
    setIsLoading(true);
    setShowSnackbar(false);
    const state = await NetInfo.fetch();
    if (state.isConnected) {
      fetchPlants();
    } else {
      fetchOfflineData();
      setIsOffline(true);
    }
  };

  useEffect(() => {
    NetInfo.fetch().then(state => {
      if (state.isConnected) {
        fetchPlants();
      } else {
        fetchOfflineData();
        setIsOffline(true);
      }
    });
  }, []);

  const renderPlantItem = ({ item }) => (
    <View style={styles.plantContainer}>
      <Text style={styles.plantName}>{item.name}</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{isOffline ? 'Offline Mode' : 'Plants'}</Text>
      {isLoading ? (
        <ActivityIndicator size="large" color="#333" style={styles.loadingIndicator} />
      ) : (
        <FlatList
          data={plants}
          keyExtractor={(item) => item.id}
          renderItem={renderPlantItem}
          ListEmptyComponent={<Text style={styles.emptyText}>No plants found</Text>}
        />
      )}
      {showSnackbar && (
        <Snackbar 
          visible={showSnackbar} 
          onDismiss={() => setShowSnackbar(false)} 
          action={{
            label: 'Retry',
            onPress: handleRetry,
          }}
        >
          Oops! Something went wrong. Please try again.
        </Snackbar>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#f5f5f5',
  },
  title: {
    fontSize: 24,
    marginBottom: 16,
    textAlign: 'center',
    color: '#333',
  },
  plantContainer: {
    padding: 16,
    backgroundColor: '#fff',
    borderRadius: 8,
    marginBottom: 16,
  },
  plantName: {
    fontSize: 18,
  },
  loadingIndicator: {
    marginTop: 16,
  },
  emptyText: {
    textAlign: 'center',
    fontSize: 16,
    color: '#666',
    marginTop: 32,
  },
});

export default OfflineAccessScreen;
