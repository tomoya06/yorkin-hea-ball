<template>
  <v-container grid-list-sm>
    <v-layout row wrap>
      <v-flex sm12>
        <h5 class="headline mb-4">Rank Update</h5>
        <v-form ref="form">

          <v-layout row wrap>
            <v-flex sm12>
              <v-radio-group v-model="formState" row>
                <v-radio label="New League" value="newleague"></v-radio>
                <v-radio label="New Team" value="newteam"></v-radio>
                <v-radio label="Update Team" value="update"></v-radio>
                <v-radio label="Update Rank" value="rank"></v-radio>
              </v-radio-group>
            </v-flex>
          </v-layout>

          <v-layout row wrap name="league">
            <v-flex sm6
              v-if="formState !== 'newleague'"
            >
              <v-select
                :items="leagues"
                v-model="selectedLeague"
                @change="onChangeSelectLeague"
                label="League"
                item-text="l_name"
                item-value="l_id"
              ></v-select>
            </v-flex>
            <v-flex sm6
              v-if="formState === 'newleague'"
            >
              <v-text-field
                label="New League"
                v-model="newleagueName"
                v-if="formState !== 'update'"
              ></v-text-field>
            </v-flex>
          </v-layout>

          <v-layout row wrap name="team"
            v-if="formState !== 'newleague'"
          >
            <v-flex sm6
              v-if="formState !== 'newteam'"
            >
              <v-select
                :items="teams"
                v-model="selectedTeam"
                @change="onChangeSelectTeam"
                item-text="r_t_name"
                item-value="r_tid"
                label="Team"
              ></v-select>
            </v-flex>
            <v-flex sm6
              v-if="formState === 'newteam'"
            >
              <v-text-field
                label="New Team"
                v-model="newteamName"
                v-if="formState !== 'update'"
              ></v-text-field>
            </v-flex>
          </v-layout>

          <v-layout row wrap name="teamdetail"
            v-if="formState === 'update' || formState === 'newteam'"
          >
            <v-flex sm6>
              <v-textarea
                label="Content"
                v-model="teamContent"
              ></v-textarea>
            </v-flex>
            <v-flex sm4>
              <v-img
                :src="uploadImageUrl"
                aspect-ratio="1"
                class="grey lighten-2"
              >
                <template v-slot:placeholder>
                  <v-layout
                    fill-height
                    align-center
                    justify-center
                    ma-0
                  >
                    <v-progress-circular indeterminate color="grey lighten-5"></v-progress-circular>
                  </v-layout>
                </template>
              </v-img>
            </v-flex>
            <v-flex sm2>
              <upload-button @file-update="uploadImage" :ripple="true"></upload-button>
            </v-flex>
          </v-layout>

          <v-layout row wrap name="rank"
            v-if="formState === 'rank'"
          >
            <v-flex sm4>
              <v-text-field label="WIN" v-model="winInput"></v-text-field>
            </v-flex>
            <v-flex sm4>
              <v-text-field label="LOSE" v-model="loseInput"></v-text-field>
            </v-flex>
          </v-layout>
          <v-layout row wrap>
            <v-flex sm12>
              <v-btn color="info" @click="updateRank"
                v-if="formState === 'rank'">Update</v-btn>
              <v-btn color="info" @click="createTeam"
                v-if="formState === 'newteam'">Create Team</v-btn>
              <v-btn color="info" @click="createLeague"
                v-if="formState === 'newleague'">Create League</v-btn>
              <v-btn color="info" @click="updateTeam"
                v-if="formState === 'update'">Update Team</v-btn>
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
                <v-flex sm7>
                  <v-list-tile-content>{{team.r_t_wl_w}} WIN / {{team.r_t_wl_f}} LOSE</v-list-tile-content>
                </v-flex>
                <v-flex sm1>
                  <v-img
                    :src="team.r_t_pic"
                    :contain="true"
                    max-height="30px"
                  ></v-img>
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
import UploadButton from 'vuetify-upload-button';

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
      formState: 'rank',
      uploadImageUrl: '',
      teamContent: '',
    }
  },
  created() {
    this.fetchLeagues();
  },
  components: {
    UploadButton,
  },
  methods: {
    updateRank() {
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
        pic: this.uploadImageUrl,
        content: this.teamContent,
      })).finally(() => {
        this.fetchTeamInLeague(this.selectedLeague);
      })
    },

    updateTeam() {
      const target = this.$_.find(this.teams, team => team.r_tid === this.selectedTeam);

      this.axios.post(this.host+'/rank/updateteam', this.qs.stringify({
        name: target.r_t_name,
        pic: this.uploadImageUrl,
        content: this.teamContent,
        teamid: this.selectedTeam
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
      this.fetchTeamInfo();
    },

    fetchTeamInLeague(l_id) {
      this.axios.get(this.host+`/rank/all?leagueid=${l_id}`).then(({ data }) => {
        this.teams = data.results;
        this.selectedTeam = data.results[0].r_tid;
        this.fetchTeamInfo();
      })
    },

    uploadImage(file) {
      const fd = new FormData();
      fd.append('smfile', file);
      this.axios.post('https://sm.ms/api/upload', fd).then(({ data }) => {
        console.log(data);
        this.uploadImageUrl = data.data.url;
      })
    },

    fetchLeagues() {
      this.axios.get(this.host+'/league/all').then(({ data }) => {
        this.leagues = data.results;
        this.selectedLeague = data.results[0].l_id;

        this.fetchTeamInLeague(data.results[0].l_id);
      })
    },

    fetchTeamInfo() {
      const target = this.$_.find(this.teams, team => team.r_tid === this.selectedTeam);
      this.teamContent = target.r_t_content;
      this.uploadImageUrl = target.r_t_pic;
      console.log(this.teamContent, this.uploadImageUrl);
    }
  },
  computed: {
    teamsInLeague() {
      return this.$_.filter(this.teams, team => team.league === this.selectedLeague);
    }
  },
}
</script>

