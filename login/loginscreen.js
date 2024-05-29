import React, { useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { TextInput, Button } from 'react-native-paper';
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';


const LoginScreen = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleNavigateToRegister = () => {
    navigation.navigate('Register');
  };

  const handleNavigateToAccountRecovery = () => {
    navigation.navigate('AccountRecovery');
  };

  const handleLogin = async () => {
    try {
      const auth = getAuth();
      await signInWithEmailAndPassword(auth, email, password);
      console.log('User signed in successfully!');
    } catch (error) {
      console.error('Authentication error:', error.message);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Login</Text>
      <View style={styles.inputContainer}>
        <TextInput
          label="Email"
          value={email}
          onChangeText={setEmail}
          autoCapitalize="none"
          style={styles.input}
        />
        <TextInput
          label="Password"
          value={password}
          onChangeText={setPassword}
          secureTextEntry
          style={styles.input}
        />
      </View>
      <Button mode="contained" onPress={handleLogin} style={styles.button}>
        Login
      </Button>
      <View style={styles.bottomContainer}>
        <Button mode="text" onPress={handleNavigateToAccountRecovery} style={styles.linkButton}>
          Forget Password
        </Button>
        <Text style={styles.bottomText}>Don't have an account?</Text>
        <Button mode="text" onPress={handleNavigateToRegister} style={styles.linkButton}>
          Create an Account
        </Button>
       
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
    backgroundColor: '#f5f5f5',
  },
  title: {
    fontSize: 28,
    marginBottom: 24,
    color: '#333',
  },
  inputContainer: {
    width: '80%',
    marginBottom: 24,
  },
  input: {
    marginBottom: 16,
    backgroundColor: '#fff',
  },
  button: {
    width: '80%',
    paddingVertical: 8,
    borderRadius: 8,
  },
  bottomContainer: {
    marginTop: 20,
    alignItems: 'center',
  },
  bottomText: {
    fontSize: 16,
    marginBottom: 8,
  },
  linkButton: {
    color: '#007bff',
  },
});

export default LoginScreen;
