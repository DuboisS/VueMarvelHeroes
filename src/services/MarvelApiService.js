const MARVEL_API = process.env.VUE_APP_MARVEL_API;
const MARVEL_API_PUBLIC_KEY = process.env.VUE_APP_MARVEL_API_PUBLIC_KEY;
const MARVEL_API_PRIVATE_KEY = process.env.VUE_APP_MARVEL_API_PRIVATE_KEY;

export default {
  async findAllCharacters(offset = 0) {
    return fetch(`${MARVEL_API}/characters?orderBy=name&offset=${offset}&apikey=${MARVEL_API_PUBLIC_KEY}&hash=${MARVEL_API_PRIVATE_KEY}`)
      .then((response) => response.json())
      .catch((err) => console.log(err));
  },
};
