import React from 'react';
import { View, Text, Image, StyleSheet, Dimensions } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { Card } from 'react-native-paper';

const AboutScreen = () => {
  const teamMembers = [
    {
      fullName: 'John Leo F. Pastrano',
      role: 'System Developer',
      image: require('../../assets/john.jpg'), // Replace with the actual image path
    },
    {
      fullName: 'Beverly Jane L. Javier',
      role: 'UI/UX Designer',
      image: require('../../assets/bev.jpg'), // Replace with the actual image path
    },
    {
      fullName: 'Pheona Fabro',
      role: 'Backend Developer',
      image: require('../../assets/pheo.jpg'),
    },
    {
      fullName: 'Loraine Kate A. Baslao',
      role: 'Frontend Developer',
      image: require('../../assets/lor.jpg'),
    },
    {
      fullName: 'Cherami D. Perocho',
      role: 'Mobile Developer',
      image: require('../../assets/che.jpg'),
    },
    {
      fullName: 'Jerlyn Tagopa',
      role: 'Graphic Designer',
      image: require('../../assets/jer.jpg'),
    },
  ];

  return (
    <ScrollView contentContainerStyle={styles.scrollView}>
      <View style={styles.container}>
        <Text style={styles.title}>About Us</Text>
        <View style={styles.teamContainer}>
          {teamMembers.map((member, index) => (
            <Card key={index} style={styles.card}>
              <View style={styles.memberContainer}>
                <Image source={member.image} style={styles.image} />
                <Text style={styles.fullName}>{member.fullName}</Text>
                <Text style={styles.role}>{member.role}</Text>
              </View>
            </Card>
          ))}
        </View>
        <Text style={styles.title}>About Our Application</Text>
        <Text style={styles.description}>
          The PlantCare Companion is a user-friendly mobile application
          designed to be a comprehensive guide for plant enthusiasts. It offers a plant list with names
          and images, detailed plant information including care instructions and tips, customizable plant care reminders,
          a notes and photos feature for tracking progress, a search function for easy access to specific plants,
          offline access to cached information, customizable user settings, and a simple and intuitive user interface.
          With these features, the PlantCare Companion provides plant lovers with all the tools they need to care for
          their plants effectively and conveniently in one app.
        </Text>
      </View>
    </ScrollView>
  );
};

const { width } = Dimensions.get('window');

const styles = StyleSheet.create({
  scrollView: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  container: {
    flex: 1,
    width: '100%',
    maxWidth: 1200,
    paddingVertical: 30,
    paddingHorizontal: 20,
    backgroundColor: '#f5f5f5',
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  teamContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    width: '100%',
  },
  card: {
    width: '45%',
    marginBottom: 20,
  },
  memberContainer: {
    alignItems: 'center',
    padding: 10,
  },
  image: {
    width: 150,
    height: 150,
    borderRadius: '50%',
    marginBottom: 10,
  },
  fullName: {
    fontSize: 14,
    fontWeight: 'bold',
    marginBottom: 5,
    textAlign: 'center',
  },
  role: {
    fontSize: 12,
    color: '#888',
    fontStyle: 'italic',
    textAlign: 'center',
  },
  description: {
    fontSize: 14,
    textAlign: 'center',
    marginVertical: 20,
  },
});

export default AboutScreen;
