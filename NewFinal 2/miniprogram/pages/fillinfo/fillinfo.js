// miniprogram/pages/fillinfo/fillinfo.js
//数据库增删查改的逻辑暂时还有调好
const DB=wx.cloud.database().collection("Personal_Data")
// const _ =db.command
const app = getApp()
const innerAudioContext = wx.createInnerAudioContext()//要个锤子audio
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

  },
  userNameInput(event)
  {
      Name=event.detail.value  
    console.log(event.detail.value)
  },
  Student_idInput:function(e)
  {
      Student_id=e.detail.value
    console.log(e.detail.value)
  },
  ContactInput:function(e)
  {
      Contact=e.detail.value
  console.log(e.detail.value)
},
  CampusInput:function(e)
  {
      Campus=e.detail.value
    console.log(e.detail.value)
  },
  DormInput:function(e)
  {
    Dorm=e.detail.value
    console.log(e.detail.value)
  },
  //增加数据
  addData(){
    //增加边界条件 合理完善功能
    if(Name.length<=1||Student_id<=1||Contact<=1||Campus<=1||Dorm<=1){
    
      wx.navigateTo({
        url: '../fillinfo/fillinfo',
      })
    }
    else{
      if(app.globalData.ifexist==false){
        DB.add({
          data:{
          Name:Name,
          Student_id:Student_id,
          Contact:Contact,
          Campus:Campus,
          Dorm:Dorm
          }, 
          success(res) {
            console.log("添加成功", res)
          },
          
          fail(res) {
            console.log("添加失败", res)
          }
    
        })
        app.globalData.ifexist=true
        wx.switchTab({
          url: '../index/index',
        })
        wx.showToast({
          title: '绑定成功！',
          duration:1000})
      }
      else {
        DB.doc(app.globalData.openid).update({
          data:{
            Name:Name,
            Student_id:Student_id,
            Contact:Contact,
            Campus:Campus,
            Dorm:Dorm
            }, 
            success(res) {
              console.log("更新成功", res)
              app.globalData.ifexist=true
      
            },
            fail(res) {
              console.log("更新失败", res)
            }

        })
      }
      

    }
   
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

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