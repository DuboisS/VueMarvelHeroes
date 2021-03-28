<template>
  <div>
    <form action="">
      <input type="text" placeholder="Searh by name or description..." v-model="search">
    </form>
    <ul>
      <li v-for="character in characters" :key="character.id">
        <heroe :heroe="character"/>
      </li>
      {{ currentPage + 1 }} / {{ countPages }}<br>
      {{ perPage }} results per page<br>
      {{ totalResults }} results

      <button @click="prevPage" :disabled="currentPage <= 0">Previous</button>
      <button @click="nextPage" :disabled="currentPage >= countPages - 1">Next</button>
    </ul>
  </div>
</template>

<script>
import _ from 'lodash';
import Heroe from '@/components/heroes/Heroe.vue';
import MarvelApiService from '@/services/MarvelApiService';

export default {
  name: 'ListHeroes',
  data() {
    return {
      currentPage: 0,
      perPage: 20,
      totalResults: 0,
      characters: [],
      search: null,
    };
  },
  computed: {
    countPages() {
      return Math.ceil(this.totalResults / this.perPage);
    },
  },
  components: {
    Heroe,
  },
  created() {
    this.fillCharacters();
    this.debouncedGetSearchResult = _.debounce(this.getSearchResult, 350);
  },
  watch: {
    // When search field is updated
    search() {
      this.debouncedGetSearchResult();
    },
  },
  methods: {
    calculOffset() {
      return this.currentPage * this.perPage;
    },
    fillCharactersArray(characters) {
      this.characters = [];

      characters.data.results.forEach((character) => {
        this.characters.push(character);
      });

      this.totalResults = characters.data.total;
    },
    async fillCharacters(offset) {
      this.fillCharactersArray(await MarvelApiService.findAllCharacters(offset));
    },
    nextPage() {
      this.currentPage += 1;
      this.fillCharacters(this.calculOffset());
    },
    prevPage() {
      this.currentPage -= 1;
      this.fillCharacters(this.calculOffset());
    },
    async getSearchResult() {
      if (this.search === '') {
        return this.fillCharacters();
      }

      return this.fillCharactersArray(await MarvelApiService.findCharacterByName(this.search));
    },
  },
};
</script>
