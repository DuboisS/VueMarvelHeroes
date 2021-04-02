<template>
  <div>
    <vs-row vs-align="flex-start" vs-type="flex" vs-justify="center" vs-w="12"
            style="margin-bottom: 50px;">
      <vs-col vs-lg="6" vs-sm="10" vs-xs="12">
        <vs-row vs-type="flex" vs-justify="space-between" vs-align="center" vs-w="12"
                style="margin: 10px 0;">
          <vs-col vs-type="flex" vs-justify="left" vs-align="center" vs-w="4">
            <h1>Heroes list</h1>
          </vs-col>
          <form action="">
            <vs-input size="small" type="text" placeholder="Searh by name or description..."
                      v-model="search"/>
          </form>
        </vs-row>
        <vs-card>
          <div>
            <vs-list>
              <router-link :to="{ name: 'HeroeDetails', params: { id: character.id }}" v-for="character in characters"
                           :key="character.id">
                <vs-list-item :title="character.name" vs-justify="left">
                  <template slot="avatar">
                    <vs-avatar size="large" :src="character.thumbnail.path + '.' + character.thumbnail.extension"
                               :height="50"/>
                  </template>
                </vs-list-item>
              </router-link>
            </vs-list>
          </div>
        </vs-card>
        <vs-row vs-align="stretch" vs-type="flex" vs-justify="stretch" vs-w="12">
          <vs-col vs-type="flex" vs-justify="center" vs-align="center" vs-w="4">{{ perPage }} results per page</vs-col>
          <vs-col vs-type="flex" vs-justify="center" vs-align="center" vs-w="4">
            <vs-button color="primary" type="filled" @click="prevPage" :disabled="currentPage <= 0"
                       style="margin-right: 10px">Previous
            </vs-button>
            {{ currentPage + 1 }} / {{ countPages }}<br>
            <vs-button color="primary" type="filled" @click="nextPage" :disabled="currentPage >= countPages - 1"
                       style="margin-left: 10px">Next
            </vs-button>
          </vs-col>
          <vs-col vs-type="flex" vs-justify="center" vs-align="center" vs-w="4">{{ totalResults }} results</vs-col>
        </vs-row>

      </vs-col>
    </vs-row>
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
