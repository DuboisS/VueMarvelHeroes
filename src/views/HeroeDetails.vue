<template>
  <div>
    <div v-if="!loading">
      <h1>{{ character.name }}</h1>
      <img :src="character.thumbnail.path + '.' + character.thumbnail.extension" :height="300">
      <p v-if="character.description">{{ character.description }}</p>
      <p v-else>Sorry, no description available for this hero.</p>

      <h2>Comics</h2>
      <p>
        The first comic is {{ firstComic.title }}
        ({{ firstComic.dates[0].date | formatStringDate }}) and the lastest {{ lastComic.title }}
        ({{ lastComic.dates[0].date | formatStringDate }})
      </p>
    </div>
  </div>
</template>

<script>
import MarvelApiService from '@/services/MarvelApiService';

export default {
  name: 'HeroeDetails',
  data() {
    return {
      loading: true,
      character: null,
      firstComic: null,
      lastComic: null,
    };
  },
  created() {
    this.fillCharacter(this.$route.params.id);
  },
  computed: {
    thumbnailCharacter() {
      if (!this.loading) {
        return '';
      }
      return `${this.character.thumbnail.path}.${this.character.thumbnail.extension}`;
    },
  },
  methods: {
    async getFirstComic() {
      return MarvelApiService.findFirstComicByCharacter(this.character);
    },
    async getLastComic() {
      return MarvelApiService.findLastComicByCharacter(this.character);
    },
    async fillCharacter(id) {
      const character = await MarvelApiService.findCharacterById(id);
      this.character = character.data.results[0];

      const firstComic = await this.getFirstComic(this.character);
      this.firstComic = firstComic.data.results[0];

      const lastComic = await this.getLastComic(this.character);
      this.lastComic = lastComic.data.results[0];

      this.loading = false;
    },
  },
};
</script>
