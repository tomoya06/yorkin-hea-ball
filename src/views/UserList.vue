<template>
  <v-container grid-list-sm>
    <v-layout row wrap>
      <v-flex sm8>
        <v-card>
          <v-toolbar>
            <v-toolbar-title>User List</v-toolbar-title>
          </v-toolbar>

          <v-list>
            <v-list-group
              v-for="(user, index) in users" 
              :key="index"
              v-model="user.active"
              no-action
            >
              <template v-slot:activator>
                <v-list-tile avatar>
                  <v-list-tile-avatar>
                    <img :src="user.avatar">
                  </v-list-tile-avatar>

                  <v-list-tile-content>
                    <v-list-tile-title v-html="user.u_name"></v-list-tile-title>
                  </v-list-tile-content>

                  <v-list-tile-action>
                    <v-btn icon @click.stop="starUser(user.u_id)">
                      <v-icon :color="user.star ? 'blue' : 'grey'">star</v-icon>
                    </v-btn>
                  </v-list-tile-action>
                  <v-list-tile-action>
                    <v-btn icon @click.stop="deleteUser(user.u_id)">
                      <v-icon color="grey">clear</v-icon>
                    </v-btn>
                  </v-list-tile-action>
                </v-list-tile>
              </template>

              <v-list-tile>
                <v-list-tile-content>
                  <v-list-tile-sub-title>User ID: {{ user.u_id }}</v-list-tile-sub-title>
                  <v-list-tile-sub-title>Last Time Online: {{ user.u_time }}</v-list-tile-sub-title>
                </v-list-tile-content>
              </v-list-tile>
            </v-list-group>

          </v-list>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>
<script>
import toast from 'vuetify-toast';

const fakeUsers = "0 "
  .repeat(20)
  .split("")
  .map((item, index) => ({
    avatar: "",
    title: "tomoya"+`${index}`.padStart(3, '0'),
    id: index,
    online: Date.now(),
    star: false,
    active: false
  }));
export default {
  data: () => ({
    users: fakeUsers,
  }),
  methods: {
    handleClick() {
      alert("CLICKED");
    },
    starUser(userid) {
      const target = this.$_.find(this.users, (user) => user.id === userid);
      target.star = !target.star;
      this.$toast(`${target.title} has been ${target.star ? '': 'un'}stared`);
    },
    deleteUser(userid) {
      const target = this.$_.find(this.users, (user) => user.id === userid);
      this.users = this.$_.filter(this.users, (user) => user.id !== userid);
      this.$toast(`${target.title} has been removed`);
    }
  },
  created() {
    this.axios.get(this.host+'/user/all').then((res) => {
      console.log(res);
      const { data } = res;
      this.users = data.results;
    })
  }
};
</script>

