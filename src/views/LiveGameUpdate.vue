<template>
  <v-container grid-list-sm>
    <v-layout row wrap>
      <v-flex sm12>
        <h5 class="headline mb-4">Game Update</h5>
        <v-form ref="form">
          <v-layout row wrap name="league">
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
          </v-layout>

          <v-layout row wrap name="liveroom">
            <v-flex sm6>
              <v-select
                :items="rooms"
                v-model="selectedRoom"
                item-text="name"
                item-value="id"
                label="Live Room"
              ></v-select>
            </v-flex>
          </v-layout>

          <v-layout row wrap>
            <v-flex sm6>
              <v-select
                :items="teams"
                v-model="team1"
                item-text="r_t_name"
                item-value="r_tid"
                label="Team 1"
              ></v-select>
            </v-flex>
            <v-flex sm6>
              <v-select
                :items="teams"
                v-model="team2"
                item-text="r_t_name"
                item-value="r_tid"
                label="Team 2"
              ></v-select>
            </v-flex>
          </v-layout>

          <v-layout row wrap>
            <v-flex sm12 md6>
              <v-date-picker v-model="gameDate" :landscape="true"></v-date-picker>
            </v-flex>
            <v-flex sm12 md6>
              <v-time-picker v-model="gameTime" :landscape="true"></v-time-picker>
            </v-flex>
          </v-layout>

          <v-layout row wrap>
            <v-btn color="info" @click="submitNewGame">Submit</v-btn>
          </v-layout>
        </v-form>
        <v-card>
          <v-list>
            <v-list-tile v-for="(game, index) in gameList" :key="index">
              <v-layout row wrap>
                <v-flex sm4>
                  <v-list-tile-content>
                    {{game.g_team_a_name}} - {{game.g_team_b_name}}
                  </v-list-tile-content>
                </v-flex>
                <v-flex sm4>
                  <v-list-tile-content>
                    {{game.g_time}}
                  </v-list-tile-content>
                </v-flex>
                <v-flex sm4>
                  <v-list-tile-content style="font-weight: bold">
                    @ {{xRoomname(game.g_l_id)}}
                  </v-list-tile-content>
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
      rooms: [{
        name: 'CENTER LIVE ROOM',
        id: 1
      }],
      selectedRoom: 1,
      selectedLeague: 0,
      leagues: [],
      team1: 0,
      team2: 0,
      teams: [],
      gameDate: new Date().toISOString().substring(0, 10),
      gameTime: new Date().toISOString().substring(11, 19),
      gameList: []
    }
  },
  created() {
    this.fetchLeagues();
  },
  methods: {
    submitNewGame() {
      this.axios.post(this.host+'/gamelive/add', this.qs.stringify({
        liveid: this.selectedRoom,
        time: new Date(`${this.gameDate} ${this.gameTime}`).toISOString(),
        teama: this.team1,
        teamb: this.team2,
        leagueid: this.selectedLeague,
      })).finally(() => {
        this.fetchGame();
        this.resetForm();
      })
    },
    resetForm() {
      this.$refs.form.reset();
      this.fetchLeagues();
    },
    
    onChangeSelectLeague() {
      this.fetchTeamInLeague(this.selectedLeague);
      this.fetchGame(data.results[0].l_id);
    },
    
    fetchLeagues() {
      this.axios.get(this.host+'/league/all').then(({ data }) => {
        this.leagues = data.results;
        this.selectedLeague = data.results[0].l_id;

        this.fetchTeamInLeague(data.results[0].l_id);
        this.fetchGame(data.results[0].l_id);
      })
    },
    
    fetchTeamInLeague(l_id) {
      this.axios.get(this.host+`/rank/all?leagueid=${l_id}`).then(({ data }) => {
        this.teams = data.results;
        this.team1 = data.results[0].r_tid;
        this.team2 = data.results[0].r_tid;
      })
    },

    fetchGame(leagueid) {
      this.axios.get(this.host+`/gamelive/all?leagueid=${leagueid}`).then(({ data }) => {
        this.gameList = data.results;
      })
    },

    xRoomname(id) {
      // const target = this.$_.find(this.rooms, item => item.id === id);
      return this.rooms[0].name;
    }
  }
}
</script>

