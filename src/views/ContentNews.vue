<template>
  <v-container grid-list-sm>
    <v-layout row wrap>
      <v-flex sm12>
        <v-form ref="form">
          <v-layout row wrap>
            <v-flex sm12>
              <v-select
                label="League"
                v-model="selectedLeague"
                :items="leagues"
                item-text="l_name"
                item-value="l_id"
                @change="handleLeagueChange"
              ></v-select>
            </v-flex>
          </v-layout>
          <v-layout row wrap>
            <v-flex sm12>
              <v-text-field
                v-model="newsTitle"
                label="Title"
              ></v-text-field>
            </v-flex>
          </v-layout>
          <v-layout row wrap>
            <v-flex sm8>
              <v-textarea
                outline
                v-model="newsContent"
                label="Content"
              ></v-textarea>
            </v-flex>
            <v-flex sm2>
              <v-img
                v-if="uploadImageUrl"
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
          <v-layout row wrap>
            <v-flex sm12>
              <v-btn color="info" @click="submitNews">Submit</v-btn>
            </v-flex>
          </v-layout>
        </v-form>
      </v-flex>
      <v-flex sm12>
        <v-card>
          <v-list>
            <v-list-tile v-for="(news, index) in newsList" :key="index">
              <v-flex sm3>
                <v-list-tile-content>{{news.n_time}}: </v-list-tile-content>
              </v-flex>
              <v-flex sm4>
                <v-list-tile-content
                  style="font-weight: bold"
                >
                  {{news.n_title}}
                </v-list-tile-content>
              </v-flex>
              <v-flex sm2>
                <v-list-tile-content>
                  {{news.n_content.length}} LETTERS
                </v-list-tile-content>
              </v-flex>
              <v-flex sm2>
                <v-list-tile-content>
                  {{news.n_like}} LIKES
                </v-list-tile-content>
              </v-flex>
              <v-flex sm1>
                <v-img
                  :src="news.n_pic"
                  :contain="true"
                  max-height="30px"
                ></v-img>
              </v-flex>
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
      selectedLeague: 0,
      leagues: [],
      newsTitle: '',
      newsContent: '',
      newsList: [],
      uploadImageUrl: '',
    }
  },
  created() {
    this.fetchLeagues();
  },
  methods: {
    fetchLeagues() {
      this.axios.get(this.host+'/league/all').then(({ data }) => {
        this.leagues = data.results;
        this.selectedLeague = data.results[0].l_id;

        this.fetchNews(this.selectedLeague);
      })
    },

    fetchNews(leagueid) {
      this.axios.get(this.host+`/news/all?leagueid=${leagueid}`).then(({ data }) => {
        this.newsList = data.results;
      })
    },

    handleLeagueChange() {
      this.fetchNews(this.selectedLeague);
    },
    
    uploadImage(file) {
      const fd = new FormData();
      fd.append('smfile', file);
      this.axios.post('https://sm.ms/api/upload', fd).then(({ data }) => {
        console.log(data);
        this.uploadImageUrl = data.data.url;
      })
    },

    submitNews() {
      this.axios.post(this.host+'/news/add', this.qs.stringify({
        title: this.newsTitle,
        content: this.newsContent,
        pic: this.uploadImageUrl,
        time: (new Date()).toISOString(),
        like: 0,
        leagueid: this.selectedLeague,
      })).finally(() => {
        this.fetchNews(this.selectedLeague);
        this.resetForm();
      })
    },
    resetForm() {
      this.$refs.form.reset();
    }
  },
  components: {
    UploadButton,
  }
}
</script>
