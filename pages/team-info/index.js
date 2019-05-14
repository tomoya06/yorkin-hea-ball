import _ranks from '../../ranks/ranks.js'
Page({
  data: {
    info:[],
    teamName: 'Lamigo',
    teamCover: '/src/image/A02_logo_01.png',
    ranking: 0,
    teamIntro: 'sdddddddddddddddddddddddddddddssdddddddddddddddddddddddddddddssdddddddddddddddddddddddddddddssdddddddddddddddddddddddddddddssddddddddddddddddddddddddddddds'
  },
  onLoad(options){
    const _id = options.id;
    const _index = options.index;
    const ranks = _ranks.ranks;
    for(let i in ranks){
      if (ranks[i].id == _id){
        this.setData({
          info:ranks[i].content[_index]
        });
        break;
      }
    }
  }
})