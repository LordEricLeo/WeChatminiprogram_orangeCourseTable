// pages/score/score.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    screenWidth: app.globalData.screenWidth,
    screenHeight: app.globalData.screenHeight,
    tab: 1,
    stylelist: ['#0074D9', '', '']
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    let user = wx.getStorageSync('user')
    let username = user.username
    let password = user.password
    wx.showLoading({
      title: '请稍侯...',
    })
    wx.request({
      url: 'https://www.hilzh.xyz/upc/score',
      data: {
        username: username,
        password: password
      },
      success: res => {
        if (res.data.errcode == 0) {
          this.setData({
            score: res.data.score
          })
          wx.hideLoading()
        }
      }
    })
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  },
  //更改标签页序号
  changeTab: function(e) {
    let i = e.currentTarget.dataset.i
    let stylelist = ['', '', '']
    stylelist[i] = '#0074D9'
    this.setData({
      tab: i + 1,
      stylelist: stylelist
    })
  }
})