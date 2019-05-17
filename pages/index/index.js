Page({
  data: {
    leagues: [],
    news: [],
    currentTab: 0,
  },

  changeTab({ detail }) {
    this.setData({
      currentTab: detail.key
    });
    this.fetchNews(detail.key);
  },

  navigate({ currentTarget }){
    const dataset = currentTarget.dataset;
    wx.navigateTo({
      url: `/pages/news-details/index?id=${dataset.id}`,
    });
  },

  fetchNews(leagueid) {
    wx.request({
      url: getApp().globalData.host+'/news/all',
      data: {
        leagueid,
      },
      success: ({ data }) => {
        this.setData({
          news: data.results,
        })
      }
    })
  },

  onLoad() {
    wx.request({
      url: getApp().globalData.host+'/league/all',
      success: ({ data }) => {
        this.setData({
          leagues: data.results,
          currentTab: data.results[0].l_id,
        })
        this.fetchNews(data.results[0].l_id);
      }
    })
  },
})