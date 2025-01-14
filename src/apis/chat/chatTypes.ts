type CreateChatRequest = {
    type: string;
    groupName: string;
    participants: string[]; 
    adminId: string;
    groupIcon: {
        uri: string;
        name: string;
        type: string;
        size: number;
      } | null,
}