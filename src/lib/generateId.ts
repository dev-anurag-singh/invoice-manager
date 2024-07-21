export const generateId = () => {
  const alphabets = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  const randomIndex = Math.floor(Math.random() * alphabets.length);
  const timestamp = Date.now().toString().slice(-5);
  return `${alphabets[randomIndex]}${timestamp}`;
};
