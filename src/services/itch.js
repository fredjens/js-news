import axios from 'axios';

export const getDataFromUrl =  async (url) => {
  try {
    const article = await axios.get(`https://itchapage.herokuapp.com/itch?url=${url}`);

    if (!article) {
      return;
    }

    console.log(article);

    return article;
  } catch (err) {
    console.log(err);
    return err;
  }
};
