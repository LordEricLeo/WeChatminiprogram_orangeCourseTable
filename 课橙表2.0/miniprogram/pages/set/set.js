// pages/set/set.js
const app = getApp()
const fsm = app.globalData.fsm
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
  },
  background: function() {
    wx.chooseImage({
      success: res => {
        if (res.tempFiles[0].size > 806596) {
          wx.showToast({
            title: '背景图片太大',
            image: '/images/failed.png'
          })
        } else {
          fsm.readFile({
            filePath: res.tempFilePaths[0],
            encoding: 'base64',
            success: res => {
              let base64code = 'data:image/jpeg;base64,' + res.data
              wx.setStorage({
                key: 'bgimg',
                data: base64code,
                success() {
                  wx.showToast({
                    title: '更改背景成功',
                  })
                }
              })
            }
          })
        }
      }
    })
  },
  initBackground: function() {
    wx.showModal({
      title: '注意',
      content: '确定要还原课表背景吗？',
      success: res => {
        if(res.confirm) {
          wx.setStorage({
            key: 'bgimg',
            data: '',
            success() {
              wx.showToast({
                title: '还原成功',
              })
            }
          })
        }
      }
    })
  },
  about: function() {
    wx.navigateTo({
      url: 'about/about',
    })
  }
})