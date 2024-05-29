import React, { useState, useEffect } from 'react';
import { View, StyleSheet, ScrollView, Keyboard } from 'react-native';
import { Text, TextInput, Button, Snackbar, DataTable, Checkbox } from 'react-native-paper';
import DateTimePicker from '@react-native-community/datetimepicker';
import { collection, addDoc, getDocs, serverTimestamp, updateDoc, doc } from 'firebase/firestore';
import { db } from '../../firebaseConfig';

const PlantCareRemindersScreen = () => {
  const [reminder, setReminder] = useState('');
  const [frequency, setFrequency] = useState('');
  const [time, setTime] = useState('');
  const [notes, setNotes] = useState('');
  const [reminders, setReminders] = useState([]);
  const [visible, setVisible] = useState(false);
  const [showTimePicker, setShowTimePicker] = useState(false);

  useEffect(() => {
    const fetchReminders = async () => {
      const remindersSnapshot = await getDocs(collection(db, 'reminders'));
      const remindersList = remindersSnapshot.docs.map(doc => ({ ...doc.data(), id: doc.id }));
      setReminders(remindersList);
    };
    fetchReminders();
  }, []);

  const handleSetReminder = async () => {
    if (!reminder || !frequency || !time) {
      return;
    }

    try {
      const newReminder = {
        reminder,
        frequency,
        time,
        notes,
        completed: false,
        createdAt: serverTimestamp(),
      };

      const docRef = await addDoc(collection(db, 'reminders'), newReminder);

      setReminder('');
      setFrequency('');
      setTime('');
      setNotes('');
      setVisible(true);
      Keyboard.dismiss();

      setReminders([...reminders, { ...newReminder, id: docRef.id }]);
    } catch (error) {
      console.error('Error setting reminder:', error);
    }
  };

  const toggleCompletion = async (id, completed) => {
    const reminderRef = doc(db, 'reminders', id);
    await updateDoc(reminderRef, { completed: !completed });

    const updatedReminders = reminders.map(r =>
      r.id === id ? { ...r, completed: !completed } : r
    );
    setReminders(updatedReminders);
  };

  const handleTimeChange = (event, selectedTime) => {
    setShowTimePicker(false);
    if (selectedTime) {
      const timeString = `${selectedTime.getHours().toString().padStart(2, '0')}:${selectedTime.getMinutes().toString().padStart(2, '0')}`;
      setTime(timeString);
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
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
      <TextInput
        label="Time"
        value={time}
        onChangeText={setTime}
        onFocus={() => setShowTimePicker(true)}
        placeholder="HH:MM"
        style={styles.input}
      />
      {showTimePicker && (
        <DateTimePicker
          value={new Date()}
          mode="time"
          is24Hour={true}
          display="default"
          onChange={handleTimeChange}
        />
      )}
      <TextInput
        label="Notes"
        value={notes}
        onChangeText={setNotes}
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

      <Text style={styles.title}>Your Reminders</Text>
      <ScrollView horizontal>
        <DataTable style={styles.dataTable}>
          <DataTable.Header>
            <DataTable.Title style={styles.tableHeader}>Task</DataTable.Title>
            <DataTable.Title style={styles.tableHeader}>Frequency</DataTable.Title>
            <DataTable.Title style={styles.tableHeader}>Time</DataTable.Title>
            <DataTable.Title style={styles.tableHeader}>Notes</DataTable.Title>
            <DataTable.Title style={styles.tableHeader}>Completed</DataTable.Title>
          </DataTable.Header>
          {reminders.map((r) => (
            <DataTable.Row key={r.id}>
              <DataTable.Cell style={styles.tableCell}>{r.reminder}</DataTable.Cell>
              <DataTable.Cell style={styles.tableCell}>{r.frequency}</DataTable.Cell>
              <DataTable.Cell style={styles.tableCell}>{r.time}</DataTable.Cell>
              <DataTable.Cell style={styles.tableCell}>{r.notes}</DataTable.Cell>
              <DataTable.Cell style={styles.tableCell}>
                <Checkbox
                  status={r.completed ? 'checked' : 'unchecked'}
                  onPress={() => toggleCompletion(r.id, r.completed)}
                />
              </DataTable.Cell>
            </DataTable.Row>
          ))}
        </DataTable>
      </ScrollView>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
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
    marginBottom: 16,
  },
  dataTable: {
    marginTop: 16,
    backgroundColor: '#fff',
    minWidth: 600, // Adjust as needed for your table content
  },
  tableHeader: {
    backgroundColor: '#e0e0e0',
    fontWeight: 'bold',
    minWidth: 120, // Adjust as needed for your table content
  },

});

export default PlantCareRemindersScreen;
