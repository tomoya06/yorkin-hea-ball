// pages/topic-info/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    sendValue: '',
    topicTitle: 'content',
    chatters: [
    //   {
    //   username: 'me',
    //   avatar: '',
    //   msg: 'gooooood'
    // }, {
    //   username: 'tomoya',
    //   avatar: '',
    //   msg: 'byyyyyyyyyyyyyyebyyyyyyyyyyyyyyebyyyyyyyyyyyyyyebyyyyyyyyyyyyyyebyyyyyyyyyyyyyye'
    // }, {
    //   username: 'tomoya',
    //   avatar: '',
    //   msg: 'byyyyyyyyyyyyyye'
    // }, {
    //   username: 'tomoya',
    //   avatar: '',
    //   msg: 'byyyyyyyyyyyyyye'
    // }, {
    //   username: 'tomoya',
    //   avatar: '',
    //   msg: 'byyyyyyyyyyyyyye'
    // }, {
    //   username: 'tomoya',
    //   avatar: '',
    //   msg: 'byyyyyyyyyyyyyye'
    // }, {
    //   username: 'tomoya',
    //   avatar: '',
    //   msg: 'byyyyyyyyyyyyyye'
    // }, {
    //   username: 'tomoya',
    //   avatar: '',
    //   msg: 'byyyyyyyyyyyyyye'
    // }, {
    //   username: 'tomoya',
    //   avatar: '',
    //   msg: 'byyyyyyyyyyyyyye'
    // }, {
    //   username: 'tomoya',
    //   avatar: '',
    //   msg: 'byyyyyyyyyyyyyye'
    // }, {
    //   username: 'tomoya',
    //   avatar: '',
    //   msg: 'byyyyyyyyyyyyyye'
    // }, {
    //   username: 'tomoya',
    //   avatar: '',
    //   msg: 'byyyyyyyyyyyyyye'
    // }, {
    //   username: 'tomoya',
    //   avatar: '',
    //   msg: 'byyyyyyyyyyyyyye'
    // }, {
    //   username: 'tomoya',
    //   avatar: '',
    //   msg: 'byyyyyyyyyyyyyye'
    // }, {
    //   username: 'tomoya',
    //   avatar: '',
    //   msg: 'byyyyyyyyyyyyyye'
    // }, {
    //   username: 'tomoya',
    //   avatar: '',
    //   msg: 'byyyyyyyyyyyyyye'
    // }, {
    //   username: 'tomoya',
    //   avatar: '',
    //   msg: 'byyyyyyyyyyyyyye'
    // }, {
    //   username: 'tomoya',
    //   avatar: '',
    //   msg: 'byyyyyyyyyyyyyye'
    // }, {
    //   username: 'tomoya',
    //   avatar: '',
    //   msg: 'byyyyyyyyyyyyyye'
    // }
    ]
  },
  bindinput({
    detail
  }) {
    const sendValue = detail.value;
    this.setData({
      sendValue
    });
  },
  doSend() {
    if (!this.data.sendValue) return;
    const param = {
      username: 'me',
      avatar: '',
      msg: this.data.sendValue
    }
    let chatters = this.data.chatters
    chatters.push(param);
    this.setData({
      chatters
    });
  },
  onLoad(options){
    wx.setNavigationBarTitle({
      title: options.title
    });
    this.setData({
      topicTitle: options.content
    });
  }
})