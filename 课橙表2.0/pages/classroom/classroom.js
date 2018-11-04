// pages/classroom/classroom.js
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
    let user = wx.getStorageSync('user')
    let username = user.username
    let password = user.password
    let week = app.globalData.week
    let day = new Date().getDay()
    if (day == 0) {
      day = 7
    }
    //根据当下时间判断该上第几节课
    function getCourse() {
      let course
      let hour = new Date().getHours()
      if (hour >= 8 && hour < 10) {
        course = 1
      } else if (hour < 12) {
        course = 3
      } else if (hour < 16) {
        course = 5
      } else if (hour < 19) {
        course = 7
      } else if (hour < 21) {
        course = 9
      } else if (hour < 23) {
        course = 11
      } else {
        course = 1
      }
      return course
    }
    let course = getCourse()
    let stylelist = [{
      'bg': '#7FDBFF',
      'ft': '#0074D9'
    }, {
      'bg': '#7FDBFF',
      'ft': '#0074D9'
    }, {
      'bg': '#7FDBFF',
      'ft': '#0074D9'
    }, {
      'bg': '#7FDBFF',
      'ft': '#0074D9'
    }, {
      'bg': '#7FDBFF',
      'ft': '#0074D9'
    }, {
      'bg': '#7FDBFF',
      'ft': '#0074D9'
    }]
    stylelist[Math.floor(course / 2)] = {
      'bg': '#0074D9',
      'ft': 'white'
    }
    this.setData({
      stylelist: stylelist
    })
    wx.showLoading({
      title: '正在查询...',
    })
    wx.request({
      url: 'https://www.hilzh.xyz/upc/classroom',
      data: {
        username: username,
        password: password,
        course: course,
        day: day,
        week: week
      },
      success: res => {
        if (res.data.errcode == 0) {
          //添加换行
          function newLine(result) {
            let strlist = ['南教空闲', '南堂空闲', '东环空闲', '西环空闲', '东廊空闲', '西廊空闲']
            for (let i = 0; i < 6; i++) {
              result[strlist[i]] = result[strlist[i]].slice(0, 52) + '\n' + result[strlist[i]].slice(52, 104) + '\n' + result[strlist[i]].slice(104, 156) + '\n' + result[strlist[i]].slice(156, 208) + '\n' + result[strlist[i]].slice(208, result[strlist[i]].length)
            }
            return result
          }
          this.setData({
            classroom: newLine(res.data.classroom)
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
  //点击下方导航栏的事件处理
  course: function(e) {
    this.change(e.currentTarget.dataset.i)
  },
  //根据i切换显示的空闲教室，顺带切换导航栏样式
  change: function(i) {
    let user = wx.getStorageSync('user')
    let username = user.username
    let password = user.password
    let week = app.globalData.week
    let day = new Date().getDay()
    if (day == 0) {
      day = 7
    }
    let courselist = [1, 3, 5, 7, 9, 11]
    let course = courselist[i]
    let stylelist = [{
      'bg': '#7FDBFF',
      'ft': '#0074D9'
    }, {
      'bg': '#7FDBFF',
      'ft': '#0074D9'
    }, {
      'bg': '#7FDBFF',
      'ft': '#0074D9'
    }, {
      'bg': '#7FDBFF',
      'ft': '#0074D9'
    }, {
      'bg': '#7FDBFF',
      'ft': '#0074D9'
    }, {
      'bg': '#7FDBFF',
      'ft': '#0074D9'
    }]
    stylelist[i] = {
      'bg': '#0074D9',
      'ft': 'white'
    }
    this.setData({
      stylelist: stylelist
    })
    wx.showLoading({
      title: '正在查询...',
    })
    wx.request({
      url: 'https://www.hilzh.xyz/upc/classroom',
      data: {
        username: username,
        password: password,
        course: course,
        day: day,
        week: week
      },
      success: res => {
        if (res.data.errcode == 0) {
          //添加换行
          function newLine(result) {
            let strlist = ['南教空闲', '南堂空闲', '东环空闲', '西环空闲', '东廊空闲', '西廊空闲']
            for (let i = 0; i < 6; i++) {
              result[strlist[i]] = result[strlist[i]].slice(0, 52) + '\n' + result[strlist[i]].slice(52, 104) + '\n' + result[strlist[i]].slice(104, 156) + '\n' + result[strlist[i]].slice(156, 208) + '\n' + result[strlist[i]].slice(208, result[strlist[i]].length)
            }
            return result
          }
          this.setData({
            classroom: newLine(res.data.classroom)
          })
          wx.hideLoading()
        }
      }
    })
  }
})