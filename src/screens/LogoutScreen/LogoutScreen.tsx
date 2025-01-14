import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {Colors} from '../../utils/constants/colors';
import {TCText} from '../../components/text/CustomText';
import { useSelector } from 'react-redux';
import { RootState } from '../../controller/store';

const LogoutScreen: React.FC = () => {

  return (
    <View style={styles.container}>
      <TCText style={styles.text}>Logout Screen</TCText>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'pink',
  },
  text: {
    color: Colors.black,
    textAlign: 'center',
    fontSize: 20,
    marginHorizontal: 20,
    marginVertical: 20,
  },
});

export default LogoutScreen;
