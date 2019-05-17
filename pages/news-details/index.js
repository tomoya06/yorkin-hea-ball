import _news from '../../news/news.js'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    details: {},
    sendValue: '',
    isLike: true,
    comment: []
  },
  bindinput({ detail }) {
    const sendValue = detail.value;
    this.setData({
      sendValue
    });
  },
  doSend() {
    if (!this.data.sendValue) return;
    const param = {
      username: 'me',
      usertext: this.data.sendValue,
      id: Date.now(),
    }
    let comment = this.data.comment;
    comment.push(param);
    this.setData({
      comment
    });
  },
  doLike() {
    this.setData({
      isLike: !this.data.isLike
    });
  },
  doDeleteComment(evt) {
    let item = evt.target.dataset.cmt;
    if (item.username === 'me') {
      wx.showModal({
        title: '提示',
        content: '确认删除留言？',
        success: (res) => {
          if (res.confirm) {
            let comment = this.data.comment.filter(cmt => cmt.id !== item.id);
            this.setData({
              comment
            });
          } else if (res.cancel) {
            console.log('用户点击取消')
          }
        }
      })
    }
  },

  fetchNews(newsid) {
    wx.request({
      url: getApp().globalData.host+'/news/find',
      data: {
        newsid,
      },
      success: ({ data }) => {
        const details = data.results[0];
        details.n_time = details.n_time.substring(0, 10);
        this.setData({
          details,
        })
      }
    })
  },
  check(e) {
    const url = e.target.dataset.src;
    wx.previewImage({
      urls: [url],
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    const _id = options.id;
    const _index = options.index;

    this.fetchNews(_id);
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  }
})