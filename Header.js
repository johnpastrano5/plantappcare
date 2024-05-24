import { View, Text,  Image, StyleSheet } from 'react-native'
import React from 'react'
import TFs from './assets/TFs.png';

const Header = () => {
  return (
    <View style= {styles.header}>

        <Image source={TFs} style={styles.logoheader}/>
        <Text style={styles.HeaderTitle}>Team-Focused</Text>
    </View>
  )
}
const styles = StyleSheet.create({
    header: {
        width: '100%',
        height: 120,
        paddingTop: 20,
        alignItems: 'center',
        backgroundColor: '#f5f5f5',
    },
    logoheader: {
      width: 80,
      height: 80
    },
    HeaderTitle: {
      alignItems: 'center',
      justifyContent: 'center',
      fontWeight: 'bold',
        color: 'black', 
    }

   
  });

export default Header