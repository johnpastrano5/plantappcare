import React, { useState } from 'react';
import { View, StyleSheet, Image } from 'react-native';
import { Text, TextInput, Button, Snackbar } from 'react-native-paper';
import * as ImagePicker from 'expo-image-picker';
import { collection, addDoc } from 'firebase/firestore';
import { db, storage } from '../../firebaseConfig';
import { getStorage, ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { v4 as uuidv4 } from 'uuid';

const NotesAndPhotosScreen = () => {
  const [note, setNote] = useState('');
  const [visible, setVisible] = useState(false);
  const [imageUrl, setImageUrl] = useState('');
  const [uploading, setUploading] = useState(false);

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    console.log(result);

    if (!result.cancelled) {
      setImageUrl(result.uri);
    }
  };

  const uploadImage = async (uri) => {
    const response = await fetch(uri);
    const blob = await response.blob();
    const filename = `${uuidv4()}.jpg`;
    const storageRef = ref(storage, `images/${filename}`);
    await uploadBytes(storageRef, blob);
    const downloadURL = await getDownloadURL(storageRef);
    return downloadURL;
  };

  const saveNote = async () => {
    setUploading(true);
    try {
      let downloadURL = '';
      if (imageUrl) {
        downloadURL = await uploadImage(imageUrl);
      }

      await addDoc(collection(db, 'notes'), {
        note,
        imageUrl: downloadURL,
      });

      setNote('');
      setImageUrl('');
      setVisible(true);
    } catch (error) {
      console.error('Error saving note: ', error);
    } finally {
      setUploading(false);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Add Notes and Photos</Text>
      <TextInput
        label="Note"
        value={note}
        onChangeText={setNote}
        style={styles.input}
      />
      <Button mode="contained" onPress={pickImage} style={styles.button}>
        Pick an image
      </Button>
      {imageUrl ? (
        <Image source={{ uri: imageUrl }} style={styles.image} />
      ) : null}
      <Button
        mode="contained"
        onPress={saveNote}
        style={styles.button}
        disabled={uploading}
      >
        {uploading ? 'Uploading...' : 'Save Note'}
      </Button>
      <Snackbar
        visible={visible}
        onDismiss={() => setVisible(false)}
        duration={Snackbar.DURATION_SHORT}
      >
        Note saved!
      </Snackbar>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 16,
    backgroundColor: '#f5f5f5',
  },
  title: {
    fontSize: 24,
    marginBottom: 24,
    textAlign: 'center',
    color: '#333',
  },
  input: {
    marginBottom: 16,
    backgroundColor: '#fff',
  },
  button: {
    marginBottom: 16,
    paddingVertical: 8,
    borderRadius: 8,
  },
  image: {
    width: '100%',
    height: 200,
    marginBottom: 16,
    borderRadius: 8,
  },
});

export default NotesAndPhotosScreen;
