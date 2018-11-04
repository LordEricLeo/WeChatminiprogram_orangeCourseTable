// pages/sports/sports.js
Page({

  /**
   * 页面的初始数据
   */
  data: {

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    if (wx.getStorageSync('qrcode')) {
      this.setData({
        qrcode: wx.getStorageSync('qrcode')
      })
    } else {
      let user = wx.getStorageSync('user')
      let username = user.username
      let password = user.password
      wx.showLoading({
        title: '查询二维码中',
      })
      wx.request({
        url: 'https://www.hilzh.xyz/upc/sports',
        data: {
          username: username,
          password: password
        },
        success: res => {
          if (res.data.errcode == 0) {
            this.setData({
              qrcode: res.data.sports
            })
            wx.hideLoading()
            wx.setStorageSync('qrcode', res.data.sports)
          }
        }
      })
    }
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  }
})