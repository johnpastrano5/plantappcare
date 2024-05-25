import React from "react";
import { View, StyleSheet, Image, ScrollView } from "react-native";
import { Text } from "react-native-paper";

const PlantDetailsScreen = ({ route }) => {
  const { plant } = route.params;

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>{plant.name}</Text>
        <Image source={{ uri: plant.imageUrl }} style={styles.image} />
      </View>
      <Text style={styles.sectionHeader}>Description:</Text>
      <Text style={styles.description}>{plant.description}</Text>
      <Text style={styles.sectionHeader}>Care Instructions:</Text>
      <Text style={styles.careInstructions}>{plant.careInstructions}</Text>
      <Text style={styles.sectionHeader}>Watering Guidelines:</Text>
      <Text style={styles.wateringGuidelines}>{plant.wateringGuidelines}</Text>
      <Text style={styles.sectionHeader}>Sunlight Requirements:</Text>
      <Text style={styles.sunlightRequirements}>{plant.sunlightRequirements}</Text>
      <Text style={styles.sectionHeader}>Additional Tips:</Text>
      <Text style={styles.additionalTips}>{plant.additionalTips}</Text>
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
  description: {
    fontSize: 16,
    marginBottom: 8,
  },
  careInstructions: {
    fontSize: 16,
    marginBottom: 8,
  },
  sunlightRequirements: {
    fontSize: 16,
    marginBottom: 8,
  },
  wateringGuidelines: {
    fontSize: 16,
    marginBottom: 8,
  },
  additionalTips: {
    fontSize: 16,
    marginBottom: 8,
  },
});

export default PlantDetailsScreen;