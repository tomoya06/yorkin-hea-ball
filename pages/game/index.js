const util = require('../../utils/util.js');

Page({
  data: {
    games: []
  },
  onLoad(){
    wx.request({
      url: getApp().globalData.host+'/gamelive/allgames',
      success: ({ data }) => {
        const newgames = [];
        const newdates = [];
        data.results.forEach((match) => {
          const date = match.g_time.slice(0, 10);
          const idx = newdates.indexOf(date);
          match.status = '';
          match.teams = [{
            team: match.g_team_a_name,
          }, {
            team: match.g_team_b_name,
          }];
          if (idx < 0) {
            newgames.push({
              date,
              matches: [match],
            });
            newdates.push(date);
          } else {
            newgames[idx].matches.push(match);
          }
        })
        this.setData({
          games: newgames,
        })
      }
    })
  }
})