export const generateId = () => {
  const alphabets = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  const randomIndex = Math.floor(Math.random() * 10);
  const timestamp = Date.now();
  return `${alphabets[randomIndex]}${timestamp}`;
};
