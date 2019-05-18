// pages/topic-info/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    sendValue: '',
    topicTitle: 'content',
    chatters: [],
    socket: null,
  },
  bindinput({ detail }) {
    const sendValue = detail.value;
    this.setData({
      sendValue
    });
  },
  doSend() {
    if (!this.data.sendValue) return;
    this.socket.send({
      data: JSON.stringify({
        by: 'me',
        msg: this.data.sendValue,
        type: 'chat',
      })
    })
    // const param = {
    //   username: 'me',
    //   avatar: '',
    //   msg: this.data.sendValue
    // }
    // let chatters = this.data.chatters
    // chatters.push(param);
    // this.setData({
    //   chatters
    // });
  },
  onLoad(options){
    wx.setNavigationBarTitle({
      title: options.title
    });
    this.setData({
      topicTitle: options.content
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
      const chatters = this.data.chatters;
      const msg = data.type === 'live' ? `LIVE FROM ${data.by} 📢📢📢 ${data.msg}` : `${data.by} : ${data.msg}`;
      chatters.push({
        username: data.by,
        msg,
        avatar: '',
      });
      this.setData({ chatters });
      // if (true) {
      // }
    })

    this.setData({
      socket,
    })
  }
})