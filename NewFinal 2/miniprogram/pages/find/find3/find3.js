const db= wx.cloud.database()//调用数据库
const invites_col= db.collection('invitation')//获取数据库中的数据
const reasons_col= db.collection('reason')//获取数据库中的数据
const Personal_Data_col= db.collection('Personal_Data')//获取数据库中的数据
const app=getApp()
const innerAudioContext = wx.createInnerAudioContext()
Page({

  data :{
    detail:{},//声明一个对象
    formData:[],
    content:"",
    inviteid:"",//邀请的id
    recipient:"",//创建人id
    phone:"",//申请人的电话
    focus:false,
    cunzai:false//是否有申请
  },

  toFind2:function(){
    innerAudioContext.play()
    wx.navigateTo({
      url: '../find2/find2',
    })
  },

  toFind1:function(){
    innerAudioContext.play()
    wx.navigateTo({
      url: '../find1/find1',
    })
  },

  bindData: function (e) {
    const obj = {};
    const setOBJ = e.currentTarget.dataset.origin;
    obj[setOBJ] = e.detail.value;
    this.setData(obj)
    console.log("obj打印测试",obj)
  },
  onLoad:  async function(options){
    innerAudioContext.src = 'https://6461-data-nk0cg-1302648785.tcb.qcloud.la/Audio/CLICK_16.WAV?sign=b0bdf377c2210b31ae637f44b322fba4&t=1595322791'
 
    var that = this
    await this.setData({
      detail:app.globalData.nowinvation
    })
   // console.log("111",app.globalData.userInfo.nickName)
   await  Personal_Data_col.where({
      OPENID:app.globalData.openid
    }).get().then(res=>{
      that.setData({
        phone:res.data[0].Contact
      })
    })
    console.log("打印detail测试",this.data.detail)
    await reasons_col.where({
      _openid:app.globalData.openid,
      invite_name:this.data.detail._id
    }).get().then(res=>{
     // console.log(res)
      if(res.data.length!=0)
      {
        that.setData({
          cunzai:true,
          content:res.data[0].content
        })
      }
      else{
      }
    })
    wx.hideLoading({
    })
  },
  addFormData:async function(){
    var that = this;
    console.log(this.data.content)
    reasons_col.add({
      data:{
        content: this.data.content,
        invite_name:this.data.detail._id,
        flag:false,
        recipient:this.data.detail._openid,
        phone:this.data.phone,  //这里同上，要创建个人信息后才能上传phone
        idname:app.globalData.userInfo.nickName,
        end:app.globalData.nowinvation.end,
        time:app.globalData.nowinvation.time
      },
      async success(res){
        console.log("添加成功",res)
      await that.onLoad()
      wx.showToast({
        title: '成功',
        icon: 'succes',
        duration: 1000,
        mask:true
    })
      },
      fail(res){
        console.log("添加错误",res)
      }
    })
  },
  bindTextAreaBlur: async function(e) {
    console.log(e.detail.value);
    var that = this;
    that.setData({
      content: e.detail.value
    })   
},
bindtype:async function() {
  innerAudioContext.play()
  var that = this;
  await this.setData({
    focus:false
  })
  wx.showModal({
    title: '提示',
    content: '确认发送申请?',
    success: function (res){
      if (res.cancel) {
        //点击取消,默认隐藏弹框
     } else {
        that.addFormData()
     }
    }
})
},
bindchange:async function() {
  innerAudioContext.play()
  var that = this;
  await this.setData({
    focus:false
  })
  wx.showModal({
    title: '提示',
    content: '确认要修改申请?',
    success: function (res){
      if (res.cancel) {
        //点击取消,默认隐藏弹框
     } else {
        that.changeFormData()
     }
    }
})
},
changeFormData:async function(){
  innerAudioContext.play()
  var that = this;
  console.log(this.data.content)
  reasons_col.where({
    _openid:app.globalData.openid,
    invite_name:this.data.detail._id
  }).update({
    data:{
      content: this.data.content,
      invite_name:this.data.detail._id,
      flag:true,
      recipient:this.data.detail._openid,
      phone:this.data.phone  //这里同上，要创建个人信息后才能上传phone
    },
    async success(res){
      console.log("添加成功",res)
     await wx.showToast({
        title: '成功',
        icon: 'succes',
        duration: 1000,
        mask:true
    })
    await that.onLoad()
    },
    fail(res){
      console.log("添加错误",res)
    }
  })
},
})