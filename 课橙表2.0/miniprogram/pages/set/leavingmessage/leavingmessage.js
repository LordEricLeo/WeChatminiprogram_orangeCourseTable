// pages/set/leavingmessage/leavingmessage.js
const app = getApp()
const db = app.globalData.db
let nick = false
let userInfo
Page({

  /**
   * 页面的初始数据
   */
  data: {
    screenWidth: app.globalData.screenWidth,
    screenHeight: app.globalData.screenHeight,
    bottomBarShow: true,
    inputBoxShow: false,
    admini: false,
    hide: true,
    i: -1
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    if (app.globalData.openid == 'ovep35BFNuyupmduRmqKPyN_jdkk') {
      this.setData({
        admini: true
      })
    }
    this.dbMessage()
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {
    this.dbMessage()
    wx.stopPullDownRefresh()
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  },
  dbMessage: function() {
    db.collection('messages').get({
      success: res => {
        for (let i = 0; i < res.data.length; i++) {
          let time = new Date()
          time.setTime(res.data[i].time)
          let y = time.getFullYear()
          let m = time.getMonth() + 1
          let d = time.getDate()
          let hh = time.getHours() > 9 ? time.getHours() : '0' + time.getHours()
          let mm = time.getMinutes() > 9 ? time.getMinutes() : '0' + time.getMinutes()
          let ss = time.getSeconds() > 9 ? time.getSeconds() : '0' + time.getSeconds()
          res.data[i].time = y + '年' + m + '月' + d + '日 ' + hh + ':' + mm + ':' + ss
        }
        this.setData({
          messages: res.data
        })
      }
    })
  },
  cancel: function() {
    this.setData({
      bottomBarShow: true,
      inputBoxShow: false
    })
  },
  nick: function(e) {
    nick = e.detail.value
  },
  form: function(e) {
    let content = e.detail.value.content
    let qq = e.detail.value.qq
    let username = app.globalData.username
    let stuid = username
    let avatarUrl = userInfo.avatarUrl
    let gender = userInfo.gender
    if (content == '') {
      wx.showToast({
        title: '内容不能为空',
        image: '/images/failed.png'
      })
    } else {
      if (nick) {
        let nicknames = ['匿名小同学', '一位不愿意透露姓名的人士', '挖呀挖呀挖石油', '亿万欢乐豆富翁']
        let maleNicknames = ['石大吴彦祖', '18号楼扛把子', '哲学家♂', '自由的男人', '南教厕所所长', '一位恶人高调路过', '杰出校友XX康', '我错了我错了我错了', '匿名小同学', '一位不愿意透露姓名的人士', '挖呀挖呀挖石油', '亿万欢乐豆富翁']
        let femaleNicknames = ['石大杨超越', '爱吃萝卜爱吃菜', '小仙女本仙', '燃烧我的卡路里', '网红女主播', '十八线非著名女星', '口红收藏家', '我不听我不听我不听', '匿名小同学', '一位不愿意透露姓名的人士', '挖呀挖呀挖石油', '亿万欢乐豆富翁']
        if (gender == 0) {
          username = nicknames[Math.floor(Math.random() * 4)]
        } else if (gender == 1) {
          username = maleNicknames[Math.floor(Math.random() * 12)]
        } else if (gender == 2) {
          username = femaleNicknames[Math.floor(Math.random() * 12)]
        }
      }
      db.collection('messages').add({
        data: {
          content: content,
          qq: qq,
          username: username,
          time: new Date(),
          avatarUrl: avatarUrl,
          gender: gender,
          stuid: stuid
        },
        success: () => {
          this.setData({
            bottomBarShow: true,
            inputBoxShow: false
          })
          wx.showToast({
            title: '发表成功~'
          })
          wx.startPullDownRefresh()
        }
      })
    }
  },
  getUserInfo: function(e) {
    wx.getSetting({
      success: res => {
        if (!res.authSetting['scope.userInfo']) {
          wx.showToast({
            title: '请允许以留言',
            image: '/images/failed.png'
          })
        } else {
          userInfo = e.detail.userInfo
          this.setData({
            bottomBarShow: false,
            inputBoxShow: true
          })
        }
      }
    })
  },
  showHide: function(e) {
    let openid = e.currentTarget.dataset.openid
    let i = e.currentTarget.dataset.index
    if (openid == app.globalData.openid || app.globalData.openid == 'ovep35BFNuyupmduRmqKPyN_jdkk') {
      this.setData({
        hide: false,
        i: i
      })
    }
  },
  del: function(e) {
    let id = e.currentTarget.dataset.id
    wx.showModal({
      title: '注意',
      content: '确定要删除此条留言吗？',
      success(res) {
        if (res.confirm) {
          db.collection('messages').doc(id).remove({
            success() {
              wx.showToast({
                title: '已删除'
              })
              wx.startPullDownRefresh()
            }
          })
        }
      }
    })
  }
})