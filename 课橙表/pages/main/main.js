// pages/main/main.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    tip: '上课前20分钟才会提醒上课',
    time: '当前没有课程安排',
    name: '',
    place: ''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    const file = wx.getFileSystemManager()
    try {
      file.accessSync(`${wx.env.USER_DATA_PATH}/user.txt`)
      let username
      try { //如果不存在文件accessSync会报错，catch这个异常，异常说明需要联网下载，不异常说明不需联网下载json
        file.accessSync(`${wx.env.USER_DATA_PATH}/coursetable.json`)
      } catch (error) {
        username = file.readFileSync(`${wx.env.USER_DATA_PATH}/user.txt`, 'utf-8') //这里需要用同步的，因为有了username下面的异步下载才能执行
        let coursetableurl = 'https://www.hilzh.xyz/Coursetable/json/' + username + '.json'
        const downloadTask = wx.downloadFile({
          url: coursetableurl,
          filePath: `${wx.env.USER_DATA_PATH}/coursetable.json`,
          success(res) {
            if (res.statusCode === 200) {

            }
          }
        })
        downloadTask.onProgressUpdate((res) => {
          if (res.progress === 100) {


          }
        })
      }
    } catch (error) {
      wx.redirectTo({
        url: '/pages/login/login',
      })
    }
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
    let day = date.getDate() - 9
    for (let i = 9; i < month; i++) {
      day += daypermonth[i - 1]
    } //计算距开学起第一个周日9.9号的天数
    let week = Math.floor(day / 7) + 1 //距开学第一周的周数
    let hour = date.getHours()
    let minute = date.getMinutes()
    let time = hour * 60 + minute //以分钟为单位方便计算
    let timetable = [480, 590, 610, 720, 840, 950, 970, 1080, 1140, 1250, 1260, 1380]
    let coursetime
    let coursename
    let courseplace
    file.readFile({
      filePath: `${wx.env.USER_DATA_PATH}/coursetable.json`,
      encoding: 'utf-8',
      success: (res) => {
        let coursetable = JSON.parse(res.data)
        for (let i = 0; i < 6; i++) {
          for (let j = 0; j < 7; j++) {
            if (coursetable[i][j]['课程名称'] != '') {
              let tempstr = coursetable[i][j]['上课时间']
              tempstr = tempstr.slice(0, tempstr.indexOf('周')) //把周数提取出来
              let strlist = tempstr.split(',') //把字符串按,分割成一段和两段周
              if (strlist.length === 1) {
                strlist = strlist[0].split('-') //把字符串按-分割成开始周和结束周
                let startweek = strlist[0]
                let endweek = strlist[1]
                if (week >= startweek && week <= endweek) {
                  if (date.getDay() == j) {
                    let temptempstr = coursetable[i][j]['上课时间']
                    temptempstr = temptempstr.slice(temptempstr.indexOf('周') + 2, temptempstr.indexOf('节'))
                    let tempstrlist = temptempstr.split('-')
                    let startnumber = tempstrlist[0]
                    startnumber = parseInt(startnumber)
                    let endnumber = tempstrlist[1]
                    endnumber = parseInt(endnumber)
                    let starttime = timetable[startnumber - 1]
                    let endtime = timetable[endnumber - 1]
                    if ((starttime - time <= 20) && (starttime - time) >= 0) {
                      coursetime = starttime - time
                      coursename = coursetable[i][j]['课程名称']
                      courseplace = coursetable[i][j]['上课地点']
                      this.setData({
                        tip: '距上课时间(分钟)',
                        time: coursetime,
                        name: coursename,
                        place: courseplace
                      })
                    } else if (time > starttime && time < endtime) {
                      coursetime = '正在上课'
                      coursename = coursetable[i][j]['课程名称']
                      courseplace = coursetable[i][j]['上课地点']
                      this.setData({
                        tip: '',
                        time: coursetime,
                        name: coursename,
                        place: courseplace
                      })
                    }
                  }
                }
              } else if (strlist.length === 2) {
                let strlist1 = strlist[0].split('-')
                let strlist2 = strlist[1].split('-')
                let startweek1 = strlist1[0]
                let endweek1 = strlist1[1]
                let startweek2 = strlist[0]
                let endweek2 = strlist[1]
                if ((week >= startweek1 && week <= endweek1) || (week >= startweek2 && week <= endweek2)) {
                  if (date.getDay() == j) {
                    let temptempstr = coursetable[i][j]['上课时间']
                    temptempstr = temptempstr.slice(temptempstr.indexOf('周') + 2, temptempstr.indexOf('节'))
                    let tempstrlist = temptempstr.split('-')
                    let startnumber = tempstrlist[0]
                    startnumber = parseInt(startnumber)
                    let endnumber = tempstrlist[1]
                    endnumber = parseInt(endnumber)
                    let starttime = timetable[startnumber - 1]
                    let endtime = timetable[endnumber - 1]
                    if ((starttime - time <= 20) && (starttime - time) >= 0) {
                      coursetime = starttime - time
                      coursename = coursetable[i][j]['课程名称']
                      courseplace = coursetable[i][j]['上课地点']
                      this.setData({
                        tip: '距上课时间(分钟)',
                        time: coursetime,
                        name: coursename,
                        place: courseplace
                      })
                    } else if (time > starttime && time < endtime) {
                      coursetime = '正在上课'
                      coursename = coursetable[i][j]['课程名称']
                      courseplace = coursetable[i][j]['上课地点']
                      this.setData({
                        tip: '',
                        time: coursetime,
                        name: coursename,
                        place: courseplace
                      })
                    }
                  }
                }
              }
            }
          }
        }
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