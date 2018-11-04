// pages/book/book.js
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
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  },
  //搜索图书名称事件
  search: function(e) {
    let bookname = e.detail.value.bookname
    if (bookname == '') {
      wx.showToast({
        title: '书名不能为空',
        image: '/images/warning.png'
      })
    } else {
      wx.showLoading({
        title: '查询中...',
      })
      wx.request({
        url: 'https://www.hilzh.xyz/upc/book',
        data: {
          bookname: bookname
        },
        success: res => {
          if (res.data.errcode == 0) {
            let noresult = false
            if(!res.data.book[0].title) {
              noresult = true
            }
            this.setData({
              book: res.data.book,
              noresult: noresult
            })
            wx.hideLoading()
          }
        }
      })
    }
  },
  focus: function() {
    this.setData({
      border: '1px solid #0074D9'
    })
  },
  blur: function() {
    this.setData({
      border: '1px solid #AAAAAA'
    })
  }
})