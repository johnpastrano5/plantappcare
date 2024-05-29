import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Image, ScrollView, ActivityIndicator } from 'react-native';
import { Text, TextInput, Button, Snackbar, DataTable } from 'react-native-paper';
import * as ImagePicker from 'expo-image-picker';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { db, storage } from '../../firebaseConfig';
import { ref, uploadBytes, getDownloadURL, refFromURL } from 'firebase/storage';
import { v4 as uuidv4 } from 'uuid';

const NotesAndPhotosScreen = () => {
  const [note, setNote] = useState('');
  const [visible, setVisible] = useState(false);
  const [imageUrl, setImageUrl] = useState('');
  const [uploading, setUploading] = useState(false);
  const [notesAndPhotos, setNotesAndPhotos] = useState([]);
  const [loading, setLoading] = useState(false); // For fetching notes and photos

  useEffect(() => {
    // Request permission to access the camera and photo library
    (async () => {
      const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
      if (status !== 'granted') {
        alert('Permission to access camera roll is required!');
      }
    })();
  }, []);

  // Function to pick an image from the device's gallery
  const pickImage = async () => {
    let permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (!permissionResult.granted) {
      alert('Permission to access camera roll is required!');
      return;
    }

    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.cancelled) {
      setImageUrl(result.uri); // Set the URI of the selected image
    }
  };

  // Function to upload the selected image to Firebase Storage
  const uploadImage = async (uri) => {
    const response = await fetch(uri);
    const blob = await response.blob();
    const filename = `${uuidv4()}.jpg`;
    const storageRef = ref(storage, `images/${filename}`);
    await uploadBytes(storageRef, blob);
    const downloadURL = await getDownloadURL(storageRef);
    return downloadURL;
  };

  // Function to save the note with optional image to Firestore
  const saveNote = async () => {
    setUploading(true);
    try {
      let downloadURL = '';
      if (imageUrl) {
        downloadURL = await uploadImage(imageUrl);
      }

      // Add a new document with the note and optional image URL
      const docRef = await addDoc(collection(db, 'notes'), {
        note,
        imageUrl: downloadURL,
        createdAt: serverTimestamp(),
      });

      // Update notesAndPhotos state to display the added note and photo
      setNotesAndPhotos([
        ...notesAndPhotos,
        { id: docRef.id, note, imageUrl: downloadURL },
      ]);

      // Reset state after saving
      setNote('');
      setImageUrl('');
      setVisible(true);
    } catch (error) {
      console.error('Error saving note: ', error);
    } finally {
      setUploading(false);
    }
  };

  // Function to delete a note and photo from Firestore and storage
  const deleteNote = async (id, imageUrl) => {
    try {
      // Delete document from Firestore
      await db.collection('notes').doc(id).delete();

      // Delete image from storage if imageUrl exists
      if (imageUrl) {
        const storageRef = refFromURL(imageUrl);
        await storageRef.delete();
      }

      // Remove note from notesAndPhotos state
      const updatedNotes = notesAndPhotos.filter((item) => item.id !== id);
      setNotesAndPhotos(updatedNotes);
      setVisible(true); // Show Snackbar to indicate deletion
    } catch (error) {
      console.error('Error deleting note: ', error);
    }
  };

  // Function to fetch notes and photos from Firestore
  const fetchNotesAndPhotos = async () => {
    setLoading(true);
    try {
      const notesCollectionRef = collection(db, 'notes');
      const snapshot = await getDocs(notesCollectionRef);
      const notesData = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setNotesAndPhotos(notesData);
    } catch (error) {
      console.error('Error fetching notes: ', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchNotesAndPhotos();
  }, []);

  return (
    <ScrollView>
      <View style={styles.container}>
        <Text style={styles.title}>Capture Notes and Photos</Text>
        <TextInput
          label="Note"
          value={note}
          onChangeText={setNote}
          style={styles.input}
          multiline
          numberOfLines={4}
        />
        <View style={styles.buttonContainer}>
          {!imageUrl && (
            <Button mode="contained" onPress={pickImage} style={styles.button}>
              Pick an image from gallery
            </Button>
          )}
          <Button mode="contained" onPress={saveNote} style={styles.button} disabled={uploading}>
            {uploading ? 'Uploading...' : 'Save Note'}
          </Button>
        </View>
        {imageUrl ? (
          <View style={styles.imageContainer}>
            <Image source={{ uri: imageUrl }} style={styles.image} />
          </View>
        ) : null}
        {loading ? (
          <ActivityIndicator size="large" color="#0000ff" />
        ) : (
          <ScrollView style={styles.scrollView}>
            <DataTable>
              <DataTable.Header>
                <DataTable.Title>Note</DataTable.Title>
                <DataTable.Title>Photo</DataTable.Title>
                <DataTable.Title>Delete</DataTable.Title>
              </DataTable.Header>
              {notesAndPhotos.map((item) => (
                <DataTable.Row key={item.id}>
                  <DataTable.Cell>{item.note}</DataTable.Cell>
                  <DataTable.Cell>
                    {item.imageUrl ? (
                      <Image source={{ uri: item.imageUrl }} style={styles.tableImage} />
                    ) : null}
                  </DataTable.Cell>
                  <DataTable.Cell>
                    <Button
                      icon="delete"
                      onPress={() => deleteNote(item.id, item.imageUrl)}
                      compact
                      color="red"
                    >
                      Delete
                    </Button>
                  </DataTable.Cell>
                </DataTable.Row>
              ))}
            </DataTable>
          </ScrollView>
        )}
        <Snackbar
          visible={visible}
          onDismiss={() => setVisible(false)}
          duration={Snackbar.DURATION_SHORT}
        >
          Note saved!
        </Snackbar>
      </View>
    </ScrollView>
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
  buttonContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  button: {
    flex: 1,
    marginRight: 8,
    paddingVertical: 8,
    borderRadius: 8,
  },
  imageContainer: {
    alignItems: 'center',
    marginBottom: 16,
  },
  image: {
    width: 200,
    height: 200,
    borderRadius: 8,
  },
  scrollView: {
    maxHeight: 300,
  },
  tableImage: {
    width: 50,
    height: 50,
    borderRadius: 25,
  },
});

export default NotesAndPhotosScreen;
