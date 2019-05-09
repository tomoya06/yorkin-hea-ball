<template>
  <v-container grid-list-sm>
    <v-layout row wrap>
      <v-flex sm12>
        <h5 class="headline mb-4">Rank Update</h5>
        <v-form ref="form">
          <v-layout row wrap>
            <v-flex sm12>
              <v-select
                :items="leagues"
                v-model="selectedLeague"
                @change="onChangeSelectLeague"
                label="League"
              ></v-select>
            </v-flex>
          </v-layout>
          <v-layout row wrap>
            <v-flex sm12>
              <v-select
                :items="teamsInLeague"
                v-model="selectedTeam"
                @change="onChangeSelectTeam"
                item-text="name"
                item-value="id"
                label="Team"
              ></v-select>
            </v-flex>
          </v-layout>
          <v-layout row wrap>
            <v-flex sm4>
              <v-text-field label="WIN" v-model="winInput"></v-text-field>
            </v-flex>
            <v-flex sm4>
              <v-text-field label="LOSE" v-model="loseInput"></v-text-field>
            </v-flex>
          </v-layout>
          <v-layout row wrap>
            <v-flex sm12>
              <v-btn color="info" @click="updateWL">Update</v-btn>
            </v-flex>
          </v-layout>
        </v-form>
      </v-flex>

      <v-flex sm12>
        <v-card>
          <v-list>
            <v-list-tile v-for="(team, index) in teamsInLeague" :key="index">
              <v-list-tile-content>{{team.name}} :</v-list-tile-content>
              <v-list-tile-content>{{team.win}} / {{team.lose}}</v-list-tile-content>
            </v-list-tile>
          </v-list>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>
<script>
const teamList = [{
  name: 'team 11',
  id: '11',
  league: '1',
  win: 10,
  lose: 0
}, {
  name: 'team 12',
  id: '12',
  league: '1',
  win: 0,
  lose: 0
}, {
  name: 'team 21',
  id: '21',
  league: '2',
  win: 1,
  lose: 10
}, {
  name: 'team 22',
  id: '22',
  league: '2',
  win: 0,
  lose: 0
}, {
  name: 'team 31',
  id: '31',
  league: '3',
  win: 0,
  lose: 0
}]

export default {
  data() {
    return {
      winInput: 0,
      loseInput: 0,
      selectedLeague: '1',
      leagues: [{
        text: 'League 1',
        value: '1',
      }, {
        text: 'League 2',
        value: '2',
      }, {
        text: 'League 3',
        value: '3',
      }],
      selectedTeam: '11',
      teams: teamList
    }
  },
  methods: {
    updateWL() {
      const target = this.$_.find(this.teams, team => team.id === this.selectedTeam);
      target.win = parseInt(this.winInput);
      target.lose = parseInt(this.loseInput);
    },
    onChangeSelectLeague() {
      this.selectedTeam = this.teamsInLeague[0].id;
    },
    onChangeSelectTeam() {
      const target = this.$_.find(this.teams, team => team.id === this.selectedTeam);
    },
  },
  computed: {
    teamsInLeague() {
      return this.$_.filter(this.teams, team => team.league === this.selectedLeague);
    }
  },
}
</script>

