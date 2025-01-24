import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  ScrollView,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
} from 'react-native';
import {useSelector} from 'react-redux';
import {RootState} from '../controller/store';
import {USERS} from '../utils/constants/mqttConstants';
import {getMqttClient} from '../utils/mqttClient';
import {sendMessage} from '../apis/chat/chat';

const CHAT_TOPIC = 'chat/6756cbb47b19daf3ef9e7048/messages';

function DummyChatScreen() {
  const [currentUser, setCurrentUser] = useState<'user1' | 'user2'>('user1');
  
  const [chatMessages, setChatMessages] = useState<{
    sender: string;
    message: string;
    timestamp: string;
  }[]>([]);
  const [message, setMessage] = useState<string>('');

  const isConnected = useSelector((state: RootState) => state.mqtt.isConnected);

  useEffect(() => {
    const mqttClient = getMqttClient();

    if (!mqttClient) {
      console.warn('MQTT client is not connected yet!');
      return;
    }

    const handleMessage = (topic: string, payload: Buffer) => {
      if (topic === CHAT_TOPIC) {
        const parsedMessage = JSON.parse(payload.toString());
        console.log('Message received:', parsedMessage);
        setChatMessages((prev) => [...prev, parsedMessage]);
      }
    };

    mqttClient.on('message', handleMessage);
    mqttClient.subscribe(CHAT_TOPIC, (err: any) => {
      if (err) {
        console.error('Subscription error:', err);
      } else {
        console.log(`Subscribed to topic: ${CHAT_TOPIC}`);
      }
    });

    return () => {
      mqttClient.unsubscribe(CHAT_TOPIC, (err: any) => {
        if (err) {
          console.error('Unsubscribe error:', err);
        } else {
          console.log(`Unsubscribed from topic: ${CHAT_TOPIC}`);
        }
      });
      mqttClient.removeListener('message', handleMessage);
    };
  }, [isConnected]);

  const handleSendMessage = async () => {
    if (!message.trim()) {
      Alert.alert('Error', 'Message cannot be empty');
      return;
    }

    const mqttClient = getMqttClient();
    if (!mqttClient) {
      Alert.alert('Error', 'MQTT client is not connected.');
      return;
    }

    const senderId = currentUser === 'user1' ? USERS.user1.id : USERS.user2.id;
    const recipientId =
      currentUser === 'user1' ? USERS.user2.id : USERS.user1.id;

    const chatId = '67580d19131bc22193b041d4';
    const content = message.trim();
    const media = null;

    const chatMessage = {
      sender: senderId,
      recipient: recipientId,
      message: content,
      timestamp: new Date().toISOString(),
    };

    mqttClient.publish(
      CHAT_TOPIC,
      JSON.stringify(chatMessage),
      {qos: 0},
      (err: any) => {
        if (err) {
          console.error('Publish error:', err);
        } else {
          console.log('Message published successfully:', chatMessage);

          setChatMessages((prev) => [...prev, chatMessage]);
          setMessage('');
        }
      },
    );

    try {
      const response = await sendMessage(chatId, senderId, content, media);
      console.log('Message sent successfully via API:', response.data);
    } catch (error: any) {
      console.error('Error during API call:', error);
    }
  };

  // Calculate recipient name based on current user
  const recipientName =
    currentUser === 'user1' ? USERS.user2.name : USERS.user1.name;

  return (
    <View style={styles.container}>
      {/* Chat Header */}
      <View style={styles.header}>
        <Text style={styles.headerText}>{recipientName}</Text>
      </View>

      {/* Chat Messages */}
      <ScrollView style={styles.chatContainer} contentContainerStyle={{paddingBottom: 10}}>
        {chatMessages.map((msg, index) => {
          const isCurrentUser =
            msg.sender ===
            (currentUser === 'user1' ? USERS.user1.id : USERS.user2.id);

          return (
            <View
              key={index}
              style={[
                styles.messageBubble,
                {
                  alignSelf: isCurrentUser ? 'flex-end' : 'flex-start',
                  backgroundColor: isCurrentUser ? '#007BFF' : '#f0f0f0',
                },
              ]}>
              <Text
                style={[
                  styles.messageText,
                  {color: isCurrentUser ? '#fff' : '#333'},
                ]}>
                {msg.message}
              </Text>
              <Text
                style={[
                  styles.messageTimestamp,
                  {color: isCurrentUser ? '#ccc' : '#555'},
                ]}>
                {new Date(msg.timestamp).toLocaleTimeString([], {
                  hour: '2-digit',
                  minute: '2-digit',
                })}
              </Text>
            </View>
          );
        })}
      </ScrollView>

      {/* Input Area */}
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.messageInput}
          placeholder="Type your message"
          placeholderTextColor="#aaa"
          value={message}
          onChangeText={setMessage}
        />
        <TouchableOpacity style={styles.sendButton} onPress={handleSendMessage}>
          <Text style={styles.sendButtonText}>Send</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    height: 60,
    backgroundColor: '#007BFF',
    justifyContent: 'center',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  headerText: {
    fontSize: 18,
    color: '#fff',
    fontWeight: 'bold',
  },
  chatContainer: {
    flex: 1,
    padding: 10,
  },
  messageBubble: {
    marginVertical: 5,
    padding: 10,
    borderRadius: 8,
    maxWidth: '70%',
  },
  messageText: {
    fontSize: 16,
  },
  messageTimestamp: {
    fontSize: 10,
    marginTop: 5,
    alignSelf: 'flex-end',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    borderTopWidth: 1,
    borderTopColor: '#ccc',
    backgroundColor: '#f9f9f9',
  },
  messageInput: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    padding: 10,
    marginRight: 10,
    backgroundColor: '#fff',
    color: '#333',
  },
  sendButton: {
    backgroundColor: '#007BFF',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 8,
  },
  sendButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default DummyChatScreen;
