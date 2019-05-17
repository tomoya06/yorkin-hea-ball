<template>
  <v-container grid-list-sm>
    <v-layout row wrap>
      <v-flex sm12>
        <h5 class="headline mb-4">Rank Update</h5>
        <v-form ref="form">
          <v-layout row wrap>
            <v-flex sm6>
              <v-select
                :items="leagues"
                v-model="selectedLeague"
                @change="onChangeSelectLeague"
                label="League"
                item-text="l_name"
                item-value="l_id"
              ></v-select>
            </v-flex>
            <v-flex sm6>
              <v-text-field
                label="New League"
                v-model="newleagueName"
              ></v-text-field>
            </v-flex>
          </v-layout>
          <v-layout row wrap>
            <v-flex sm6>
              <v-select
                :items="teams"
                v-model="selectedTeam"
                @change="onChangeSelectTeam"
                item-text="r_t_name"
                item-value="r_tid"
                label="Team"
              ></v-select>
            </v-flex>
            <v-flex sm6>
              <v-text-field
                label="New Team"
                v-model="newteamName"
              ></v-text-field>
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
              <v-btn color="info" @click="createTeam">Create Team</v-btn>
              <v-btn color="info" @click="createLeague">Create League</v-btn>
            </v-flex>
          </v-layout>
        </v-form>
      </v-flex>

      <v-flex sm12>
        <v-card>
          <v-list>
            <v-list-tile v-for="(team, index) in teams" :key="index">
              <v-layout row wrap>
                <v-flex sm4>
                  <v-list-tile-content>{{team.r_t_name}}</v-list-tile-content>
                </v-flex>
                <v-flex sm8>
                  <v-list-tile-content>{{team.r_t_wl_w}} WIN / {{team.r_t_wl_f}} LOSE</v-list-tile-content>
                </v-flex>
              </v-layout>
            </v-list-tile>
          </v-list>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>
<script>
export default {
  data() {
    return {
      winInput: 0,
      loseInput: 0,
      selectedLeague: 0,
      leagues: [],
      selectedTeam: 0,
      teams: [],
      newteamName: '',
      newleagueName: '',
    }
  },
  created() {
    this.fetchLeagues();
  },
  methods: {
    updateWL() {
      this.axios.post(this.host+'/rank/update', this.qs.stringify({
        teamid: this.selectedTeam,
        win: this.winInput,
        lose: this.loseInput,
      })).finally(() => {
        this.fetchTeamInLeague(this.selectedLeague);
      })
    },
    createTeam() {
      this.axios.post(this.host+'/rank/add', this.qs.stringify({
        leagueid: this.selectedLeague,
        win: this.winInput,
        lose: this.loseInput,
        name: this.newteamName,
        pic: '',
        content: '',
      })).finally(() => {
        this.fetchTeamInLeague(this.selectedLeague);
      })
    },
    createLeague() {
      this.axios.post(this.host+'/league/add', this.qs.stringify({
        name: this.newleagueName,
        time: (new Date()).toISOString(),
      })).finally(() => {
        this.fetchLeagues();
      })
    },
    onChangeSelectLeague() {
      this.fetchTeamInLeague(this.selectedLeague);
    },
    onChangeSelectTeam() {
    },
    fetchTeamInLeague(l_id) {
      this.axios.get(this.host+`/rank/all?leagueid=${l_id}`).then(({ data }) => {
        this.teams = data.results;
        this.selectedTeam = data.results[0].r_tid;
      })
    },
    fetchLeagues() {
      this.axios.get(this.host+'/league/all').then(({ data }) => {
        this.leagues = data.results;
        this.selectedLeague = data.results[0].l_id;

        this.fetchTeamInLeague(data.results[0].l_id);
      })
    }
  },
  computed: {
    teamsInLeague() {
      return this.$_.filter(this.teams, team => team.league === this.selectedLeague);
    }
  },
}
</script>

