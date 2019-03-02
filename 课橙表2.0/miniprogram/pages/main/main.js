// pages/main/main.js
const app = getApp()
const db = app.globalData.db
Page({

  /**
   * 页面的初始数据
   */
  data: {
    screenWidth: app.globalData.screenWidth,
    screenHeight: app.globalData.screenHeight
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    if (wx.getStorageSync('user')) {
      let user = wx.getStorageSync('user')
      app.globalData.username = user.username
      if (wx.getStorageSync('first')) {
        wx.navigateTo({
          url: '/pages/coursetable/coursetable',
        })
      }
      //计算当前周数
      function nowWeek() {
        db.collection('settings').get({
          success: res => {
            let differdays = new Date().getTime() - res.data[0].termBeginDate.getTime()
            differdays = Math.floor(differdays / (1000 * 60 * 60 * 24))
            app.globalData.week = Math.floor(differdays / 7) + 1
          }
        })
      }
      nowWeek()
    } else {
      wx.redirectTo({
        url: '/pages/login/login',
      })
    }
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  },

  //点击课表图标事件
  course: function() {
    wx.navigateTo({
      url: '/pages/coursetable/coursetable',
    })
  },
  classroom: function() {
    wx.navigateTo({
      url: '/pages/classroom/classroom',
    })
  },
  sports: function() {
    wx.navigateTo({
      url: '/pages/sports/sports',
    })
  },
  book: function() {
    wx.navigateTo({
      url: '/pages/book/book',
    })
  },
  card: function() {
    wx.showToast({
      title: '敬请期待',
      icon: 'none'
    })
  },
  score: function() {
    wx.navigateTo({
      url: '/pages/score/score',
    })
  },
  setting: function() {
    wx.navigateTo({
      url: '/pages/set/set',
    })
  }
})