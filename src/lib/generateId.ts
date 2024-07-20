export const generateId = () => {
  const alphabets = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  const randomIndex = Math.floor(Math.random() * alphabets.length);
  const timestamp = Date.now();
  return `${alphabets[randomIndex]}${timestamp}`;
};
