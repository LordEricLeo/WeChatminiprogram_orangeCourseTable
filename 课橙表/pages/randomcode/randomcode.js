// pages/randomcode/randomcode.js
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
    let user = {
      'username': app.globalData.username,
      'password': app.globalData.password,
      'randomcode': e.detail.value.randomcode
    }
    const requetTask1 = wx.request({
      url: 'https://www.hilzh.xyz/Coursetable/user.asp',
      data: user,
      success: (res) => {
        const requetTask2 = wx.request({
          url: 'https://www.hilzh.xyz/Coursetable/render_user.py',
          success: (res) => {
            const requetTask3 = wx.request({
              url: 'https://www.hilzh.xyz/Coursetable/render_grabcoursetable.py',
              success: (res) => {
                const requetTask4 = wx.request({
                  url: 'https://www.hilzh.xyz/Coursetable/get_json.py',
                  success: (res) => {
                  }
                })
              }
            })
          }
        })
      }
    })
  },

  reset: function() {
    const requetTask1 = wx.request({
      url: 'https://www.hilzh.xyz/Coursetable/render_randomcode.py',
      success: (res) => {
        const requetTask2 = wx.request({
          url: 'https://www.hilzh.xyz/Coursetable/download_img.py',
          success: (res) => {
            wx.redirectTo({
              url: '/pages/randomcode/randomcode',
            })
          }
        })
      }
    })
  }
})