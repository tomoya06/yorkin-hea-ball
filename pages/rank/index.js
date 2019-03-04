// pages/rank/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    rank: [{
      cover: 'http://cpbl-elta.cdn.hinet.net/phone/images/team/A02_logo_01.png',
      team: 'Lamigo',
      score: 98
    }, {
      cover: 'http://cpbl-elta.cdn.hinet.net/pad/images/team/L01_logo_01.png',
      team: '711',
      score: 100
    }],
    currentTab: 'tab1'
  },

  changeTab ({ detail }) {
    this.setData({
        currentTab: detail.key
    });
  },

})