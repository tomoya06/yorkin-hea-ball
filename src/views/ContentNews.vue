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
            <v-flex sm12>
              <v-textarea
                outline
                v-model="newsContent"
                label="Content"
              ></v-textarea>
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
            <v-list-tile v-for="(news, index) in sortedNewsList" :key="index">
              <v-list-tile-content>{{news.time}} - {{news.author}}: </v-list-tile-content>
              <v-list-tile-content>{{news.newsTitle}}, {{news.newsContent.length}} letters</v-list-tile-content>
            </v-list-tile>
          </v-list>
        </v-card>        
      </v-flex>
    </v-layout>
  </v-container>
</template>
<script>
import UploadBtn from 'vuetify-upload-button';
export default {
  data() {
    return {
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
      newsTitle: '',
      newsContent: '',
      newsList: []
    }
  },
  methods: {
    handleFileChanged(file) {
      console.log(file);
    },
    submitNews() {
      this.newsList.push({
        newsTitle: this.newsTitle,
        newsContent: this.newsContent,
        time: Date.now(),
        author: 'me',
        league: this.selectedLeague,
      })
      this.resetForm();
    },
    resetForm() {
      this.$refs.form.reset();
    }
  },
  computed: {
    sortedNewsList() {
      return this.newsList
        .filter(item => true)
        .sort((a, b) => a.time < b.time);
    }
  },
  components: {
    UploadBtn,
  }
}
</script>
