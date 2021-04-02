<template>
  <div>
    <vs-row vs-align="flex-start"
            vs-type="flex" vs-justify="center" vs-w="12">
      <vs-col vs-lg="6" vs-sm="10" vs-xs="12">

        <vs-row vs-type="flex" vs-justify="space-between" vs-w="12" style="margin: 10px 0;">
          <vs-col vs-type="flex" vs-justify="left" vs-align="center" vs-w="4"><h1>My team</h1></vs-col>
          <vs-col vs-type="flex" vs-justify="flex-end" vs-w="8">
            <vs-button @click="popup=true" style="margin-right: 5px">Save</vs-button>
            <vs-button v-on:click="deleteTeam" style="margin: 0 5px">Delete</vs-button>
            <vs-button @click="popup2=true" style="margin: 0 5px">New team</vs-button>
            <vs-button @click="openManager" style="margin-left: 5px">Manage my teams</vs-button>
          </vs-col>

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
        <vs-popup classContent="popup-example" title="Team saving" :active.sync="popup">
          <h2 style="margin-bottom: 10px;">Please enter a name for your team</h2>
          <vs-row vs-type="flex" vs-justify="space-between">
            <vs-input class="inputx" placeholder="Placeholder" v-model="teamName"/>
            <vs-button @click="saveTeam" color="primary" type="filled">Save</vs-button>
          </vs-row>
        </vs-popup>
        <vs-popup classContent="popup-example" title="Create a new team" :active.sync="popup2">
          <h2 style="margin-bottom: 10px;">Do you want to save your team?</h2>
          <vs-button @click="popup=true" color="primary" type="filled" style="margin-right: 10px">Yes</vs-button>
          <vs-button @click="deleteTeam" color="primary" type="filled">No</vs-button>
        </vs-popup>
        <vs-popup classContent="popup-example" title="Create a new team" :active.sync="popup3">
          <h2>List of your teams</h2>
          <vs-list>
            <vs-list-item :title="name" v-for="(team, name) in teams" :key="name">
              <vs-button @click="select(name)" style="margin-right: 10px">Select</vs-button>
              <vs-button @click="deleteTeamLocal(name)">Delete</vs-button>
            </vs-list-item>
          </vs-list>
        </vs-popup>
      </vs-col>
    </vs-row>
  </div>
</template>

<script>
import Heroe from '@/components/heroes/Heroe.vue';
import MarvelApiService from '../services/MarvelApiService';

export default {
  name: 'Team',
  data() {
    return {
      characters: [],
      teamName: '',
      popup: false,
      popup2: false,
      popup3: false,
      teams: [],
    };
  },
  components: {
    Heroe,
  },
  created() {
    this.fillCharacters();
    let { teams } = localStorage;
    if (typeof teams === 'undefined') {
      teams = {};
    } else {
      teams = JSON.parse(teams);
    }
    this.teams = teams;
  },
  methods: {
    fillCharactersArray(characters) {
      this.characters = [];
      characters.forEach((character) => {
        this.characters.push(character.data.results[0]);
      });
    },
    async fillCharacters() {
      const characters = [];
      const ids = this.$session.get('team');
      if (typeof ids !== 'undefined') {
        for (const id of ids) {
          characters.push(await MarvelApiService.findCharacterById(id));
        }
      }
      this.fillCharactersArray(characters);
    },
    deleteFromMyTeam(id) {
      const heroe = this.characters.filter((item) => item.id === id);
      if (typeof heroe !== 'undefined') {
        this.characters.splice(this.characters.indexOf(heroe), 1);
      }
      const team = this.$session.get('team');
      if (team.includes(id)) {
        team.splice(team.indexOf(id), 1);
      }
      this.$session.set('team', team);
    },
    saveTeam() {
      if (this.teamName.length > 0) {
        this.teams[this.teamName] = this.$session.get('team');
        localStorage.teams = JSON.stringify(this.teams);
        this.popup = false;
        this.popup2 = false;
        this.teamName = '';
      }
    },
    deleteTeam() {
      this.$session.set('team', []);
      this.characters = [];
      this.popup2 = false;
    },
    openManager() {
      this.popup3 = true;
    },
    deleteTeamLocal(name) {
      const newTeam = {};
      for (const key in this.teams) {
        if (key !== name) {
          newTeam[key] = this.teams[key];
        }
      }
      this.teams = newTeam;
      localStorage.teams = JSON.stringify(this.teams);
    },
    select(name) {
      const team = this.teams[name];
      this.$session.set('team', team);
      this.fillCharacters();
      this.popup3 = false;
    },
  },
};
</script>
