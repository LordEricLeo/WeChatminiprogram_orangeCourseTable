// pages/set/set.js
Page({

  /**
   * 页面的初始数据
   */
  data: {

  },

  onLoad: function(opstions) {
    if (wx.getStorageSync('first')) {
      this.setData({
        first: wx.getStorageSync('first')
      })
    }
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  },
  //将课表设为首页事件
  course: function(e) {
    let first = e.detail.value
    wx.setStorageSync('first', first)
  },
  connect: function() {
    wx.navigateTo({
      url: 'leavingmessage/leavingmessage',
    })
  },
  logout: function() {
    wx.showModal({
      title: '',
      content: '确定要退出吗？',
      confirmColor: '#0074D9',
      success: res => {
        if (res.confirm) {
          wx.removeStorageSync('user')
          wx.reLaunch({
            url: '/pages/login/login',
          })
        }
      }
    })
  }
})