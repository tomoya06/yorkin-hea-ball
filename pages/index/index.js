// pages/index/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    news: [{
      cover: 'https://assets.goodstatic.com/s3/magazine/others/meta/GoodLogo2.png',
      title: 'news 1'
    }, {
      cover: 'https://assets.goodstatic.com/s3/magazine/others/meta/GoodLogo2.png',
      title: 'news 1'
    }],
    currentTab: 'tab1'
  },
  
  changeTab ({ detail }) {
    this.setData({
        currentTab: detail.key
    });
  },
})