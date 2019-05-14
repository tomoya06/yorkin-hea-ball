import _ranks from '../../ranks/ranks.js'
Page({
  data: {
    rank: _ranks.ranks,
    currentTab: '0'
  },
  changeTab({
    detail
  }) {
    this.setData({
      currentTab: detail.key
    });
  },
})