import axios from 'axios';

export const getDataFromUrl =  async (url) => {
  const article = await axios.get(`https://itchapage.herokuapp.com/itch?url=${url}`);

  if (!article) {
    return;
  }

  console.log(article);
};
