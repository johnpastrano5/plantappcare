import React, { useState } from 'react';
import { View, StyleSheet, TextInput, Button } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { collection, addDoc } from 'firebase/firestore';
import { db } from '../../firebaseConfig'; // Adjust the path to your firebaseConfig

const AddPlantScreen = () => {
  const navigation = useNavigation();
  const [plantName, setPlantName] = useState('');
  const [description, setDescription] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [careInstructions, setcareInstructions] = useState('');
  const [wateringGuidelines, setwateringGuidelines] = useState('');
  const [sunlightRequirements, setsunlightRequirements] = useState('');
  const [additionalTips, setadditionalTips] = useState('');

  const handleAddPlant = async () => {
    try {
      const plantData = {
        name: plantName,
        description: description,
        imageUrl: imageUrl,
        careInstructions: careInstructions,
        wateringGuidelines: wateringGuidelines,
        sunlightRequirements: sunlightRequirements,
        additionalTips: additionalTips,
      };
      const docRef = await addDoc(collection(db, 'plants'), plantData);
      console.log('Plant added with ID: ', docRef.id);

      // Reset the form after adding the plant
      setPlantName('');
      setDescription('');
      setImageUrl('');
      setcareInstructions('');
      setwateringGuidelines('');
      setsunlightRequirements('');
      setadditionalTips('');

      // Navigate back to the collection screen after adding the plant
      navigation.navigate('HomeScreen');
    } catch (error) {
      console.error('Error adding plant: ', error);
    }
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Plant Name"
        value={plantName}
        onChangeText={setPlantName}
      />
      <TextInput
        style={styles.input}
        placeholder="Description"
        value={description}
        onChangeText={setDescription}
      />
      <TextInput
        style={styles.input}
        placeholder="Image URL"
        value={imageUrl}
        onChangeText={setImageUrl}
      />
      <TextInput
        style={styles.input}
        placeholder="Care Instructions"
        value={careInstructions}
        onChangeText={setcareInstructions}
      />
      <TextInput
        style={styles.input}
        placeholder="Watering Guidelines"
        value={wateringGuidelines}
        onChangeText={setwateringGuidelines}
      />
      <TextInput
        style={styles.input}
        placeholder="Sunlight Requirements"
        value={sunlightRequirements}
        onChangeText={setsunlightRequirements}
      />
      <TextInput
        style={styles.input}
        placeholder="Additional Tips"
        value={additionalTips}
        onChangeText={setadditionalTips}
      />

      {/* Add more input fields for additional plant information */}
      <Button title="Add Plant" onPress={handleAddPlant} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 16,
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 16,
    paddingHorizontal: 10,
  },
});

export default AddPlantScreen;