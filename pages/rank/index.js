Page({
  data: {
    leagues: [],
    rank: [],
    currentTab: 0,
  },
  
  changeTab({ detail }) {
    this.setData({
      currentTab: detail.key
    });
    this.fetchRank(detail.key)
  },

  fetchRank(leagueid) {
    wx.request({
      url: getApp().globalData.host+'/rank/all',
      data: {
        leagueid,
      },
      success: ({ data }) => {
        this.setData({
          rank: data.results,
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
        
        this.fetchRank(data.results[0].l_id)
      }
    })
  },
})