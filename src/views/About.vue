<template>
  <v-container fluid>
    <v-layout row wrap>
      <v-flex sm4>
        <v-card
          color="#EF5350"
          class="black--text ma-2"
          :to="'/userlist'"
        >
          <v-card-title primary-title>
            <v-progress-circular
              v-if="!usercount"
              :size="50"
              color="primary"
              indeterminate
            ></v-progress-circular>
            <div v-else>
              <div class="headline">
                {{ `${usercount} USERS` }}
              </div>
              <span>USING THIS APP</span>
            </div>
          </v-card-title>
          <v-divider light></v-divider>
          <v-card-actions class="pa-3">
            GO TO USER LIST
          </v-card-actions>
        </v-card>
      </v-flex>

      <v-flex sm4>
        <v-card
          color="blue lighten-2"
          class="black--text ma-2"
          :to="'/contentnews'"
        >
          <v-card-title primary-title>
            <v-progress-circular
              v-if="!newscount"
              :size="50"
              color="primary"
              indeterminate
            ></v-progress-circular>
            <div v-else>
              <div class="headline">
                {{ `${newscount} NEWS` }}
              </div>
              <span>HAVE BEEN READ</span>
            </div>
          </v-card-title>
          <v-divider light></v-divider>
          <v-card-actions class="pa-3">
            WHAT'S NEW?
          </v-card-actions>
        </v-card>
      </v-flex>

      <v-flex sm4>
        <v-card
          color="#FFEE58"
          class="white--text ma-2"
          :to="'/contentrank'"
        >
          <v-card-title primary-title>
            <v-progress-circular
              v-if="!teamcount || !leagcount"
              :size="50"
              color="primary"
              indeterminate
            ></v-progress-circular>
            <div v-else>
              <div class="headline">
                {{ `${teamcount} TEAMS FROM ${leagcount} LEAGUES` }}
              </div>
              <span>ARE FIGHING</span>
            </div>
          </v-card-title>
          <v-divider light></v-divider>
          <v-card-actions class="pa-3">
            TAKE CHARGE
          </v-card-actions>
        </v-card>
      </v-flex>
    </v-layout>

    <v-layout>
      <v-flex sm6 pa-2 v-for="(news, index) in newslist" :key="index">
        <v-card color="blue-grey darken-1" class="white--text">
          <v-img
            :src="news.n_pic ? news.n_pic : 'https://cdn.vuetifyjs.com/images/cards/desert.jpg'"
            aspect-ratio="2.75"
          ></v-img>

          <v-card-title primary-title>
            <div>
              <h3 class="headline mb-0">{{news.n_title}}</h3>
              <h3 class="font-italic mb-0">{{news.n_time}}</h3>
            </div>
          </v-card-title>

          <v-card-actions>
            <v-btn
              flat class="white--text"
              @click="oops"
            >GOT IT</v-btn>
          </v-card-actions>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>
<script>
export default {
  data() {
    return {
      usercount: '',
      newscount: '',
      teamcount: '',
      leagcount: '',
      newslist: [],
    }
  },
  created() {
    this.getUsercount();
    this.getNewscount();
    this.getTeamcount();
    this.getLeagcount();
  },
  methods: {
    getUsercount() {
      this.axios.get(this.host+`/user/all`).then(({ data }) => {
        this.usercount = data.results.length;
      })
    },
    getNewscount() {
      this.axios.get(this.host+`/news/allnews`).then(({ data }) => {
        this.newscount = data.results.length;
        const idx = Math.floor(Math.random() * (this.newscount - 1));
        this.newslist = data.results.slice(idx, idx + 2);
        console.log(this.newslist, data.results);
      })
    },
    getTeamcount() {
      this.axios.get(this.host+`/rank/allteam`).then(({ data }) => {
        this.teamcount = data.results.length;
      })
    },
    getLeagcount() {
      this.axios.get(this.host+`/league/all`).then(({ data }) => {
        this.leagcount = data.results.length;
      })
    },
    oops() {
      this.$toast('OK I GET IT');
    }
  }
}
</script>
