Page({
  data: {
    groupContent: '',
    groupName: '',
    addIndex: 0,
    isMask: false,
    categories: [{
        title: 'League',
        topics: [{
          title: 'topic 1',
          date: '2019-03-03',
          time: '11:52',
          content: '123456'
        }, {
          title: 'topic 1',
          date: '2019-03-03',
          time: '11:52',
          content: '123456'
        }, {
          title: 'topic 1',
          date: '2019-03-03',
          time: '11:52',
          content: '123456'
        }]
      }, {
        title: 'Stars',
        topics: [{
          title: 'topic 1',
          date: '2019-03-03',
          time: '11:52',
          content: '123456'
        }, {
          title: 'topic 1',
          date: '2019-03-03',
          time: '11:52',
          content: '123456'
        }]
      },
      {
        title: 'rumors',
        topics: [{
          title: 'topic 1',
          date: '2019-03-03',
          time: '11:52',
          content: '123456'
        }, {
          title: 'topic 1',
          date: '2019-03-03',
          time: '11:52',
          content: '123456'
        }]
      }, {
        title: 'Gossip',
        topics: [{
          title: 'topic 1',
          date: '2019-03-03',
          time: '11:52',
          content: '123456'
        }, {
          title: 'topic 1',
          date: '2019-03-03',
          time: '11:52',
          content: '123456'
        }]
      }
    ]
  },
  closeMask() {
    this.setData({
      isMask: false
    });
  },
  addGroup(e) {
    const addIndex = e.currentTarget.dataset.index;
    this.setData({
      addIndex,
      isMask: true
    });
  },
  groupName(e) {
    this.setData({
      groupName: e.detail.value
    });
  },
  groupContent(e) {
    this.setData({
      groupContent: e.detail.value
    });
  },
  addNewGroup() {
    const groupName = this.data.groupName;
    const groupContent = this.data.groupContent;
    if (!groupName || !groupContent) {
      return wx.showToast({
        title: '请输入正确的内容',
        icon: 'none',
        duration: 2000
      })
    }
    let categories = this.data.categories;
    const addIndex = this.data.addIndex;
    const myDate = new Date(); //获取系统当前时间
    const myYear = myDate.getFullYear();
    const myMonth = myDate.getMonth();
    const myDay = myDate.getDate();
    let myHours = myDate.getHours();
    myHours = myHours < 10 ? `0${myHours}` : myHours;
    let myMinutes = myDate.getMinutes();
    myMinutes = myMinutes < 10 ? `0${myMinutes}` : myMinutes;
    const date = `${myYear}-${myMonth}-${myDay}`;
    const time = `${myHours}:${myMinutes}`;
    const params = {
      date,
      time,
      title: groupName,
      content: groupContent
    }
    categories[addIndex].topics.push(params)
    this.setData({
      categories,
      isMask: false
    });
  }
})