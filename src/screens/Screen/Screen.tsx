import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  Alert,
  FlatList,
} from 'react-native';
import Draggable from 'react-native-draggable';

const Screen = () => {
  const [step, setStep] = useState(1);
  const [gender, setGender] = useState('');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [phoneNumber, setPhoneNumber] = useState(Array(10).fill(0));
  const [draggedItems, setDraggedItems] = useState('');

  // Handle email drag-and-drop
  const handleDrop = (item) => {
    setDraggedItems((prev) => prev + item);
  };

  // Step 1: Maze-Based Gender Selection
  const renderUI1 = () => (
    <View style={styles.container}>
      <Text style={styles.title}>Navigate the Maze to Choose Your Gender</Text>
      <View style={styles.mazeContainer}>
        {/* Replace this with maze logic */}
        <TouchableOpacity style={styles.mazeButton} onPress={() => setGender('Male')}>
          <Text style={styles.mazeButtonText}>Male</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.mazeButton} onPress={() => setGender('Female')}>
          <Text style={styles.mazeButtonText}>Female</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.mazeButton} onPress={() => setGender('Other')}>
          <Text style={styles.mazeButtonText}>Other</Text>
        </TouchableOpacity>
      </View>
      <TouchableOpacity
        style={styles.nextButton}
        onPress={() => {
          if (gender) {
            setStep(2);
          } else {
            Alert.alert('Please select a gender to continue');
          }
        }}
      >
        <Text style={styles.nextButtonText}>Next</Text>
      </TouchableOpacity>
    </View>
  );

  // Step 2: Name Input (Combo Box + Button)
  const renderUI2 = () => (
    <View style={styles.container}>
      <Text style={styles.title}>Enter Your Name</Text>
      <TextInput
        style={styles.input}
        value={name}
        onChangeText={(text) => setName(text)}
        placeholder="Enter Name"
      />
      <TouchableOpacity
        style={styles.nextButton}
        onPress={() => {
          if (name.trim()) {
            setStep(3);
          } else {
            Alert.alert('Name cannot be empty');
          }
        }}
      >
        <Text style={styles.nextButtonText}>Next</Text>
      </TouchableOpacity>
    </View>
  );

  // Step 3: Drag-and-Drop Email
  const renderUI3 = () => (
    <View style={styles.container}>
      <Text style={styles.title}>Drag and Drop to Enter Your Email</Text>
      <FlatList
        data={['a', 'b', 'c', '@', '.', '1', '2', '3']}
        renderItem={({ item }) => (
          <Draggable
            x={Math.random() * 300}
            y={Math.random() * 500}
            renderSize={50}
            renderColor="blue"
            renderText={item}
            isCircle
            onShortPressRelease={() => handleDrop(item)}
          />
        )}
        keyExtractor={(item, index) => index.toString()}
      />
      <Text style={styles.draggedText}>Email: {draggedItems}</Text>
      <TouchableOpacity
        style={styles.nextButton}
        onPress={() => {
          if (draggedItems.includes('@') && draggedItems.includes('.')) {
            setEmail(draggedItems);
            setStep(4);
          } else {
            Alert.alert('Invalid email format');
          }
        }}
      >
        <Text style={styles.nextButtonText}>Next</Text>
      </TouchableOpacity>
    </View>
  );

  // Step 4: Keyboard Memory Game (Password)
  const renderUI4 = () => {
    const [keys, setKeys] = useState(
      'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*'.split('')
    );

    const handleKeyPress = (key) => {
      setPassword((prev) => prev + key);
      setKeys(keys.filter((k) => k !== key));
    };

    return (
      <View style={styles.container}>
        <Text style={styles.title}>Enter Your Password</Text>
        <View style={styles.keyboard}>
          {keys.map((key, index) => (
            <TouchableOpacity
              key={index}
              style={styles.key}
              onPress={() => handleKeyPress(key)}
            >
              <Text style={styles.keyText}>{key}</Text>
            </TouchableOpacity>
          ))}
        </View>
        <TouchableOpacity
          style={styles.nextButton}
          onPress={() => {
            if (password.length >= 6) {
              setStep(5);
            } else {
              Alert.alert('Password must be at least 6 characters long');
            }
          }}
        >
          <Text style={styles.nextButtonText}>Next</Text>
        </TouchableOpacity>
      </View>
    );
  };

  // Step 5: Suitcase Lock Phone Number
  const renderUI5 = () => (
    <View style={styles.container}>
      <Text style={styles.title}>Enter Your Phone Number</Text>
      <View style={styles.lockContainer}>
        {phoneNumber.map((digit, index) => (
          <View key={index} style={styles.slot}>
            <Text style={styles.lockText}>{digit}</Text>
            <TouchableOpacity
              style={styles.incrementButton}
              onPress={() => {
                const updatedPhoneNumber = [...phoneNumber];
                updatedPhoneNumber[index] = (updatedPhoneNumber[index] + 1) % 10;
                setPhoneNumber(updatedPhoneNumber);
              }}
            >
              <Text style={styles.incrementButtonText}>+</Text>
            </TouchableOpacity>
          </View>
        ))}
      </View>
      <TouchableOpacity
        style={styles.nextButton}
        onPress={() => setStep(6)}
      >
        <Text style={styles.nextButtonText}>Next</Text>
      </TouchableOpacity>
    </View>
  );

  // Step 6: Review and Submit
  const renderReview = () => (
    <View style={styles.container}>
      <Text style={styles.title}>Review Your Information</Text>
      <Text>Gender: {gender}</Text>
      <Text>Name: {name}</Text>
      <Text>Email: {email}</Text>
      <Text>Password: {password.replace(/./g, '*')}</Text>
      <Text>Phone: {phoneNumber.join('')}</Text>
      <TouchableOpacity
        style={styles.submitButton}
        onPress={() => Alert.alert('Signup Successful')}
      >
        <Text style={styles.nextButtonText}>Submit</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={styles.container}>
      {step === 1 && renderUI1()}
      {step === 2 && renderUI2()}
      {step === 3 && renderUI3()}
      {step === 4 && renderUI4()}
      {step === 5 && renderUI5()}
      {step === 6 && renderReview()}
    </View>
  );
};
const styles = StyleSheet.create({
    container: {
      flex: 1,
      padding: 20,
      backgroundColor: '#ffffff', 
      justifyContent: 'center',
      alignItems: 'center',
    },
    title: {
      fontSize: 28,
      fontWeight: 'bold',
      color: '#333333',
      textAlign: 'center',
      marginBottom: 30,
    },
    input: {
      width: '90%',
      borderWidth: 1,
      borderColor: '#cccccc',
      borderRadius: 8,
      padding: 15,
      fontSize: 16,
      backgroundColor: '#f5f5f5',
      marginBottom: 20,
    },
    nextButton: {
      backgroundColor: '#007BFF',
      paddingVertical: 12,
      paddingHorizontal: 20,
      borderRadius: 25,
      alignItems: 'center',
      marginTop: 20,
      width: '50%',
    },
    submitButton: {
      backgroundColor: '#28a745',
      paddingVertical: 12,
      paddingHorizontal: 20,
      borderRadius: 25,
      alignItems: 'center',
      marginTop: 20,
      width: '50%',
    },
    nextButtonText: {
      color: '#ffffff',
      fontWeight: 'bold',
      fontSize: 16,
    },
    keyboard: {
      flexDirection: 'row',
      flexWrap: 'wrap',
      justifyContent: 'center',
      padding: 10,
    },
    key: {
      margin: 8,
      padding: 15,
      backgroundColor: '#007BFF',
      borderRadius: 8,
      width: 50,
      height: 50,
      justifyContent: 'center',
      alignItems: 'center',
    },
    keyText: {
      color: '#ffffff',
      fontSize: 16,
      fontWeight: 'bold',
    },
    lockContainer: {
      flexDirection: 'row',
      justifyContent: 'space-around',
      alignItems: 'center',
      marginVertical: 20,
    },
    slot: {
      alignItems: 'center',
      marginHorizontal: 10,
    },
    incrementButton: {
      backgroundColor: '#ffc107',
      padding: 5,
      borderRadius: 20,
      marginTop: 5,
    },
    incrementButtonText: {
      color: '#ffffff',
      fontSize: 18,
      fontWeight: 'bold',
    },
    mazeButton: {
      backgroundColor: '#17a2b8',
      paddingVertical: 15,
      paddingHorizontal: 20,
      borderRadius: 10,
      marginBottom: 15,
      width: '70%',
      alignItems: 'center',
    },
    mazeButtonText: {
      color: '#ffffff',
      fontSize: 16,
      fontWeight: '600',
    },
    draggedText:{
        color:'black'
    }
  });
  

export default Screen;