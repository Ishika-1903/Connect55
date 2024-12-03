//shahaney.ishika@fiftyfivetech.io
export const validateEmail = (email: string): boolean => {
    const emailRegex = /^[a-zA-Z]+\.[a-zA-Z]+@fiftyfivetech\.io$/;
    return emailRegex.test(email);
  };

//atleast one uppercase,lowercase, number and one special character
export const validatePassword = (password: string): boolean => {
    const passwordRegex = /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{5,8}$/;
    return passwordRegex.test(password);
  };
