// miniprogram/pages/frontdemo/frontdemo.js
const app=getApp()
const DB=wx.cloud.database().collection('Personal_Data')
Page({

  /**
   * 页面的初始数据
   */
  data: {

  },


  /**
   * 生命周期函数--监听页面加载
   */
  //这个函数的意思是一加载就执行的函数
  onLoad: async function (options) {
    wx.cloud.callFunction({
      name:'getopenid',
      complete:res=>{
        console.log('获取openid:',res.result.openid)
        app.globalData.openid = res.result.openid
        console.log("全局变量测试",app.globalData.openid)
      }
    })//在这里增加一个获取openid的函数  
    let res= await DB.where({
      OPENID:app.globalData.openid
    }).get()
    if (res.data.length!=0){
      app.globalData.ifexist=true
           console.log(app.globalData.ifexist)
    }
    console.log("res打印测试",res)
  
  },
  jumpfind(){
    console.log("Page内全局变量测试",app.globalData)

    if(app.globalData.userInfo==null){
      wx.showModal({
        title: '提示',
        content: '亲，我们首先需要获取一下您的头像跟昵称呢',
          success: function (res) {
            if (res.confirm) {//这里是点击了确定以后
                wx.switchTab({//wx.switchTab是干什么用的
                url: '/pages/frontdemo/frontdemo'})
            } else {//这里是点击了取消以后
          }
        }}
        )

    }
    if (app.globalData.ifexist==false){
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
        url: '/pages/find/find1/find1'
      })//微信内页面跳转
    }
    
  
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