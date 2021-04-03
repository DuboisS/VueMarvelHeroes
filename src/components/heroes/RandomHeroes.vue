<template>
  <div>
    <vs-row vs-align="flex-start"
            vs-type="flex" vs-justify="center" vs-w="12">
      <vs-col vs-lg="6" vs-sm="10" vs-xs="12">
        <h1 style="margin: 10px 0;">Heroes random list</h1>
        <vs-row vs-type="flex" vs-justify="space-between" vs-w="12" style="margin-bottom: 10px;">
          <vs-col vs-type="flex" vs-justify="left" vs-align="center" vs-w="4">10 random heroes</vs-col>
          <vs-button color="primary" type="filled" @click="refresh">Refresh</vs-button>
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
      </vs-col>
    </vs-row>
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
    /**
     * Fill characters array with random characters
     */
    async fillCharacters() {
      this.$vs.loading();
      const characters = await MarvelApiService.findRandomCharacters();
      this.characters = [];
      characters.data.results.forEach((character) => {
        this.characters.push(character);
      });
      this.$vs.loading.close();
    },
    /**
     * Refresh characters array with new random characters
     */
    refresh() {
      this.fillCharacters();
    },
  },
};
</script>
