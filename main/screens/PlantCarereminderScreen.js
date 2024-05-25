import React, { useState } from 'react';
import { View, StyleSheet, TimePickerAndroid, Keyboard } from 'react-native';
import { Text, TextInput, Button, Snackbar } from 'react-native-paper';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { db } from '../../firebaseConfig';

const PlantCareRemindersScreen = () => {
  const [reminder, setReminder] = useState('');
  const [frequency, setFrequency] = useState('');
  const [visible, setVisible] = useState(false);

  const handleSetReminder = async () => {
    if (!reminder || !frequency) {
      return;
    }

    try {
      const { action, hour, minute } = await TimePickerAndroid.open({
        hour: 0,
        minute: 0,
        is24Hour: true,
      });

      if (action !== TimePickerAndroid.dismissedAction) {
        const time = `${hour.toString().padStart(2, '0')}:${minute.toString().padStart(2, '0')}`;

        await addDoc(collection(db, 'reminders'), {
          reminder,
          frequency,
          time,
          createdAt: serverTimestamp(),
        });

        setReminder('');
        setFrequency('');
        setVisible(true);
        Keyboard.dismiss();
      }
    } catch (error) {
      console.error('Error selecting time:', error);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Set Plant Care Reminders</Text>
      <TextInput
        label="Reminder"
        value={reminder}
        onChangeText={setReminder}
        style={styles.input}
      />
      <TextInput
        label="Frequency"
        value={frequency}
        onChangeText={setFrequency}
        style={styles.input}
      />
      <Button mode="contained" onPress={handleSetReminder} style={styles.button}>
        Set Reminder
      </Button>
      <Snackbar
        visible={visible}
        onDismiss={() => setVisible(false)}
        duration={Snackbar.DURATION_SHORT}
      >
        Reminder set!
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
    paddingVertical: 8,
    borderRadius: 8,
  },
});

export default PlantCareRemindersScreen;