import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity, Linking } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';

const ContactUsScreen = () => {
  const contactMethods = [
    {
      label: 'Email: teamplantcare@gmail.com',
      icon: <FontAwesome name="envelope" size={30} color="#2e64e5" />,
      action: () => Linking.openURL('mailto:teamplantcare@gmail.com'),
    },
    {
      label: 'Phone: +63945612365',
      icon: <FontAwesome name="phone" size={30} color="#2e64e5" />,
      action: () => Linking.openURL('tel:+63945612365'),
    },
    {
      label: 'Website: www.teamplantcare.com',
      icon: <FontAwesome name="globe" size={30} color="#2e64e5" />,
      action: () => Linking.openURL('https://www.teamplantcare.com'),
    },
    {
      label: 'Facebook: PlantCareCompanion',
      icon: <FontAwesome name="facebook" size={30} color="#2e64e5" />,
      action: () => Linking.openURL('https://www.facebook.com/PlantCareCompanion'),
    },
    {
      label: 'Twitter: @PlantCareComp',
      icon: <FontAwesome name="twitter" size={30} color="#2e64e5" />,
      action: () => Linking.openURL('https://twitter.com/PlantCareComp'),
    },
    {
      label: 'Instagram: @PlantCareCompanion',
      icon: <FontAwesome name="instagram" size={30} color="#2e64e5" />,
      action: () => Linking.openURL('https://www.instagram.com/PlantCareCompanion'),
    },
  ];

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Contact Us</Text>
      <View style={styles.contactContainer}>
        {contactMethods.map((method, index) => (
          <TouchableOpacity key={index} style={styles.contactItem} onPress={method.action}>
            <View style={styles.iconContainer}>{method.icon}</View>
            <Text style={styles.label}>{method.label}</Text>
          </TouchableOpacity>
        ))}
      </View>
      <Text style={styles.subtitle}>We would love to hear from you!</Text>
      <Text style={styles.subtitle}>Send us your feedbacks!</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
    paddingVertical: 30,
    backgroundColor: '#f5f5f5',
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  contactContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    marginBottom: 40,
  },
  contactItem: {
    alignItems: 'center',
    marginBottom: 20,
    width: '45%', // Ensures two items per row on larger screens
    padding: 10,
  },
  iconContainer: {
    width: 60,
    height: 60,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 30,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: '#2e64e5',
  },
  label: {
    fontSize: 14,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 18,
    fontStyle: 'italic',
    textAlign: 'center',
  },
});

export default ContactUsScreen;
