import React, { useState } from 'react';
import { View, StyleSheet, Alert } from 'react-native';
import { TextInput, Button } from 'react-native-paper';
import { getAuth, sendPasswordResetEmail } from 'firebase/auth';

const AccountRecovery = ({ navigation }) => {
  const [email, setEmail] = useState('');

  const handleRecoverAccount = async () => {
    const auth = getAuth();
    try {
      await sendPasswordResetEmail(auth, email);
      Alert.alert('Password Reset', 'Password reset email sent successfully!');
      navigation.navigate('Login');
    } catch (error) {
      Alert.alert('Error', error.message);
    }
  };

  return (
    <View style={styles.content}>
      <TextInput
        label='Email'
        value={email}
        onChangeText={setEmail}
        style={styles.textInput}
        mode='outlined'
        keyboardType='email-address'
        autoCapitalize='none'
      />
      <View style={styles.buttonsContainer}>
        <Button
          icon="arrow-left"
          mode="outlined"
          onPress={() => navigation.navigate('Login')}
          style={[styles.button, styles.backButton]}
          labelStyle={styles.buttonLabel}
        >
          Back to Login
        </Button>
        <Button
          icon="account-check-outline"
          mode="contained"
          onPress={handleRecoverAccount}
          style={[styles.button, styles.recoverButton]}
          labelStyle={styles.buttonLabel}
        >
          Recover Account
        </Button>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  content: {
    flex: 1,
    padding: 10,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#f5f5f5',
  },
  textInput: {
    marginTop: 20,
    width: '80%',
    backgroundColor: '#fff',
  },
  buttonsContainer: {
    width: '80%',
    marginTop: 20,
    alignItems: 'center',
  },
  button: {
    paddingVertical: 10,
    borderRadius: 8,
    marginBottom: 10,
    width: '100%',
  },
  backButton: {
    borderColor: '#007bff',
    borderWidth: 1,
    backgroundColor: '#81B622',
  },
  recoverButton: {
    marginTop: 10,
    backgroundColor: '#94C973',
  },
  buttonLabel: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#fff',
  },
});

export default AccountRecovery;
