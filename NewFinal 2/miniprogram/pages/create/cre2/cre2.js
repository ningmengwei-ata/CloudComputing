// pages/createinvitation/cre2/cre2.js
const db=wx.cloud.database();
const invation=db.collection('invitation');
const app=getApp()
// const innerAudioContext = wx.createInnerAudioContext()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    date:'',
    dest:['上海虹桥枢纽','上海火车站','上海南火车站','浦东国际机场'],
    index:0,
    time:'12:00',
    max:1
  },
  getNowTime: function() {
    var now = new Date();
    var year = now.getFullYear();
    var month = now.getMonth() + 1;
    var day = now.getDate();
    if(month < 10) {
      month = '0' + month;
    };
    if(day < 10) {
      day = '0' + day;
    };

    var formatDate = year + '-' + month + '-' + day;
    console.log('当前时间',formatDate)
    return formatDate;
  },
  numberchange:function(e){
    console.log(e.detail.value)
    this.setData({
      max: e.detail.value
    })
  },
  bindDateChange: function(e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      date: e.detail.value
    })
  },
  bindPickerChange: function (e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      index: e.detail.value
    })
  },
  bindTimeChange: function (e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      time: e.detail.value
    })
  },
  formSubmit: function (e) {
    // innerAudioContext.play()
    console.log('form发生了submit事件，携带数据为：', e.detail.value);
    wx.showLoading({
      title: '请稍后',
    })
    //向inviation数据库添加数据
    invation.add(
      {
        data:{
          content:e.detail.value.content,
          end:this.data.dest[this.data.index],
          max:this.data.max,
          name:app.globalData.userInfo.nickName,
          number:0,
          time:[e.detail.value.date,e.detail.value.time],
          member:[],
          status:0
        },
        success(res){
            console.log("创建成功",res);
            wx.hideLoading({
              complete: (res) => {
                wx.showToast({
              title: '创建成功！',
              duration:3000
              })
                wx.navigateTo({
                  url: 'url',
                })
              },
            })
          
          },
          fail(res){
            console.log("创建失败",res)
          }
      }
    )
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // innerAudioContext.src = 'https://6461-data-nk0cg-1302648785.tcb.qcloud.la/Audio/CLICK_16.WAV?sign=b0bdf377c2210b31ae637f44b322fba4&t=1595322791'
      this.setData({
        date:this.getNowTime(),
      })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    if(app.globalData.userInfo==null)
    {
      wx.switchTab({
      url: '/pages/frontdemo/frontdemo'})
      wx.showModal({
      title: '提示',
      content: '亲，我们需要获取一下您的头像跟昵称呢',
        success: function (res) {
          if (res.confirm) {//这里是点击了确定以后
              wx.switchTab({
              url: '/pages/index/index'})
          } else {//这里是点击了取消以后
            wx.switchTab({
              url: '/pages/frontdemo/frontdemo'
          })
        }
      }})
    }
      else if(app.globalData.ifexist==false)
      {
      wx.switchTab({
      url: '/pages/frontdemo/frontdemo'})
      wx.showModal({
      title: '提示',
      content: '亲，这边需要您先完善一下个人信息呢',
        success: function (res) {
          if (res.confirm) {//这里是点击了确定以后
            wx.navigateTo({
              url: '/pages/fillinfo/fillinfo'})
          } else {//这里是点击了取消以后
            wx.switchTab({
              url: '/pages/frontdemo/frontdemo'
          })
        }
      }})
    }
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }

})