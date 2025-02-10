export const CHAT_TOPIC = 'chat/+/messages';

export const validateEmail = (email: string): boolean => {
  const emailRegex = /^[a-zA-Z]+(\.[a-zA-Z]+)?@fiftyfivetech\.io$/;
  return emailRegex.test(email);
};

export const validatePassword = (password: string): boolean => {
  const passwordRegex =
    /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{5,8}$/;
  return passwordRegex.test(password);
};

export const getInitials = (name?: string): string => {
  if (!name) return '';

  const nameParts = name.trim().split(' ').filter(Boolean);

  if (nameParts.length > 1) {
    return nameParts[0][0].toUpperCase() + nameParts[1][0].toUpperCase();
  } else {
    return nameParts[0]?.[0]?.toUpperCase() || '';
  }
};

export const formatMessageTime = (timestamp: string) => {
  const messageDate = new Date(timestamp);
  const today = new Date();

  if (messageDate.toDateString() === today.toDateString()) {
    const hours = messageDate.getHours();
    const minutes = messageDate.getMinutes();
    return `${hours}:${minutes < 10 ? '0' + minutes : minutes}`;
  } else {
    return `${
      messageDate.getMonth() + 1
    }/${messageDate.getDate()}/${messageDate.getFullYear()}`;
  }
};

export const shuffleArray = (array: string[]) => {
  let shuffledArray = [...array];
  for (let i = shuffledArray.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffledArray[i], shuffledArray[j]] = [shuffledArray[j], shuffledArray[i]];
  }
  return shuffledArray;
};
