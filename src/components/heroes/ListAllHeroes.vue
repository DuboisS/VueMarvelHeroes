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
              <heroe v-for="character in characters" :key="character.id" :heroe="character"></heroe>
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
    /**
     * Calcul pages number based on totalResults and perPage values
     */
    countPages() {
      return Math.ceil(this.totalResults / this.perPage);
    },
  },
  components: {
    Heroe,
  },
  created() {
    this.fillCharacters();
    this.debouncedGetSearchResult = _.debounce(this.getSearchResult, 350); //
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
    /**
     * Fill characters array with given characters
     */
    fillCharactersArray(characters) {
      this.characters = [];

      characters.data.results.forEach((character) => {
        this.characters.push(character);
      });

      this.totalResults = characters.data.total;
    },
    /**
     * Fill characters array with given offset
     */
    async fillCharacters(offset) {
      this.$vs.loading();
      this.fillCharactersArray(await MarvelApiService.findAllCharacters(offset));
      this.$vs.loading.close();
    },
    /**
     * Update currentPage variable and get new characters with offset
     */
    nextPage() {
      this.currentPage += 1;
      this.fillCharacters(this.calculOffset());
    },
    prevPage() {
      this.currentPage -= 1;
      this.fillCharacters(this.calculOffset());
    },
    /**
     * Get characters based on search value
     */
    async getSearchResult() {
      if (this.search === '') {
        return this.fillCharacters();
      }

      return this.fillCharactersArray(await MarvelApiService.findCharacterByName(this.search));
    },
  },
};
</script>
