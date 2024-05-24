// FirestoreFunctions.js
import { db } from '../firebaseConfig';
import { setDoc, addDoc, doc, collection } from 'firebase/firestore';

const addPlantDataToFirestore = async () => {
  const collectionName = 'plants';

  try {
    await setDoc(doc(db, collectionName, 'plant1'), {
      name: 'Plant A',
      description: 'This is Plant A',
      imageUrl: 'https://example.com/plantA.jpg',
    });

    await addDoc(collection(db, collectionName), {
      name: 'Plant B',
      description: 'This is Plant B',
      imageUrl: 'https://example.com/plantB.jpg',
    });

    console.log('Plant data added successfully to Firestore.');
  } catch (error) {
    console.error('Error adding plant data: ', error);
  }
};

export { addPlantDataToFirestore };