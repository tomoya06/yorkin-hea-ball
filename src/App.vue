<template>
  <div id="app">
    <v-app>
      <v-navigation-drawer clipped fixed v-model="drawer" app>
        <v-list>
          <v-list-group
            v-for="item in items"
            :key="item.title"
            v-model="item.active"
            :prepend-icon="item.action"
            no-action
          >
            <template v-slot:activator>
              <v-list-tile>
                <v-list-tile-content>
                  <v-list-tile-title>{{ item.title }}</v-list-tile-title>
                </v-list-tile-content>
              </v-list-tile>
            </template>

            <v-list-tile v-for="subItem in item.items" :key="subItem.title" :to="subItem.route">
              <v-list-tile-content>
                <v-list-tile-title>{{ subItem.title }}</v-list-tile-title>
              </v-list-tile-content>

              <v-list-tile-action>
                <v-icon>{{ subItem.action }}</v-icon>
              </v-list-tile-action>
            </v-list-tile>
          </v-list-group>
        </v-list>
      </v-navigation-drawer>
      <v-toolbar color="primary" app fixed clipped-left>
        <v-toolbar-side-icon class="white--text" @click.stop="drawer = !drawer"></v-toolbar-side-icon>
        <v-toolbar-title class="white--text">Bronco Baseball Station</v-toolbar-title>
      </v-toolbar>
      <v-content>
        <v-fade-transition mode="out-in">
          <router-view></router-view>
        </v-fade-transition>
      </v-content>
    </v-app>
  </div>
</template>
<script>
export default {
  data: () => {
    return {
      drawer: false,
      items: [
        {
          action: "local_activity",
          title: "Home",
          active: true,
          items: [
            { title: "Overview", route: '/about' },
            { title: "Setting", route: '/setting' }
          ]
        },
        {
          action: "restaurant",
          title: "User",
          items: [
            { title: "User List", route: '/userlist' },
            { title: "User Comment", route: '/usercomment' },
          ]
        },
        {
          action: "school",
          title: "Live",
          items: [
            { title: "Game Update", route: '/livegameupdate' },
            { title: "Live Broadcasting", route: '/livebroadcasting' },
          ],
        },
        {
          action: "school",
          title: "Content",
          items: [
            { title: "News Update", route: '/contentnews' },
            { title: "Rank Update", route: '/contentrank' },
          ]
        }
      ]
    };
  },
};
</script>