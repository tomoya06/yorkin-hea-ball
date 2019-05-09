<template>
  <v-container grid-list-sm>
    <v-layout row wrap>
      <v-flex sm8>
        <v-card>
          <v-toolbar>
            <v-toolbar-title>User List</v-toolbar-title>
          </v-toolbar>

          <v-list>
            <v-list-tile v-for="(item, index) in items" :key="index" avatar>
              <v-list-tile-avatar>
                <img :src="item.avatar">
              </v-list-tile-avatar>

              <v-list-tile-content>
                <v-list-tile-title v-html="item.title"></v-list-tile-title>
              </v-list-tile-content>

              <v-list-tile-action>
                <v-btn icon>
                  <v-icon :color="item.active ? 'teal' : 'grey'">star</v-icon>
                </v-btn>
              </v-list-tile-action>
              <v-list-tile-action>
                <v-btn icon>
                  <v-icon :color="item.active ? 'teal' : 'grey'">clear</v-icon>
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
const fakeUsers = "0 "
  .repeat(20)
  .split("")
  .map((item, index) => ({
    avatar: "",
    title: "tomoya"+`${index}`.padStart(3, '0'),
    active: false
  }));
export default {
  data: () => ({
    items: fakeUsers
  }),
  methods: {
    handleClick() {
      alert("CLICKED");
    }
  }
};
</script>

