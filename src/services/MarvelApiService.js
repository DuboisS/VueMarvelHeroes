import MathService from './MathService';

const MARVEL_API = process.env.VUE_APP_MARVEL_API;
const MARVEL_API_PUBLIC_KEY = process.env.VUE_APP_MARVEL_API_PUBLIC_KEY;
const MARVEL_API_PRIVATE_KEY = process.env.VUE_APP_MARVEL_API_PRIVATE_KEY;

const params = new URLSearchParams({
  apikey: MARVEL_API_PUBLIC_KEY,
  hash: MARVEL_API_PRIVATE_KEY,
});

/**
 * Reusable HTTP requests to the marvel API endpoint
 */
export default {
  async findAllCharacters(offset = 0) {
    return fetch(`${MARVEL_API}/characters?${params.toString()}&orderBy=name&offset=${offset}`)
      .then((response) => response.json())
      .catch((err) => console.log(err));
  },
  async findCharacterById(id) {
    return fetch(`${MARVEL_API}/characters/${id}?${params.toString()}`)
      .then((response) => response.json())
      .catch((err) => console.log(err));
  },
  async findRandomCharacters(limit = 10) {
    const totalCharacters = 1493;
    const offset = MathService.getRandomInt(0, totalCharacters - limit);

    return fetch(`${MARVEL_API}/characters?${params.toString()}&orderBy=modified&offset=${offset}&limit=${limit}`)
      .then((response) => response.json())
      .catch((err) => console.log(err));
  },
  async findCharacterByName(name) {
    return fetch(`${MARVEL_API}/characters?${params.toString()}&orderBy=name&nameStartsWith=${name}`)
      .then((response) => response.json())
      .catch((err) => console.log(err));
  },
  async findFirstComicByCharacter(character) {
    return fetch(`${MARVEL_API}/characters/${character.id}/comics?${params.toString()}&orderBy=focDate&limit=1`)
      .then((response) => response.json())
      .catch((err) => console.log(err));
  },
  async findLastComicByCharacter(character) {
    return fetch(`${MARVEL_API}/characters/${character.id}/comics?${params.toString()}&orderBy=-focDate&limit=1`)
      .then((response) => response.json())
      .catch((err) => console.log(err));
  },
};
