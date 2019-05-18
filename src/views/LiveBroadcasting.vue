<template>
  <v-container grid-list-xs>
    <v-layout row wrap>
      <v-flex sm12>
        <h5 class="headline mb-4">
          {{ formState == 'live' ? 'Live Broadcasting': 'Chit Chat'}}
        </h5>
        
        <v-form ref="form">
          <v-layout row wrap>
            <v-flex sm12>
              <v-radio-group v-model="formState" row>
                <v-radio label="Live" value="live"></v-radio>
                <v-radio label="Chit Chat" value="chat"></v-radio>
              </v-radio-group>
            </v-flex>
          </v-layout>

          <template v-if="formState === 'live'">
            <div>
              <v-layout row wrap>
                <v-flex sm6>
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
            </div>
          </template>

          <template v-if="formState === 'chat'">
            <div>
              <v-layout row wrap>
                <v-flex sm6>
                  <v-text-field
                    v-model="fakeUsername"
                    label="Pretend to be..."
                  ></v-text-field>
                </v-flex>
              </v-layout>
              <v-layout row wrap>
                <v-flex>
                  <v-text-field
                    v-model="newChat"
                    label="Just Say Something"
                  ></v-text-field>
                </v-flex>
                <v-flex>
                  <v-btn
                    color="info"
                    @click="submitChat"
                  >SEND</v-btn>
                </v-flex>
              </v-layout>
            </div>
          </template>
        </v-form>
      </v-flex>
      
      <v-flex sm12>
        <v-card>
          <v-list>
            <v-list-tile v-for="(cast, index) in filterCastingList" :key="index">
              <v-layout row wrap>
                <v-flex sm3>
                  <v-list-tile-content>{{cast.time}} : </v-list-tile-content>
                </v-flex>
                <v-flex sm1>
                  <v-list-tile-content>
                    {{cast.type === 'live' ? '📢📢📢' : '😀😀😀'}}
                  </v-list-tile-content>
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
      formState: 'live',
      selectedRoom: 1,
      newCasting: '',
      fakeUsername: 'admin00',
      newChat: '',
      castingList: [],
      clientio: null,
    }
  },
  methods: {
    submitCasting() {
      this.clientio.send(JSON.stringify({
        by: this.rooms[0].name,
        type: 'live',
        msg: this.newCasting,
      }))
      this.resetForm();
    },
    resetForm() {
      this.newCasting = '';
      this.newChat = '';
    },

    submitChat() {
      this.clientio.send(JSON.stringify({
        by: this.fakeUsername || 'admin00',
        type: 'chat',
        msg: this.newChat,
      }))
      this.resetForm();
    },
  },

  computed: {
    filterCastingList() {
      if (this.formState === 'live') {
        return this.castingList.filter(item => item.type !== 'chat');
      }
      return this.castingList;
    }
  },

  created() {
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
    this.$toast(`DISCONENCTED FROM WEBSOCKET`);
  }
}
</script>
