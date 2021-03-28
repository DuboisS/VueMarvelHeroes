<template>
  <div>
    <p>10 random heroes</p>
    <button @click="refresh">Refresh</button>
    <ul>
      <li v-for="character in characters" :key="character.id">
        <heroe :heroe="character"/>
      </li>
    </ul>
  </div>
</template>

<script>
import Heroe from '@/components/heroes/Heroe.vue';
import MarvelApiService from '@/services/MarvelApiService';

export default {
  name: 'RandomHeroes',
  data() {
    return {
      characters: [],
    };
  },
  components: {
    Heroe,
  },
  created() {
    this.fillCharacters();
  },
  methods: {
    async fillCharacters() {
      const characters = await MarvelApiService.findRandomCharacters();
      this.characters = [];
      characters.data.results.forEach((character) => {
        this.characters.push(character);
      });
    },
    refresh() {
      this.fillCharacters();
    },
  },
};
</script>
