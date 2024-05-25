import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Text, Switch, Button, Picker, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const UserSettingsScreen = () => {
  const [notificationsEnabled, setNotificationsEnabled] = useState(false);
  const [unit, setUnit] = useState('metric');
  const [language, setLanguage] = useState('en');
  const [saveSuccess, setSaveSuccess] = useState(false);
  const [saveError, setSaveError] = useState(false);

  useEffect(() => {
    const loadSettings = async () => {
      try {
        const savedNotifications = await AsyncStorage.getItem('notificationsEnabled');
        const savedUnit = await AsyncStorage.getItem('unit');
        const savedLanguage = await AsyncStorage.getItem('language');

        if (savedNotifications !== null) {
          setNotificationsEnabled(JSON.parse(savedNotifications));
        }
        if (savedUnit) {
          setUnit(savedUnit);
        }
        if (savedLanguage) {
          setLanguage(savedLanguage);
        }
      } catch (error) {
        console.error('Error loading settings:', error);
      }
    };

    loadSettings();
  }, []);

  const toggleNotifications = async () => {
    const newValue = !notificationsEnabled;
    setNotificationsEnabled(newValue);
    try {
      await AsyncStorage.setItem('notificationsEnabled', JSON.stringify(newValue));
      setSaveSuccess(true);
    } catch (error) {
      setSaveError(true);
      console.error('Error saving settings:', error);
    }
  };

  const handleUnitChange = async (itemValue) => {
    setUnit(itemValue);
    try {
      await AsyncStorage.setItem('unit', itemValue);
      setSaveSuccess(true);
    } catch (error) {
      setSaveError(true);
      console.error('Error saving settings:', error);
    }
  };

  const handleLanguageChange = async (itemValue) => {
    setLanguage(itemValue);
    try {
      await AsyncStorage.setItem('language', itemValue);
      setSaveSuccess(true);
    } catch (error) {
      setSaveError(true);
      console.error('Error saving settings:', error);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>App Preferences</Text>
      <View style={styles.settingContainer}>
        <Text>Enable Notifications</Text>
        <Switch
          value={notificationsEnabled}
          onValueChange={toggleNotifications}
        />
      </View>
      <View style={styles.settingContainer}>
        <Text>Unit System</Text>
        <Picker
          selectedValue={unit}
          onValueChange={handleUnitChange}
          style={styles.picker}
        >
          <Picker.Item label="Metric" value="metric" />
          <Picker.Item label="Imperial" value="imperial" />
        </Picker>
      </View>
      <View style={styles.settingContainer}>
        <Text>Language</Text>
        <Picker
          selectedValue={language}
          onValueChange={handleLanguageChange}
          style={styles.picker}
        >
          <Picker.Item label="English" value="en" />
          <Picker.Item label="Spanish" value="es" />
        </Picker>
      </View>
      {saveSuccess && (
        <Text style={styles.successMessage}>Preferences saved successfully!</Text>
      )}
      {saveError && (
        <Text style={styles.errorMessage}>Error saving preferences. Please try again.</Text>
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
  settingContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  picker: {
    width: 150,
  },
  successMessage: {
    color: 'green',
    textAlign: 'center',
    marginTop: 10,
  },
  errorMessage: {
    color: 'red',
    textAlign: 'center',
    marginTop: 10,
  },
});

export default UserSettingsScreen;
