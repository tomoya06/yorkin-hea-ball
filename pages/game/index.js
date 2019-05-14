
const util = require('../../utils/util.js');
Page({
  data: {
    games: [
    {
      date: '2019-02-27',
      matches: [{
        status: 'live',
        teams: [{
          team: 'lamigo',
        }, {
          team: '兄弟象'
        }]
      }, 
      {
        status: 'live',
        teams: [{
          team: '統一獅',
        }, {
            team: '富邦悍將'
        }]
      }, 
      {
        status: 'live',
        teams: [{
          team: '西武獅',
        }, {
            team: '火腿鬥士'
        }]
      }]
    }, {
      date: '2019-02-27',
      matches: [{
        status: 'live',
        teams: [{
          team: '統一獅',
        }, {
            team: 'lamigo'
        }]
      }, {
        status: 'live',
        teams: [{
          team: '養樂多燕子',
        }, {
            team: '讀賣巨人'
        }]
      }, {
        status: 'live',
        teams: [{
          team: '洛杉磯天使',
        }, {
            team: '休士頓太空人'
        }]
      }]
    },
      {
        date: '2019-02-27',
        matches: [{
          status: 'live',
          teams: [{
            team: '西雅圖水手',
          }, {
              team: '底特律老虎'
          }]
        },
        {
          status: 'live',
          teams: [{
            team: '阪神虎',
          }, {
              team: '東洋鯉'
          }]
        },
        {
          status: 'live',
          teams: [{
            team: '紐約洋基',
          }, {
              team: '波士頓紅襪'
          }]
        }]
      }]
  },
  onLoad(){
    const time = util.formatTime2(new Date());
    let games = this.data.games;
    games[0].date = time.today;
    games[1].date = time.tomorrow;
    games[2].date = time.afterTomorrow;
    this.setData({
      games
    });
  }
})