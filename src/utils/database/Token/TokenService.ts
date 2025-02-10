import Realm from 'realm';

import TokenModel from './TokenModel';
import UserModel from '../User/UserModel';
import {ChatModel, MessageModel, ParticipantModel} from '../Chat/ChatListModel';

class TokenService {
  private realm: Realm;

  constructor() {
    this.realm = new Realm({
      schema: [
        TokenModel,
        UserModel,
        ChatModel,
        ParticipantModel,
        MessageModel,
      ],
      schemaVersion: 13,
      // onMigration: (oldRealm, newRealm) => {
      //   if (oldRealm.schemaVersion < 2) {
      //     const oldObjects = oldRealm.objects('User');
      //     const newObjects = newRealm.objects('User');

      //     for (let i = 0; i < oldObjects.length; i++) {
      //       const oldObject = oldObjects[i];
      //       const newObject = newObjects[i];

      //       newObject.token = oldObject.token || `unique_token_${i}`;
      //     }
      //   }
      // },
    });
  }

  addToken(token: string, FCMToken: (string | null)[]) {
    try {
      this.realm.write(() => {
        this.realm.create('Token', {token, FCMToken});
      });
      return {
        success: true,
        message: `token saved successfully, token  :${token} ,FCM Token :  ${FCMToken}`,
      };
    } catch (error) {
      return {success: false, message: 'Error saving user data', error};
    }
  }

  getAllTokens() {
    return this.realm.objects('Token');
  }

  addUser(
    name: string,
    bio: string,
    designation: string,
    department: string,
    workLocation: string,
    skills: string[],
  ) {
    try {
      this.realm.write(() => {
        this.realm.create('User', {
          name,
          bio,
          designation,
          department,
          workLocation,
          skills,
        });
      });
      return {
        success: true,
        message: `User profile saved successfully, name  :${name} ,bio :  ${bio}, designation  :${designation} ,department :  ${department}, workLocation  :${workLocation} ,skills :  ${skills}`,
      };
    } catch (error) {
      return {success: false, message: 'Error saving user data', error};
    }
  }

  getAllUsers() {
    return this.realm.objects('User');
  }

  addChat(chatsData: any) {
    try {
      this.realm.write(() => {
        chatsData.forEach((chatData: any) => {
          this.realm.create(
            'Chat',
            {
              _id: chatData._id,
              type: chatData.type,
              groupName: chatData.groupName || null,
              pinned: chatData.pinned,
              participants: chatData.participants.map((participant: any) =>
                this.realm.create(
                  'Participant',
                  {
                    userId: participant.userId,
                    email: participant.email,
                    name: participant.name,
                    bio: participant.bio,
                    designation: participant.designation,
                    department: participant.department,
                    skills: participant.skills,
                    workLocation: participant.workLocation,
                    profilePicture: participant.profilePicture,
                    deviceTokens: participant.deviceTokens,
                    role: participant.role,
                  },
                  Realm.UpdateMode.Modified,
                ),
              ),
              groupAdmin: chatData.groupAdmin || [],
              groupIcon: chatData.groupIcon || null,
              messages: chatData.messages.map((message: any) =>
                this.realm.create(
                  'Message',
                  {
                    senderId: message.senderId,
                    content: message.content || '',
                    media: message.media || null,
                    timestamp: new Date(message.timestamp),
                    seenBy: message.seenBy || [],
                    messageId: message.messageId,
                  },
                  Realm.UpdateMode.Modified,
                ),
              ),
            },
            Realm.UpdateMode.Modified,
          );
        });
      });
      return {success: true, message: 'Chat data saved successfully'};
    } catch (error) {
      return {success: false, message: 'Error saving chat data', error};
    }
  }

  getAllChats() {
    return this.realm.objects('Chat');
  }

  addMessage(chatId: string, messageData: any) {
    try {
      this.realm.write(() => {
        let chat = this.realm.objectForPrimaryKey('Chat', chatId);
    
        if (!chat) {
          throw new Error('Chat not found');
        }

        messageData.forEach((msg: any) => {
          const existingMessage = this.realm.objectForPrimaryKey(
            'Message',
            msg.messageId,
          );
          if (existingMessage) {
            console.log(
              `Message with ID ${msg.messageId} already exists. Skipping.`,
            );
            return;
          }
          const newMessage = {
            messageId: msg.messageId,
            senderId: msg.senderId || '',
            content: msg.content || '',
            media: msg.media || null,
            timestamp: new Date(msg.timestamp),
            seenBy: Array.isArray(msg.seenBy) ? msg.seenBy : [],
          };

          this.realm.create('Message', newMessage, Realm.UpdateMode.Modified);

          // chat.messages.push(newMessage);
        });
      });

      return {success: true, message: 'Message added successfully'};
    } catch (error) {
      return {success: false, message: 'Error adding message', error};
    }
  }

  getAllMessages(chatId: string) {
    const chat = this.realm.objectForPrimaryKey('Chat', chatId);
    if (chat) {
      console.log('All messages in chat:', chat.messages); 
      return chat.messages;
    } else {
      console.log('Chat not found');
      return [];
    }
  }
}

export default new TokenService();
