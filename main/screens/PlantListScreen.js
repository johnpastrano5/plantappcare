import React, { useEffect, useState } from "react";
import { View, StyleSheet, FlatList, TouchableOpacity } from "react-native";
import { Text, ActivityIndicator, TextInput, Card, Title, Paragraph } from "react-native-paper";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../../firebaseConfig";
import { createStackNavigator } from "@react-navigation/stack";
import PlantDetailsScreen from './PlantdetailsScreen';

const Stack = createStackNavigator();

const PlantListScreen = ({ navigation }) => {
  const [plants, setPlants] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredPlants, setFilteredPlants] = useState([]);

  useEffect(() => {
    const fetchPlants = async () => {
      try {
        const plantsCollection = await getDocs(collection(db, "plants"));
        const plantData = plantsCollection.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
        const validPlantData = plantData.filter(plant => plant.name);
        const sortedPlants = validPlantData.sort((a, b) => a.name.localeCompare(b.name));
        setPlants(sortedPlants);
      } catch (error) {
        console.error("Error fetching plants: ", error);
      } finally {
        setLoading(false);
      }
    };
    fetchPlants();
  }, []);

  useEffect(() => {
    const filteredPlants = plants.filter((plant) =>
      plant.name.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setFilteredPlants(filteredPlants);
  }, [searchQuery, plants]);

  const handleViewMore = (item) => {
    navigation.navigate("PlantDetails", { plant: item });
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
    <Stack.Navigator>
      <Stack.Screen
        name="PlantList"
        component={() => (
          <View style={styles.container}>
            <Text style={styles.title}>Plant List</Text>
            <TextInput
              label="Search"
              value={searchQuery}
              onChangeText={setSearchQuery}
              style={styles.input}
            />
            {filteredPlants.length > 0 ? (
              <FlatList
                data={filteredPlants}
                keyExtractor={(item) => item.id}
                renderItem={renderPlantItem}
                contentContainerStyle={styles.plantsContainer}
              />
            ) : (
              <Text style={styles.emptyMessage}>No plants found.</Text>
            )}
          </View>
        )}
        options={{
          headerShown: false,
          headerLeft: null,
        }}
      />
      <Stack.Screen name="PlantDetails" component={PlantDetailsScreen} />
    </Stack.Navigator>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5",
    padding: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 16,
    textAlign: "center",
  },
  input: {
    marginBottom: 16,
    backgroundColor: "#fff",
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  plantsContainer: {
    paddingBottom: 16,
  },
  plantItem: {
    marginBottom: 16,
    alignItems: "center",
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
    backgroundColor: "#f2f2f2",
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 4,
  },
  viewMoreButtonText: {
    color: "#777",
    fontWeight: "bold",
  },
  emptyMessage: {
    alignSelf: "center",
    fontSize: 16,
    marginTop: 32,
  },
});

export default PlantListScreen;
