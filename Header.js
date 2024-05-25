import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';
import logo from './assets/logo.webp';

const Header = () => {
  return (
    <View style={styles.header}>
      <Image source={logo} style={styles.logo} />
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    width: '100%',
    height: 110,
    paddingTop: 20,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#6666'
  },
  logo: {
    width: 85,
    height: 85,
    borderRadius: 40,
    marginBottom: 10,
  },
});

export default Header;