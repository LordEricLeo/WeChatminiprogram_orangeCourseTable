// pages/coursetable/coursetable.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    screenWidth: app.globalData.screenWidth,
    screenHeight: app.globalData.screenHeight,
    hide: false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    let month = new Date().getMonth() + 1
    //获取近七天的日期
    function getRecentDay(i) {
      let date = new Date()
      let date_ms = date.getTime() + 1000 * 60 * 60 * 24 * i
      date.setTime(date_ms)
      return date.getDate()
    }
    let days = []
    for (let i = new Date().getDay(); i > 0; i--) {
      days.push(getRecentDay(-i))
    }
    for (let i = 0; i < 7 - new Date().getDay(); i++) {
      days.push(getRecentDay(i))
    }
    /*获取标准格式课表信息：
    1）将课程名改为六个字以内
    2）上课地点六个字符以内
    3）在上课地点前加上@字符
    4）添加随机背景色属性
    */
    function getFormatCourse(course) {
      let colorlist = ['#0074D9', '#7FDBFF', '#3D9970', '#39CCCC', '#FFDC00', '#FF4136', '#B10DC9']
      let formatCourse = []
      for (let i = 0; i < course.length; i++) {
        let temp = []
        for (let j = 0; j < course[i].length; j++) {
          if (course[i][j] != null) {
            course[i][j].course_name = String(course[i][j].course_name).slice(0, 6)
            course[i][j].location = course[i][j].location.slice(0, 6)
            course[i][j].at = '@'
            course[i][j].bg = colorlist[Math.floor(Math.random() * 7)]
          }
          temp.push(course[i][j])
        }
        formatCourse.push(temp)
      }
      return formatCourse
    }
    this.setData({
      course: getFormatCourse(app.globalData.course),
      month: month,
      days: days
    })
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  },

  //点击课表之后展示详细课表信息的事件
  showDetailCourse: function(e) {
    let i = e.currentTarget.dataset.i
    let j = e.currentTarget.dataset.j
    if (this.data.course[i][j] != null) {
      let thisCourse = wx.getStorageSync('course')[i][j]
      let detailCourse = {
        course_name: thisCourse.course_name,
        location: thisCourse.location,
        teacher: thisCourse.teacher,
        course_type: thisCourse.course_type,
        credit: thisCourse.credit,
        week: thisCourse.week
      }
      this.setData({
        detailCourse: detailCourse,
        detailShow: true
      })
    }
  },
  hideDetailCourse: function() {
    this.setData({
      detailShow: false
    })
  },
  preventTouchMove: function() {
    //什么也不做来组织滑动触摸传递
  },
  changeHide: function(e) {
    this.setData({
      hide: !this.data.hide
    })
  }
})