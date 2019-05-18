const io = require('../../utils/weapp.engine.io.js');

Page({
  data: {
    animation:'',
    Height: wx.getSystemInfoSync().windowHeight,
    teams: ['Lamigo', '711'],
    scores: [
      [21, 3],
      [21, 3],
      [1, 3],
      [1, 3],
      [1, 3],
      [1, 3],
      [1, 3],
      [0, 0]
    ],
    lives: [],
    socket: null,
  },
  onLoad(options){
    let teams = this.data.teams;
    teams[0] = options.me;
    teams[1] = options.enemy;
    this.setData({
      teams
    });

    const socket = wx.connectSocket({
      url: `ws://localhost:9999`,
      success: (socket) => {
        console.log('CONNECTED TO WEBSOCKET');
      },
      fail: (error) => {
        console.error(error)
      }
    })

    socket.onMessage(({ data }) => {
      data = JSON.parse(data);
      if (data.type === 'live' || data.type === '*') {
        const lives = this.data.lives;
        lives.unshift(`${data.by}: ${data.msg}`);
        this.setData({ lives });
      }
    })

    this.setData({
      socket,
    })
  },
  
  onUnload() {
    this.data.socket.close();
  }
});