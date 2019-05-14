import _news from '../../news/news.js'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    details:[],
    sendValue: '',
    isLike: true,
    comment: []
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
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    const _id = options.id;
    const _index = options.index;
    const news = _news.new;
    for (let i in news){
      if (news[i].id != _id) continue;
      this.setData({
        details:news[i].content[_index]
      });
    }
  },
  check(e) {
    return;
    wx.previewImage({
      urls: ['https://ss0.baidu.com/73x1bjeh1BF3odCf/it/u=2465241100,795746670&fm=85&s=B0A9DF165B1240430EE66A530200D0FF'],
    })
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