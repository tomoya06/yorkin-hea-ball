Page({
  data: {
    animation:'',
    Height: wx.getSystemInfoSync().windowHeight,
    teams: ['Lamigo', '711'],
    scores: [
      [21, 3],
      [21, 3],
      [1, 3],
      [1, 3],
      [1, 3],
      [1, 3],
      [1, 3],
      [0, 0]
    ],
    lives: ['1111111111111111111111',
      '55555555555555555555555',
      "zzzzzzzzzzzzzzzz",
      '1111111111111111111111',
      "gggggggggggg",
      '1111111111111111111111',
      '55555555555555555555555',
      "zzzzzzzzzzzzzzzz",
      '1111111111111111111111',
      "gggggggggggg",
      "hhhhhhhhhhhhh",
      "zzzzzzzzzzzzzzzz",
      '1111111111111111111111',
      "gggggggggggg",
      "hhhhhhhhhhhhh",
      "zzzzzzzzzzzzzzzz",
      '1111111111111111111111',
      '55555555555555555555555'
    ],
    barrage:[]
  },
  onLoad(options){
    let teams = this.data.teams;
    teams[0] = options.me;
    teams[1] = options.enemy;
    this.setData({
      teams
    });
    this.barrage();
  },
  barrage(){
    let lives = this.data.lives;
    let barrage = this.data.barrage;
    for (let i in lives){
      barrage.push(new Doomm(lives[i],i*.5));
    }
    this.setData({
      barrage
    });
  }
});
// 动画添加延迟时间
class Doomm {
  constructor(text, time) {
    this.text = text;
    this.time = time;
  }
}