// pages/Register/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    accountValue: '',
    passwordValue: '',
    confirmValue: '',
  },

  doSignup() {
    if (this.data.accountValue === ''
      || this.data.passwordValue === ''
      || this.data.confirmValue === '') {
        wx.showToast({
          title: '不要留空靴靴',
          icon: 'none',
          duration: 2000
        });
        return;
    }
    if (this.data.passwordValue !== this.data.confirmValue) {
      wx.showToast({
        title: '两次输入的密码不一致',
        icon: 'none',
        duration: 2000
      });
      return;
    }
    
    wx.navigateBack({ 
      delta: 1,
      complete: () => {
        wx.showToast({
          title: '注册成功',
          icon: 'none',
          duration: 2000,
        });
      }
    });
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
  
  getConfirm({
    detail
  }) {
    const confirmValue = detail.value;
    this.setData({
      confirmValue
    });
  },
})