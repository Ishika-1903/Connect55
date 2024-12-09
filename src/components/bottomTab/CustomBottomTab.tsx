import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  FlatList,
  StyleSheet,
  ViewStyle,
  TextStyle,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {TCText} from '../text/CustomText';
import {Colors} from '../../utils/constants/colors';

type TabItem = {
  name?: string;
  icon: string;
  onPress: () => void;
  unreadCount?: number;
};

type CustomBottomTabProps = {
  tabs: TabItem[];
  style?: ViewStyle | TextStyle;
};

const CustomBottomTab: React.FC<CustomBottomTabProps> = ({
  tabs = [],
  style = {},
}) => {
  return (
    <View style={[styles.tabBar, style]}>
      <View style={styles.tabItemsContainer}>
        {tabs.map((item, index) => (
          <TouchableOpacity
            key={index}
            style={styles.tabItem}
            onPress={() => {
              item.onPress();
            }}>
            <View style={styles.iconContainer}>
              <Icon
                name={item.icon}
                size={30}
                color={Colors.darkBlue}
                style={[style]}
              />
              {item.unreadCount && item.unreadCount > 0 && (
                <View style={styles.badge}>
                  <Text style={styles.badgeText}>{item.unreadCount}</Text>
                </View>
              )}
            </View>
            <TCText
              style={[
                {fontSize: 12, color: Colors.darkBlue, marginTop: 4},
                style,
              ]}>
              {item.name}
            </TCText>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  tabBar: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    height: 60,
    backgroundColor: Colors.darkBlue, 
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    overflow: 'hidden',
  },
  tabItemsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    width: '100%',
  },
  tabItem: {
    alignItems: 'center',
    paddingVertical: 20,
  },
  iconContainer: {
    marginHorizontal:20,
    paddingHorizontal:10,
    paddingVertical:15,
  },
  badge: {
    position: 'absolute',
    top: -5,
    right: -20,
    backgroundColor: 'red',
    borderRadius: 10,
    height: 18,
    width: 18,
    justifyContent: 'center',
    alignItems: 'center',
  },
  badgeText: {
    color: 'white',
    fontSize: 10,
    fontWeight: 'bold',
  },
});


export default CustomBottomTab;
