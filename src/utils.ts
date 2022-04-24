export const isEmail = (email: string) => {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
};

export const isPasswordValid = (password: string) => {
  return password.length >= 8;
};
