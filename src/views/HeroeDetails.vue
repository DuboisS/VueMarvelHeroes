<template>
  <div>
    <div v-if="!loading">
      <vs-row vs-align="flex-start" vs-type="flex" vs-justify="center" vs-w="12" style="margin-top: 10px">
        <vs-col vs-lg="6" vs-sm="10" vs-xs="12">
          <vs-card class="cardx">
            <div slot="header">
              <h3>{{ character.name }}</h3>
            </div>
            <div slot="media">
              <!--              <img :src="character.thumbnail.path + '.' + character.thumbnail.extension" :height="300">-->
              <img :src="character.thumbnail.path + '.' + character.thumbnail.extension">
            </div>
            <div>
              <p v-if="character.description">{{ character.description }}</p>
              <p v-else>Sorry, no description available for this hero.</p>

              <h2 style="margin-top: 5px">Comics</h2>
              <p>
                The first comic is {{ firstComic.title }}
                ({{ firstComic.dates[0].date | formatStringDate }}) and the lastest {{ lastComic.title }}
                ({{ lastComic.dates[0].date | formatStringDate }})
              </p>
            </div>
            <vs-button v-if="!inMyTeam" color="primary" type="filled"
                       v-on:click="addInMyTeam" style="margin-top: 10px">Add in my team
            </vs-button>
            <vs-button v-else @click="deleteFromMyTeam" color="primary" type="filled" style="margin-top: 10px">Delete
            </vs-button>
          </vs-card>
          <vs-popup class="holamundo" title="Heroe added to your team!" :active.sync="popup">
            <p>
              The heroe {{ character.name }} has been succesfully added to your team!
            </p>
          </vs-popup>
          <vs-popup class="holamundo" title="Heroe deleted!" :active.sync="popup2">
            <p>
              This heroe ha been succesfully deleted from your team!
            </p>
          </vs-popup>
        </vs-col>
      </vs-row>
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
      popup: false,
      popup2: false,
      team: null,
      isInMyTeam: false,
    };
  },
  created() {
    this.$vs.loading();
    this.fillCharacter(this.$route.params.id);
    this.team = this.$session.get('team');
    if (typeof this.team === 'undefined') {
      this.team = [];
    }
  },
  computed: {
    thumbnailCharacter() {
      if (!this.loading) {
        return '';
      }
      return `${this.character.thumbnail.path}.${this.character.thumbnail.extension}`;
    },
    inMyTeam() {
      return this.isInMyTeam;
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

      this.$vs.loading.close();
      this.loading = false;

      this.isInMyTeam = this.team.includes(this.character.id);
      console.log(this.isInMyTeam);
    },
    addInMyTeam() {
      if (!this.team.includes(this.character.id)) {
        this.team.push(this.character.id);
        this.popup = true;
      }
      this.$session.set('team', this.team);
      this.isInMyTeam = true;
    },
    /**
     * Delete a hero from the current team
     */
    deleteFromMyTeam() {
      if (this.team.includes(this.character.id)) {
        this.team.splice(this.team.indexOf(this.character.id), 1);
        this.popup2 = true;
        this.$session.set('team', this.team);
        this.isInMyTeam = false;
      }
    },
  },
};
</script>
