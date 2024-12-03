
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { TCText } from '../components/text/CustomText';

const AboutScreen = () => {
  return (
    <View style={styles.container}>
      <TCText style={styles.text}>Connect55</TCText>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#002D62',
  },
  text: {
    fontSize: 40,
    fontWeight: 'bold',
    color: 'white',
  },
});

export default AboutScreen;
