import _news from '../../news/news.js'
Page({
  data: {
    news: _news.new,
    currentTab: '0'
  },
  changeTab({
    detail
  }) {
    this.setData({
      currentTab: detail.key
    });
  },
  navigate({ currentTarget}){
    const dataset = currentTarget.dataset;
    wx.navigateTo({
      url: `/pages/news-details/index?id=${dataset.id}&index=${dataset.index}`,
    });
  }
})