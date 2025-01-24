export const validateEmail = (email: string): boolean => {
  const emailRegex = /^[a-zA-Z]+(\.[a-zA-Z]+)?@fiftyfivetech\.io$/;
  return emailRegex.test(email);
};

export const validatePassword = (password: string): boolean => {
  const passwordRegex =
    /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{5,8}$/;
  return passwordRegex.test(password);
};

export const getInitials = (name: string): string => {
  const nameParts = name.split(' ');

  if (nameParts.length > 1) {
    return nameParts[0][0].toUpperCase() + nameParts[1][0].toUpperCase();
  } else {
    return name[0].toUpperCase();
  }
};
