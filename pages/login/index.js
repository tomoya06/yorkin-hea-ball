// pages/login/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    accountValue: '',
    passwordValue: '',
  },
  doLogin() {
    const accountValue = this.data.accountValue;
    const passwordValue = this.data.passwordValue;
    const accounts = this.data.accounts;
    if (!accountValue){
      wx.showToast({
        title: '请输入账号',
        icon: 'none',
        duration: 2000
      });
      return;
    }
    if (!passwordValue) {
      wx.showToast({
        title: '请输入密码',
        icon: 'none',
        duration: 2000
      });
      return;
    }
    wx.request({
      url: 'http://localhost:3000/user/login',
      method: 'POST',
      data: {
        name: this.data.accountValue,
        pwd: this.data.passwordValue,
      },
      success: function(res) {
        console.log(res);
        const { data } = res;
        if (data.results.length == 0) {
          wx.showToast({
            title: '输入密码错误',
            icon: 'none',
            duration: 2000
          });
          return ;
        }
        getApp().globalData.userid = data.results[0].u_id;
        wx.showToast({
          title: '登录成功',
          icon: 'success',
          mask:true,
          duration: 2000
        });
        setTimeout(()=>{
          wx.reLaunch({
            url: '/pages/index/index',
          });
        },500);
      },
      fail: function(error) {
        console.log(error);
      }
    })
  },
  getAccount({
    detail
  }) {
    const accountValue = detail.value;
    this.setData({
      accountValue
    });
  },
  getPassword({
    detail
  }) {
    const passwordValue = detail.value;
    this.setData({
      passwordValue
    });
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {

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