// pages/team-info/index.js
Page({

  data: {
    teamName: 'Lamigo',
    teamCover: 'http://cpbl-elta.cdn.hinet.net/phone/images/team/A02_logo_01.png',
    ranking: 0,
    teamIntro: 'sdddddddddddddddddddddddddddddssdddddddddddddddddddddddddddddssdddddddddddddddddddddddddddddssdddddddddddddddddddddddddddddssddddddddddddddddddddddddddddds'
  },

  onload(option){
    this.setData({
      teamName: option.team
    })
  }
})