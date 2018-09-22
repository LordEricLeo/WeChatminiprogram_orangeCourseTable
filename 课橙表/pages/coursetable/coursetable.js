// pages/coursetable/coursetable.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    scrollTop: 20,
    month: '',
    sundaydate: ''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    let randomcolor = ['red', 'orange', 'yellow', 'green', 'blue', 'purple']
    let date = new Date()
    let year = date.getFullYear()
    let feb //计算二月天数
    if (year % 4 != 0) {
      feb = 28
    } else {
      if (year % 100 != 0) {
        feb = 29
      } else if (year % 400 === 0) {
        feb = 29
      } else {
        feb = 28
      }
    } //判断是否是闰年
    let daypermonth = [31, feb, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31] //一年中每个月份的天数
    let month = date.getMonth() + 1
    let sundaydate = date.getDate() - date.getDay()
    if (sundaydate <= 0) {
      sundaydate += daypermonth[month - 2]
    } //如果小于0就加上上个月的天数,上个月-1，数组0开始又-1，共-2
    let day = date.getDate() - 9
    for (let i = 9; i < month; i++) {
      day += daypermonth[i - 1]
    } //计算距开学起第一个周日9.9号的天数
    let week = Math.floor(day / 7) + 1 //距开学第一周的周数
    const file = wx.getFileSystemManager()
    file.readFile({
      filePath: `${wx.env.USER_DATA_PATH}/coursetable.json`,
      encoding: 'utf-8',
      success: (res) => {
        let coursetable = JSON.parse(res.data)
        let atsymbol = []
        for (let i = 0; i < 6; i++) {
          let temp = []
          for (let j = 0; j < 7; j++) {
            if (coursetable[i][j]['课程名称'] === '') {
              temp.push('')
            } else {
              temp.push('@')
            }
          }
          atsymbol.push(temp)
        }
        let courseviewstyle = []
        for (let i = 0; i < 6; i++) {
          let temp = []
          for (let j = 0; j < 7; j++) {
            if (coursetable[i][j]['课程名称'] === '') {
              temp.push('course-viewstyle')
            } else {
              let tempstr = coursetable[i][j]['上课时间']
              tempstr = tempstr.slice(0, tempstr.indexOf('周')) //把周数提取出来
              let strlist = tempstr.split(',') //把字符串按,分割成一段和两段周
              if (strlist.length === 1) {
                strlist = strlist[0].split('-') //把字符串按-分割成开始周和结束周
                let startweek = strlist[0]
                let endweek = strlist[1]
                if (week >= startweek && week <= endweek) {
                  let random = Math.floor(Math.random() * 6) //0到5之间的随机数，用来设置随机颜色
                  temp.push('course-viewstyle-' + randomcolor[random])
                } else {
                  temp.push('course-viewstyle-gray')
                }
              } else if (strlist.length === 2) {
                let strlist1 = strlist[0].split('-')
                let strlist2 = strlist[1].split('-')
                let startweek1 = strlist1[0]
                let endweek1 = strlist1[1]
                let startweek2 = strlist[0]
                let endweek2 = strlist[1]
                if ((week >= startweek1 && week <= endweek1) || (week >= startweek2 && week <= endweek2)) {
                  let random = Math.floor(Math.random() * 6) //0到5之间的随机数，用来设置随机颜色
                  temp.push('course-viewstyle-' + randomcolor[random])
                } else {
                  temp.push('course-viewstyle-gray')
                }
              }
            }
          }
          courseviewstyle.push(temp)
        }
        this.setData({
          month: month,
          sundaydate: sundaydate,
          coursetable: coursetable,
          atsymbol: atsymbol,
          courseviewstyle: courseviewstyle
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

  }
})