<template>
  <v-container grid-list-xs>
    <v-layout row wrap>
      <v-flex sm12>
        <h5 class="headline mb-4">Live Broadcasting</h5>
        <v-form ref="form">
          <v-layout row wrap>
            <v-flex sm12>
              <v-select
                :items="rooms"
                v-model="selectedRoom"
                item-text="name"
                item-value="id"
                label="Live Room"
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
            <v-list-tile v-for="(cast, index) in castingList" :key="index">
              <v-layout row wrap>
                <v-flex sm4>
                    <v-list-tile-content>{{cast.time}} : </v-list-tile-content>
                </v-flex>
                <v-flex sm8>
                  <v-list-tile-content>{{cast.msg}}</v-list-tile-content>
                </v-flex>
              </v-layout>
            </v-list-tile>
          </v-list>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>
<script>
// import io from 'socket.io-client';
// const WebSocket = require('ws');

export default {
  data() {
    return {
      rooms: [{
        name: 'CENTER LIVE ROOM',
        id: 1
      }],
      selectedRoom: 1,
      newCasting: '',
      castingList: [],
      clientio: null,
    }
  },
  methods: {
    submitCasting() {
      this.sendCasting();
    },
    resetForm() {
      this.newCasting = '';
    },

    sendCasting() {
      this.clientio.send(JSON.stringify({
        by: 'HOST',
        type: 'live',
        msg: this.newCasting,
      }))
      this.resetForm();
    }
  },
  created() {
    // const clientio = io('http://localhost:3000/gamelive');
    // clientio.on('connect', () => {
    //   this.$toast(`CONENCTED TO WEBSOCKET`);
    // })
    // clientio.on('message', (data) => {
      //   console.log(data);
    // })
    // this.clientio = clientio;

    const ws = new WebSocket(this.wshost);
    ws.onopen = () => {
      this.$toast(`CONENCTED TO WEBSOCKET`);
    }

    ws.onmessage = ({ data }) => {
      data = JSON.parse(data);
      this.castingList.unshift(data);
    }

    this.clientio = ws;
  },

  destroyed() {
    this.clientio.close();
  }
}
</script>
