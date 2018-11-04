//app.js
App({
  onLaunch: function() {
    const phone = wx.getSystemInfoSync()
    this.globalData = {
      screenWidth: phone.screenWidth,
      screenHeight: phone.screenHeight
    }
  },
  globalData: {}
})