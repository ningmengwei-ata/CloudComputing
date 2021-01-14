//index.js
//获取应用实例
const db=wx.cloud.database()
// const _ =db.command
const app = getApp()
const innerAudioContext = wx.createInnerAudioContext()//要个锤子audio
Page({
  data: {
    canIUse: wx.canIUse("button.open-type.getUserInfo")
  },
  bindGetUserInfo: function (e) {
    console.log(e)
    app.globalData.userInfo=e
    console.log("全局变量打印测试",app.globalData.userInfo)
  },
  testfun(){
    console.log("Page内全局变量测试",app.globalData)
  },
  //事件处理函数
  //获取个人信息函数
  getmyinfo(){
    console.log("Page内全局变量测试",app.globalData)

    if(app.globalData.userInfo==null){
      wx.showModal({
        title: '提示',
        content: '亲，我们首先需要获取一下您的头像跟昵称呢',
          success: function (res) {
            if (res.confirm) {//这里是点击了确定以后
                wx.switchTab({//wx.switchTab是干什么用的
                url: '/pages/index/index'})
            } else {//这里是点击了取消以后
          }
        }}
        )

    }
    else if (app.globalData.ifexist==false){
      wx.showModal({
        title: '提示',
        content: '亲，这边需要您先完善一下个人信息呢',
          success: function (res) {
            if (res.confirm) {//这里是点击了确定以后
              wx.navigateTo({//注意wx.navigateTo和switchTab的区别
                url: '/pages/fillinfo/fillinfo'})
            } else {//这里是点击了取消以后
          }
        }})
    }
    else if (app.globalData.ifexist==true){
      wx.navigateTo({
        //当已经存在个人信息的时候
        url: '/pages/fillinfo/fillinfo'
      })//微信内页面跳转
    }

  },
  //获取个人旅程信息函数
  //这两个函数只有跳转的URL不一样
  getmytrip(){
    console.log("Page内全局变量测试",app.globalData)

    if(app.globalData.userInfo==null){
      wx.showModal({
        title: '提示',
        content: '亲，我们首先需要获取一下您的头像跟昵称呢',
          success: function (res) {
            if (res.confirm) {//这里是点击了确定以后
                wx.switchTab({//wx.switchTab是干什么用的
                url: '/pages/index/index'})
            } else {//这里是点击了取消以后
          }
        }})

    }
    else if (app.globalData.ifexist==false){
      wx.showModal({
        title: '提示',
        content: '亲，这边需要您先完善一下个人信息呢',
          success: function (res) {
            if (res.confirm) {//这里是点击了确定以后
              wx.navigateTo({//注意wx.navigateTo和switchTab的区别
                url: '/pages/fillinfo/fillinfo'})
            } else {//这里是点击了取消以后
          }
        }})
    }
    else if (app.globalData.ifexist==true){
      wx.navigateTo({
        //当已经存在个人信息的时候
        url: '/pages/create/cre1/cre1'
      })//微信内页面跳转
    }

  },
  topaotui(){
    console.log("Page内全局变量测试",app.globalData)

    if(app.globalData.userInfo==null){
      wx.showModal({
        title: '提示',
        content: '亲，我们首先需要获取一下您的头像跟昵称呢',
          success: function (res) {
            if (res.confirm) {//这里是点击了确定以后
                wx.switchTab({//wx.switchTab是干什么用的
                url: '/pages/index/index'})
            } else {//这里是点击了取消以后
          }
        }})

    }
    else if (app.globalData.ifexist==false){
      wx.showModal({
        title: '提示',
        content: '亲，这边需要您先完善一下个人信息呢',
          success: function (res) {
            if (res.confirm) {//这里是点击了确定以后
              wx.navigateTo({//注意wx.navigateTo和switchTab的区别
                url: '/pages/fillinfo/fillinfo'})
            } else {//这里是点击了取消以后
          }
        }})
    }
    else if (app.globalData.ifexist==true){
      wx.navigateTo({
        //当已经存在个人信息的时候
        url: '/pages/me/me'
      })//微信内页面跳转
    }
    

  },
 
  getmymarket(){
    console.log("Page内全局变量测试",app.globalData)

    if(app.globalData.userInfo==null){
      wx.showModal({
        title: '提示',
        content: '亲，我们首先需要获取一下您的头像跟昵称呢',
          success: function (res) {
            if (res.confirm) {//这里是点击了确定以后
                wx.switchTab({//wx.switchTab是干什么用的
                url: '/pages/index/index'})
            } else {//这里是点击了取消以后
          }
        }})

    }
    else if (app.globalData.ifexist==false){
      wx.showModal({
        title: '提示',
        content: '亲，这边需要您先完善一下个人信息呢',
          success: function (res) {
            if (res.confirm) {//这里是点击了确定以后
              wx.navigateTo({//注意wx.navigateTo和switchTab的区别
                url: '/pages/fillinfo/fillinfo'})
            } else {//这里是点击了取消以后
          }
        }})
    }
    else if (app.globalData.ifexist==true){
      wx.navigateTo({
        //当已经存在个人信息的时候
        url: '/pages/secondhandstore/cre1/cre1'
      })//微信内页面跳转
    }

  },



 //获取用户头像的浇水粘合
  onLoad: function () {
    // innerAudioContext.src = 'https://6461-data-nk0cg-1302648785.tcb.qcloud.la/Audio/CLICK_16.WAV?sign=b0bdf377c2210b31ae637f44b322fba4&t=1595322791'
    if (app.globalData.userInfo) {
      this.setData({
        userInfo: app.globalData.userInfo,
        hasUserInfo: true
      })
     
    } else if (this.data.canIUse){
      // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
      // 所以此处加入 callback 以防止这种情况
      app.userInfoReadyCallback = res => {
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true
        })
      }
    } else {
      // 在没有 open-type=getUserInfo 版本的兼容处理
      wx.getUserInfo({
        success: res => {
          app.globalData.userInfo = res.userInfo
          this.setData({
            userInfo: res.userInfo,
            hasUserInfo: true
          })

        }
      })
    }
   
  },
  getUserInfo: function(e) {
    console.log(e)
    app.globalData.userInfo = e.detail.userInfo
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
  },
  
 
})
