//app.js
App({
  onLaunch: function() {
    const phone = wx.getSystemInfoSync()

    wx.cloud.init({
      env: 'test-6c81b6',
      traceUser: true
    })

    const db = wx.cloud.database({
      env: 'test-6c81b6'
    })

    const fsm = wx.getFileSystemManager()

    this.openid()

    this.globalData = {
      screenWidth: phone.screenWidth,
      screenHeight: phone.screenHeight,
      db: db,
      fsm: fsm
    }
  },
  openid: function() {
    wx.cloud.callFunction({
      name: 'login',
      success: res => {
        let openid = res.result.openid
        this.globalData.openid = openid
      }
    })
  },
  globalData: {}
})