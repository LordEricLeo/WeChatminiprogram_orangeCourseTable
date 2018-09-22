// pages/login/login.js
const app = getApp()
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
    const requetTask1 = wx.request({
      url: 'https://www.hilzh.xyz/Coursetable/render_randomcode.py',
      success: (res) => {
        const requetTask2 = wx.request({
          url: 'https://www.hilzh.xyz/Coursetable/download_img.py',
          success: (res) => {
          }
        })
      }
    })
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

  formSubmit: function(e) {
    let userinfo = e.detail.value
    app.globalData.username = userinfo.username
    app.globalData.password = userinfo.password
    const file = wx.getFileSystemManager()
    file.writeFile({
      filePath: `${wx.env.USER_DATA_PATH}/user.txt`,
      data: userinfo.username
    })
  }
})