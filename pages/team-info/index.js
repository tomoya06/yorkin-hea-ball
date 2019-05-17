Page({
  data: {
    info: {},
  },
  onLoad(options){
    const _id = options.id;
    const _index = options.index;
    
    this.fetchTeam(_id);
  },

  fetchTeam(teamid) {
    wx.request({
      url: getApp().globalData.host+'/rank/find',
      data: {
        teamid,
      },
      success: ({ data }) => {
        const info = data.results[0];
        this.setData({
          info,
        })
      }
    })
  }
})