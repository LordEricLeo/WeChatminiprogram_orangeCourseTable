// components/navbar/navbar.js
const app = getApp()
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    color: {
      type: String,
      value: '#0074D9'
    },
    navback: {
      type: Boolean,
      value: false
    },
    title: {
      type: String,
      value: ''
    },
    course: {
      type: Boolean,
      value: false
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    screenWidth: app.globalData.screenWidth,
    screenHeight: app.globalData.screenHeight
  },

  /**
   * 组件的方法列表
   */
  methods: {
    back: function() {
      wx.navigateBack()
    },
    last: function() {
      //回传事件为last函数
      this.triggerEvent('last')
    },
    next: function() {
      //回传事件为next函数
      this.triggerEvent('next')
    }
  }
})