<template>
  <v-container grid-list-xs>
    <v-layout row wrap>
      <v-flex sm12>
        <h5 class="headline mb-4">Live Broadcasting</h5>
        <v-form ref="form">
          <v-layout row wrap>
            <v-flex sm12>
              <v-select
                label="Live Channel"
                v-model="selectedChannel"
                :items="channels"
              ></v-select>
            </v-flex>
          </v-layout>
          <v-layout row wrap>
            <v-flex>
              <v-text-field
                v-model="newCasting"
                label="New Casting"
              ></v-text-field>
            </v-flex>
            <v-flex>
              <v-btn
                color="info"
                @click="submitCasting"
              >Submit</v-btn>
            </v-flex>
          </v-layout>
        </v-form>
      </v-flex>
      
      <v-flex sm12>
        <v-card>
          <v-list>
            <v-list-tile v-for="(cast, index) in sortedCastingList" :key="index">
              <v-list-tile-content>{{cast.time}} - {{cast.author}} : </v-list-tile-content>
              <v-list-tile-content>{{cast.msg}}</v-list-tile-content>
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
      castingList: [{
        time: Date.now(),
        msg: 'GOOOOOOOOOOAL',
        author: 'me',
        channel: '1'
      }, {
        time: Date.now(),
        msg: 'It\'s Lights Out And Away We Go!',
        author: 'me',
        channel: '2'
      }],
      newCasting: '',
      channels: [{
        text: 'Channel 1',
        value: '1',
      }, {
        text: 'Channel 2',
        value: '2',
      }],
      selectedChannel: '1',
    }
  },
  methods: {
    submitCasting() {
      this.castingList.push({
        time: Date.now(),
        msg: this.newCasting,
        author: 'me',
        channel: this.selectedChannel,
      });
      this.resetForm();
    },
    resetForm() {
      this.$refs.form.reset();
    }
  },
  computed: {
    sortedCastingList() {
      return this.castingList
        .filter(item => item.channel === this.selectedChannel)
        .sort((a, b) => a.time < b.time);
    }
  }
}
</script>
