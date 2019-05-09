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
                <img :src="cmt.user.avatar">
              </v-list-tile-avatar>

              <v-list-tile-content>
                <v-list-tile-title>{{cmt.msg}}</v-list-tile-title>
                <v-list-tile-sub-title>{{cmt.user.title}} @{{cmt.date}} {{cmt.time}}</v-list-tile-sub-title>
              </v-list-tile-content>

              <v-list-tile-action>
                <v-btn icon @click="deleteCmt(cmt.id)">
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
const fakeCommentList = [{
  user: {
    title: 'tomoya01',
    avatar: '',
  },
  msg: 'This is a message',
  date: '2019-01-01',
  time: '19:00',
  id: 1
}, {
  user: {
    title: 'tomoya01',
    avatar: '',
  },
  msg: 'This is another message',
  date: '2019-01-01',
  time: '19:00',
  id: 2
}];
export default {
  data() {
    return {
      commentList: fakeCommentList,
    }
  },
  methods: {
    deleteCmt(idx) {
      this.commentList = this.$_.filter(this.commentList, item => item.id !== idx);
      this.$toast(`Comment ${idx} has been removed. `);
    }
  }
}
</script>

