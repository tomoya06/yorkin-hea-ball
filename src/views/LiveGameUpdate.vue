<template>
  <v-container grid-list-sm>
    <v-layout row wrap>
      <v-flex sm12>
        <h5 class="headline mb-4">Game Update</h5>
        <v-form ref="form">
          <v-layout row wrap>
            <v-flex sm6>
              <v-text-field
                label="Team 1"
                v-model="team1"
              ></v-text-field>
            </v-flex>
            <v-flex sm6>
              <v-text-field
                label="Team 2"
                v-model="team2"
              ></v-text-field>
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
              <v-list-tile-content>{{game.team1}} - {{game.team2}}</v-list-tile-content>
              <v-list-tile-content> @{{game.gameDate}}, {{game.gameTime}}</v-list-tile-content>
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
      team1: '',
      team2: '',
      gameDate: '',
      gameTime: '',
      gameList: []
    }
  },
  methods: {
    submitNewGame() {
      this.gameList.push({
        team1: this.team1,
        team2: this.team2,
        gameDate: this.gameDate,
        gameTime: this.gameTime,
      })
      this.resetForm();
    },
    resetForm() {
      this.$refs.form.reset();
      this.gameDate = '';
      this.gameTime = '';
    }
  }
}
</script>

