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
    this.sendComment(this.data.sendValue);
  },

  doLike() {
    this.sendLike();
  },

  doDeleteComment(evt) {
    let uid = evt.target.dataset.uid;
    const userid = getApp().globalData.userid;
    if (uid === userid) {
      wx.showModal({
        title: '提示',
        content: '确认删除留言？',
        success: (res) => {
          if (res.confirm) {
            this.deleteComment(evt);
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

  fetchComments(newsid) {
    wx.request({
      url: getApp().globalData.host + '/news/getcomment',
      data: {
        newsid,
      },
      success: ({ data }) => {
        const comment = data.results;
        this.setData({
          comment,
        })
      }
    })
  },

  sendComment(content) {
    const userid = getApp().globalData.userid;
    const newsid = this.data.details.n_id;
    wx.request({
      url: getApp().globalData.host + '/news/addcomment',
      method: 'POST',
      data: {
        newsid,
        userid,
        content,
      },
      success: ({ data }) => {
        this.fetchComments(newsid);
      }
    })    
  },

  deleteComment(e) {
    const commentid = e.target.dataset.id;
    const newsid = this.data.details.n_id;
    wx.request({
      url: getApp().globalData.host + '/news/deletecomment',
      method: 'POST',
      data: {
        commentid,
      },
      success: ({ data }) => {
        this.fetchComments(newsid);
      }
    })
  },

  checkLike(newsid) {
    wx.request({
      url: getApp().globalData.host + '/news/findlike',
      data: {
        newsid,
        userid: getApp().globalData.userid,
      },
      success: ({ data }) => {
        this.setData({
          isLike: data.results.length === 0,
        })
      }
    })
  },

  sendLike() {
    const url = getApp().globalData.host + (this.data.isLike ? '/news/like' : '/news/dislike');
    const newsid = this.data.details.n_id;
    wx.request({
      url,
      method: 'POST',
      data: {
        newsid,
        userid: getApp().globalData.userid,
      },
      success: ({ data }) => {
        this.checkLike(newsid);
        this.fetchNews(newsid);
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
    this.checkLike(_id);
    this.fetchComments(_id);

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