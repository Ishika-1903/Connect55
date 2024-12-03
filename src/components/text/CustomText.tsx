import React from 'react';
import {Text} from 'react-native';

export const TCText: React.FC<{
  children: any;
  fontWeight?: string;
  fontSize?: number;
  color?: string;
  style?: object;
  fontFamily?: string;
}> = ({
  children,
  fontWeight,
  fontSize,
  color,
  style,
  fontFamily = 'Poppins-Medium',
  ...props
}) => {
  return (
    <Text {...props} style={[{fontWeight, fontSize, color, fontFamily}, style]}>
      {children}
    </Text>
  );
};
