<template>
  <div>
    <form action="">
      <input type="search" placeholder="Searh by name or description..." @keyup="search(value)">
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
  },
  methods: {
    calculOffset() {
      return this.currentPage * this.perPage;
    },
    async fillCharacters(offset) {
      const characters = await MarvelApiService.findAllCharacters(offset);
      this.characters = [];
      characters.data.results.forEach((character) => {
        this.characters.push(character);
      });

      this.totalResults = characters.data.total;
    },
    nextPage() {
      this.currentPage += 1;
      this.fillCharacters(this.calculOffset());
    },
    prevPage() {
      this.currentPage -= 1;
      this.fillCharacters(this.calculOffset());
    },
    search(value) {
      console.log(value);
    },
  },
};
</script>
