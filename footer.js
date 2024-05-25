import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const Footer = () => {
  return (
    <View style={styles.footer}>
      <Text style={styles.text}>
        © 2024 Team-Focused. All rights reserved.
      </Text>
      <Text style={styles.text}>
        Founders: John Leo F. Pastrano, Beverly Jane L. Javier, Josephaul Pasco
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  footer: {
    backgroundColor: '#f5f5f5',
    paddingVertical: 10,
    alignItems: 'center',
  },
  text: {
    fontSize: 12,
    color: '#666',
    textAlign: 'center',
  },
});

export default Footer;