import React from 'react';
import { View, StyleSheet } from 'react-native';

type CommonHeaderProps = {
  leftContent?: React.ReactNode; 
  rightContent?: React.ReactNode; 
}

const CommonHeader: React.FC<CommonHeaderProps> = ({ leftContent, rightContent }) => {
  return (
    <View style={styles.header}>
      <View style={styles.leftSide}>
        {leftContent}
      </View>
      
      <View style={styles.rightSide}>
        {rightContent}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
    header: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      padding: 10,
    },
    leftSide: {
      flexDirection: 'row',
      alignItems: 'center',
    },
    rightSide: {
      flexDirection: 'row',
      alignItems: 'center',
    },
  });
  
export default CommonHeader;
