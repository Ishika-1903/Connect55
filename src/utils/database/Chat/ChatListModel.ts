import Realm from "realm";

class MessageModel extends Realm.Object<MessageModel> {
  senderId!: string;
  content!: string;
  media?: string | null;
  timestamp!: Date;
  seenBy!: string[];
  messageId!: string;

  static schema: Realm.ObjectSchema = {
    name: "Message",
    primaryKey: "messageId",
    properties: {
      senderId: "string",
      content: "string",
      media: "string?",
      timestamp: "date",
      seenBy: "string[]",
      messageId: "string",
    },
  };
}

// Define the Participant schema
class ParticipantModel extends Realm.Object<ParticipantModel> {
  userId!: string;
  //authtoken missing
  email!: string;
  name!: string;
  bio?: string | null;
  designation?: string | null;
  department?: string | null;
  skills!: string[];
  workLocation?: string | null;
  profilePicture?: string | null;
  deviceTokens!: string[];
  role!: string;

  static schema: Realm.ObjectSchema = {
    name: "Participant",
    primaryKey: "userId",
    properties: {
      userId: "string",
      email: "string",
      name: "string",
      bio: "string?",
      designation: "string?",
      department: "string?",
      skills: "string[]",
      workLocation: "string?",
      profilePicture: "string?",
      deviceTokens: "string[]",
      role: "string",
    },
  };
}

// Define the Chat schema
class ChatModel extends Realm.Object<ChatModel> {
  _id!: string;
  type!: string;
  groupName?: string | null;
  pinned!: boolean;
  participants!: Realm.List<ParticipantModel>;
  groupAdmin!: string[];
  groupIcon?: string | null;
  messages!: Realm.List<MessageModel>;

  static schema: Realm.ObjectSchema = {
    name: "Chat",
    primaryKey: "_id",
    properties: {
      _id: "string",
      type: "string",
      groupName: "string?",
      pinned: "bool",
      participants: "Participant[]",
      groupAdmin: "string[]",
      groupIcon: "string?",
      messages: "Message[]",
    },
  };
}

export { ChatModel, ParticipantModel, MessageModel };