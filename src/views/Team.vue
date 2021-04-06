<template>
  <div>
    <vs-row vs-align="flex-start"
            vs-type="flex" vs-justify="center" vs-w="12">
      <vs-col vs-lg="6" vs-sm="10" vs-xs="12">

        <vs-row vs-type="flex" vs-justify="space-between" vs-w="12" style="margin: 10px 0;">
          <vs-col vs-type="flex" vs-justify="left" vs-align="center" vs-w="4"><h1>My team</h1></vs-col>
          <vs-col vs-type="flex" vs-justify="flex-end" vs-w="8">
            <vs-button @click="popup=true" style="margin-right: 5px" :disabled="characters.length===0">Save</vs-button>
            <vs-button @click="popup5=true" style="margin: 0 5px" :disabled="characters.length===0">Delete</vs-button>
            <vs-button @click="popup2=(characters.length>0)" :disabled="characters.length===0" style="margin: 0 5px">New team</vs-button>
            <vs-button @click="openManager" style="margin-left: 5px" :disabled="Object.keys(teams).length===0">Manage my teams</vs-button>
          </vs-col>

        </vs-row>
        <vs-card>
          <div>
            <vs-list>
              <heroe v-for="character in characters" :key="character.id" :heroe="character" :canBeDelete="true">
              </heroe>
            </vs-list>
          </div>
        </vs-card>
        <vs-popup classContent="popup-example" title="Error" :active.sync="popup4" style="z-index: 200">
          <h2>Team already exists</h2>
          <p>This name is already taken by another team.
            Please enter another name or delete the team that uses this name.</p>
        </vs-popup>
        <vs-popup classContent="popup-example" title="Team saving" :active.sync="popup">
          <h2 style="margin-bottom: 10px;">Please enter a name for your team</h2>
          <vs-row vs-type="flex" vs-justify="space-between">
            <vs-input class="inputx" placeholder="Placeholder" v-model="teamName" :danger="dangerInput" danger-text="This name is already taken by another team!"/>
            <vs-button @click="saveTeam" color="primary" type="filled">Save</vs-button>
          </vs-row>
        </vs-popup>
        <vs-popup classContent="popup-example" title="Create a new team" :active.sync="popup2">
          <h2 style="margin-bottom: 10px;">Do you want to save your team?</h2>
          <vs-button @click="popup=true" color="primary" type="filled" style="margin-right: 10px">Yes</vs-button>
          <vs-button @click="deleteTeam" color="primary" type="filled">No</vs-button>
        </vs-popup>
        <vs-popup classContent="popup-example" title="Delete the team team" :active.sync="popup5">
          <h2 style="margin-bottom: 10px;">Do you want to delete your team?</h2>
          <vs-button @click="deleteTeam" color="primary" type="filled" style="margin-right: 10px">Yes</vs-button>
          <vs-button @click="popup5=false" color="primary" type="filled">No</vs-button>
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
      popup4: false,
      popup5: false,
      dangerInput: false,
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
    /**
     * Fill characters array with heroes stored in the session team
     */
    async fillCharacters() {
      const characters = [];
      const ids = this.$session.get('team');
      console.log(ids);
      if (typeof ids !== 'undefined') {
        for (const id of ids) {
          const heroe = await MarvelApiService.findCharacterById(id);
          console.log(heroe);
          characters.push(heroe);
        }
      }
      this.fillCharactersArray(characters);
    },
    /**
     * Save the current team in the localStorage (with check that team is not empty
     * and check that the name of the team is not already token
     */
    saveTeam() {
      if (this.teamName.length > 0) {
        if (typeof this.teams[this.teamName] === 'undefined') {
          this.teams[this.teamName] = this.$session.get('team');
          localStorage.teams = JSON.stringify(this.teams);
          this.popup = false;
          if (this.popup2) this.deleteTeam();
          this.dangerInput = false;
          this.teamName = '';
        } else {
          this.dangerInput = true;
        }
      }
    },
    /**
     * Delete the current team
     */
    deleteTeam() {
      this.$session.set('team', []);
      this.characters = [];
      this.popup2 = false;
      this.popup5 = false;
    },
    /**
     * Open the team manager in a popup
     */
    openManager() {
      this.popup3 = true;
    },
    /**
     * Delete a team stored in the localStorage
     */
    deleteTeamLocal(name) {
      const newTeam = {};
      for (const key in this.teams) {
        if (key !== name) {
          newTeam[key] = this.teams[key];
        }
      }
      this.teams = newTeam;
      localStorage.teams = JSON.stringify(this.teams);
      if (Object.keys(this.teams).length === 0) this.popup3 = false;
    },
    /**
     * Select and display a team from the localStorage
     */
    select(name) {
      const team = this.teams[name];
      this.$session.set('team', team);
      this.fillCharacters();
      this.popup3 = false;
    },
  },
};
</script>
