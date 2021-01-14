// pages/userinfo/userinfo.js
//对应的是我的信息页
const db=wx.cloud.database()//这个没改的话直接全部复制我的就行，包括wxml以及wxss
const _ =db.command
const app = getApp()
const innerAudioContext = wx.createInnerAudioContext()
let OPENID=app.globalData.openid
let Name=""
let Student_id=""
let Contact=""
let Campus=""
let Dorm=""
Page({
  /**
   * 页面的初始数据
   */
  data: {
    Personal:[],
  },
  revise:function()
  {  
     innerAudioContext.play()
    wx.showModal({
      title: '提示',
      content: '亲，您确认要重新绑定个人信息吗？',
        success: function (res) {
          if (res.confirm) {//这里是点击了确定以后
            wx.navigateTo({
              url: '../fillinfo/fillinfo',
            })
          } else {//这里是点击了取消以后
        }
      }})
 
  },
  logout:function()
  {
    innerAudioContext.play()
    wx.showModal({
      title: '提示',
      content: '亲，您确认要注销个人信息吗？',
        success: function (res) {
          if (res.confirm) {//这里是点击了确定以后
            wx.cloud.callFunction({
              name:'cloudremove',
              complete: res => {
                app.globalData.ifexist=false
                console.log("deletRes",res)
                wx.switchTab({
                  url: '../index/index',
                })
               }})
               wx.showToast({
                title: '注销成功！',
                duration:1000})
          } else {//这里是点击了取消以后
        }
      }})
    
      

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    innerAudioContext.src = 'https://6461-data-nk0cg-1302648785.tcb.qcloud.la/Audio/CLICK_16.WAV?sign=b0bdf377c2210b31ae637f44b322fba4&t=1595322791'
    this.getdata()
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },
  async getdata(){
    wx.showLoading({
      title: '加载中',
    })
    let res= await db.collection('Personal_Data').where({
      OPENID:app.globalData.openid
    }).get()
    console.log("app.globalData.openid是啥",OPENID)
    console.log("打印测试",res)
   if(res.data.length>0){
     this.setData({
       Personal:res.data
     })
     console.log("res.data是撒",res.data)
   }
   wx.hideLoading({
  })

  }
  
})