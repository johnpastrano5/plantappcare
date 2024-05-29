import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Text, TouchableOpacity, ScrollView, TextInput, Picker } from 'react-native';
import { Button, Snackbar, Appbar, Switch as PaperSwitch } from 'react-native-paper';
import { db, auth } from '../../firebaseConfig'; // Import Firebase config
import Icon from 'react-native-vector-icons/MaterialIcons';
import AsyncStorage from '@react-native-async-storage/async-storage';

const UserSettingsScreen = () => {
  const [notificationsEnabled, setNotificationsEnabled] = useState(false);
  const [unit, setUnit] = useState('metric');
  const [language, setLanguage] = useState('en');
  const [saveSuccess, setSaveSuccess] = useState(false);
  const [saveError, setSaveError] = useState(false);

  // Profile Management states
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [profilePicture, setProfilePicture] = useState('');

  // Change Password states
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  useEffect(() => {
    const loadUserProfile = async () => {
      try {
        const userDoc = await db.collection('users').doc(auth.currentUser.uid).get();
        if (userDoc.exists) {
          const userData = userDoc.data();
          setName(userData.name);
          setEmail(userData.email);
          setProfilePicture(userData.profilePicture);
        }
      } catch (error) {
        console.error('Error loading user profile:', error);
      }
    };

    loadUserProfile();
  }, []);

  const saveProfile = async () => {
    try {
      await db.collection('users').doc(auth.currentUser.uid).set({
        name,
        email,
        profilePicture,
      });
      setSaveSuccess(true);
    } catch (error) {
      setSaveError(true);
      console.error('Error saving profile:', error);
    }
  };

  const changePassword = async () => {
    try {
      if (newPassword !== confirmPassword) {
        throw new Error("New password and confirm password don't match");
      }
      await auth.currentUser.updatePassword(newPassword);
      setSaveSuccess(true);
    } catch (error) {
      setSaveError(true);
      console.error('Error changing password:', error.message);
    }
  };
  
  const saveSettings = async () => {
    try {
      await db.collection('settings').doc(auth.currentUser.uid).set({
        notificationsEnabled,
        unit,
        language,
      });
      setSaveSuccess(true);
    } catch (error) {
      setSaveError(true);
      console.error('Error saving settings:', error.message);
    }
  };
  

// Functions for app preferences section
const changeTheme = async (theme) => {
  try {
    // Save the selected theme to AsyncStorage
    await AsyncStorage.setItem('theme', theme);
    // Implement logic to apply the selected theme throughout the app
  } catch (error) {
    console.error('Error changing theme:', error.message);
  }
};

const changeFontSize = async (size) => {
  try {
    // Save the selected font size to AsyncStorage
    await AsyncStorage.setItem('fontSize', size.toString());
    // Implement logic to apply the selected font size throughout the app
  } catch (error) {
    console.error('Error changing font size:', error.message);
  }
};
// Functions for account management section
const manageLinkedAccounts = async () => {
  try {
    // Implement logic to manage linked accounts
    // For example, you can use Firebase Auth to link/unlink accounts
  } catch (error) {
    console.error('Error managing linked accounts:', error.message);
  }
};

const manageSubscriptionPlans = async () => {
  try {
    // Implement logic to manage subscription plans
    // For example, you can fetch subscription information from your backend server
  } catch (error) {
    console.error('Error managing subscription plans:', error.message);
  }
}

  const deleteAccount = async () => {
    try {
      await auth.currentUser.delete();
      // Optionally, navigate to a different screen after successful deletion
    } catch (error) {
      console.error('Error deleting account:', error);
    }
  };

  // Functions for support and feedback section
  const openHelpCenter = () => {
    // Implement logic to open help center
  };

  const contactSupport = () => {
    // Implement logic to contact support
  };

  const submitFeedback = (feedback) => {
    // Implement logic to submit feedback
  };

  return (
    <View style={styles.container}>
      <Appbar.Header>
        <Appbar.Content title="User Settings" />
      </Appbar.Header>
      
      <ScrollView style={styles.content}>
        <Text style={styles.sectionTitle}>Profile Management</Text>
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            placeholder="Name"
            value={name}
            onChangeText={(text) => setName(text)}
          />
          <TextInput
            style={styles.input}
            placeholder="Email"
            value={email}
            onChangeText={(text) => setEmail(text)}
          />
          <TouchableOpacity style={styles.profilePicContainer}>
            <Icon name="add-a-photo" size={24} color="#888" />
            <Text style={styles.profilePicText}>Change Profile Picture</Text>
          </TouchableOpacity>
          <Button mode="contained" onPress={saveProfile}>Save Profile</Button>
        </View>

        <Text style={styles.sectionTitle}>Change Password</Text>
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            placeholder="Current Password"
            secureTextEntry={true}
            value={currentPassword}
            onChangeText={(text) => setCurrentPassword(text)}
          />
          <TextInput
            style={styles.input}
            placeholder="New Password"
            secureTextEntry={true}
            value={newPassword}
            onChangeText={(text) => setNewPassword(text)}
          />
          <TextInput
            style={styles.input}
            placeholder="Confirm Password"
            secureTextEntry={true}
            value={confirmPassword}
            onChangeText={(text) => setConfirmPassword(text)}
          />
          <Button mode="contained" onPress={changePassword}>Change Password</Button>
        </View>

        <Text style={styles.sectionTitle}>Notification Preferences</Text>
        <View style={styles.settingContainer}>
          <Text style={styles.label}>Email Notifications</Text>
          <PaperSwitch
            value={notificationsEnabled}
            onValueChange={setNotificationsEnabled}
          />
        </View>

        <Text style={styles.sectionTitle}>Language and Region</Text>
        <View style={styles.settingContainer}>
          <Text style={styles.label}>Language</Text>
          <Picker
            selectedValue={language}
            onValueChange={setLanguage}
            style={styles.picker}
          >
            <Picker.Item label="English" value="en" />
            <Picker.Item label="Spanish" value="es" />
          </Picker>
        </View>
        <View style={styles.settingContainer}>
          <Text style={styles.label}>Measurement Units</Text>
          <Picker
            selectedValue={unit}
            onValueChange={setUnit}
            style={styles.picker}
          >
            <Picker.Item label="Metric" value="metric" />
            <Picker.Item label="Imperial" value="imperial" />
          </Picker>
        </View>

        {/* Other sections for app preferences, account management, support and feedback, and about */}
        
        <Text style={styles.sectionTitle}>App Preferences</Text>
        <TouchableOpacity style={styles.preferenceItem} onPress={() => changeTheme('light')}>
          <Text>Light Theme</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.preferenceItem} onPress={() => changeTheme('dark')}>
          <Text>Dark Theme</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.preferenceItem} onPress={() => changeTheme('system')}>
          <Text>System Default Theme</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.preferenceItem} onPress={() => changeFontSize('small')}>
          <Text>Small Font Size</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.preferenceItem} onPress={() => changeFontSize('medium')}>
          <Text>Medium Font Size</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.preferenceItem} onPress={() => changeFontSize('large')}>
          <Text>Large Font Size</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.preferenceItem} onPress={() => changeFontSize('x-large')}>
          <Text>Extra Large Font Size</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.preferenceItem} onPress={() => changeFontSize('xx-large')}>
          <Text>Extra Extra Large Font Size</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.preferenceItem} onPress={() => changeFontSize('xxx-large')}>
          <Text>Extra Extra Extra Large Font Size</Text>
        </TouchableOpacity>

        <Text style={styles.sectionTitle}>Account Management</Text>
        <TouchableOpacity style={styles.preferenceItem} onPress={manageLinkedAccounts}>
          <Text>Linked Accounts</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.preferenceItem} onPress={manageSubscriptionPlans}>
          <Text>Subscription Plans</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.preferenceItem} onPress={deleteAccount}>
          <Text>Delete Account</Text>
        </TouchableOpacity>

        <Text style={styles.sectionTitle}>Support and Feedback</Text>
        <TouchableOpacity style={styles.preferenceItem} onPress={openHelpCenter}>
          <Text>Help Center</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.preferenceItem} onPress={contactSupport}>
          <Text>Contact Support</Text>
        </TouchableOpacity>
        <TextInput
          style={[styles.input, styles.feedbackInput]}
          placeholder="Submit Feedback"
          multiline
          onChangeText={submitFeedback}
        />

        <Text style={styles.sectionTitle}>About</Text>
        <Text>App Version: 1.0.0</Text>
        <TouchableOpacity style={styles.preferenceItem}>
          <Text>Terms of Service</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.preferenceItem}>
          <Text>Privacy Policy</Text>
        </TouchableOpacity>
      </ScrollView>

      <Snackbar
        visible={saveSuccess}
        onDismiss={() => setSaveSuccess(false)}
        duration={3000}
      >
        Profile saved successfully!
      </Snackbar>

      <Snackbar
        visible={saveError}
        onDismiss={() => setSaveError(false)}
        duration={3000}
        style={styles.errorSnackbar}
      >
        Error saving profile. Please try again.
      </Snackbar>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    flex: 1,
    padding: 16,
    backgroundColor: '#f5f5f5',
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 16,
    marginBottom: 8,
  },
  inputContainer: {
    marginBottom: 24,
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 10,
    marginBottom: 16,
  },
  profilePicContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  profilePicText: {
    marginLeft: 8,
  },
  settingContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  label: {
    fontSize: 16,
    color: '#555',
  },
  picker: {
    width: 150,
  },
  errorSnackbar: {
    backgroundColor: 'red',
  },
  preferenceItem: {
    marginBottom: 12,
    paddingVertical: 8,
    paddingHorizontal: 16,
    backgroundColor: '#e0e0e0',
    borderRadius: 8,
  },
  feedbackInput: {
    height: 100,
  },
});

export default UserSettingsScreen;

