// pages/main/main.js
const app = getApp()
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
      wx.showLoading({
        title: '请稍侯...',
      })
      let user = wx.getStorageSync('user')
      wx.request({
        url: 'https://www.hilzh.xyz/upc/course',
        data: {
          username: user.username,
          password: user.password
        },
        success: res => {
          if (res.data.errcode >= 0) {
            //把没有课程的课用null补全
            function complete(tempclass) {
              let result = []
              for (let i = 0; i < 7; i++) {
                let temp = []
                for (let j = 0; j < 6; j++) {
                  temp.push(null)
                }
                result.push(temp)
              }
              for (let i = 0; i < tempclass.length; i++) {
                for (let j = 0; j < tempclass[i].length; j++) {
                  if (tempclass[i][j].lessons == '0102') {
                    result[i][0] = tempclass[i][j]
                  } else if (tempclass[i][j].lessons == '0304') {
                    result[i][1] = tempclass[i][j]
                  } else if (tempclass[i][j].lessons == '0506') {
                    result[i][2] = tempclass[i][j]
                  } else if (tempclass[i][j].lessons == '0708') {
                    result[i][3] = tempclass[i][j]
                  } else if (tempclass[i][j].lessons == '0910') {
                    result[i][4] = tempclass[i][j]
                  } else if (tempclass[i][j].lessons == '1112') {
                    result[i][5] = tempclass[i][j]
                  } else if (tempclass[i][j].lessons == '01020304') {
                    result[i][0] = tempclass[i][j]
                    result[i][1] = tempclass[i][j]
                  } else if (tempclass[i][j].lessons == '010203') {
                    result[i][0] = tempclass[i][j]
                    result[i][1] = tempclass[i][j]
                  }else if (tempclass[i][j].lessons == '05060708') {
                    result[i][2] = tempclass[i][j]
                    result[i][3] = tempclass[i][j]
                  } else if (tempclass[i][j].lessons == '050607') {
                    result[i][2] = tempclass[i][j]
                    result[i][3] = tempclass[i][j]
                  }else if (tempclass[i][j].lessons == '09101112') {
                    result[i][4] = tempclass[i][j]
                    result[i][5] = tempclass[i][j]
                  } else if (tempclass[i][j].lessons == '091011') {
                    result[i][4] = tempclass[i][j]
                    result[i][5] = tempclass[i][j]
                  } else if (tempclass[i][j].lessons == '0102030405060708') {
                    result[i][0] = tempclass[i][j]
                    result[i][1] = tempclass[i][j]
                    result[i][2] = tempclass[i][j]
                    result[i][3] = tempclass[i][j]
                  }
                }
              }
              return result
            }
            app.globalData.week = res.data.errcode
            app.globalData.course = complete(res.data.class)
            wx.setStorageSync('course', app.globalData.course)
            wx.hideLoading()
            if(wx.getStorageSync('first')) {
              wx.navigateTo({
                url: '/pages/coursetable/coursetable',
              })
            }
          }
        }
      })
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
