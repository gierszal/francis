const generateImage = () => {
  const max = 4; // номер картинки
  const min = 1;
  const num = Math.floor(Math.random() * (max - min + min + 1)) + min;
  const img = `/playlists/${num}.jpg`;
  return img;
};
export default generateImage;
