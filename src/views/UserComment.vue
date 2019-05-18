<template>
  <v-container grid-list-sm>
    <v-layout row wrap>
      <v-flex sm12>
        <v-card>
          <v-list two-line>
            <v-list-tile 
              avatar
              v-for="(cmt, index) in commentList"
              :key="index"
            >
              <v-list-tile-avatar>
                <img :src="''">
              </v-list-tile-avatar>

              <v-list-tile-content>
                <v-list-tile-title>{{cmt.c_content}}</v-list-tile-title>
                <v-list-tile-sub-title>{{cmt.c_u_name}} @{{cmt.c_n_title}}</v-list-tile-sub-title>
              </v-list-tile-content>

              <v-list-tile-action>
                <v-btn icon @click="deleteComment(cmt.c_id)">
                  <v-icon>delete</v-icon>
                </v-btn>
              </v-list-tile-action>
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
      commentList: [],
    }
  },
  created() {
    this.fetchComment();
  },
  methods: {
    fetchComment() {
      this.axios.get(this.host+'/news/allcomment').then(({ data }) => {
        this.commentList = data.results;
      })
    },
    deleteComment(commentid) {
      this.axios.post(this.host+'/news/deletecomment', this.qs.stringify({
        commentid
      })).then(() => {
        this.$toast(`Comment has been removed. `);
      }).finally(() => {
        this.fetchComment();
      })
    }
  }
}
</script>

