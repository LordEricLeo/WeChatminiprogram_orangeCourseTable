//app.js
App({
  onLaunch: function() {
    const phone = wx.getSystemInfoSync()

      env: 'test-6c81b6',
      traceUser: true
    })

    const db = wx.cloud.database({
      env: 'test-6c81b6'
    })

    this.openid()

    this.globalData = {
      screenWidth: phone.screenWidth,
      screenHeight: phone.screenHeight,
      db: db
    }
  },
  openid: function() {
    wx.cloud.callFunction({
      name: 'login',
      success: res => {
        console.log(res)
        let openid = res.result.openid
        this.globalData.openid = openid
      }
    })
  },
  globalData: {}
})