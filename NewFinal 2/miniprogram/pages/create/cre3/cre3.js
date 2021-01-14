// pages/createinvitation/cre3/cre3.js
const app=getApp()
const db=wx.cloud.database()
const apply=db.collection('reason')
const invite=db.collection('invitation')
const _=db.command
const innerAudioContext = wx.createInnerAudioContext()
Page({

  /**
   * 页面的初始数据
   */
  data: {
      detail:null,
      status:false,
      applyList:[],
      chosen:[]
  },
  change(e){
      this.setData({
        chosen:e.detail.value
      })
      console.log(this.data.chosen)
  },
  formSubmit(e){
    innerAudioContext.play()
    let that=this
    wx.showModal({
      title:'确认',
      content:'本次邀请计划人数为'+this.data.detail.max+'人，你选择了'
      +this.data.chosen.length+'人，确认后将收到对方的联系方式',
      success (res){
        if (res.confirm) {
          invite.doc(app.globalData.openid).update({
            data:{
              member:that.data.chosen,
              status:1
            }
          }).then(res=>{
            
            wx.showToast({
              title: '确认成功',
              duration:2000
            })
          })
          apply.where({
            invite_name:that.data.detail._id,
            _openid:_.in(that.data.chosen)
          }).update({
            data:{
              flag:true
            }
          }).then(res=>{console.log(res)})
          that.setData({
            'detail.member':that.data.chosen
          })
          that.getApplyList()
        } else if (res.cancel) {
        }
      }
    })
  },
getApplyList(){
    apply.where({invite_name:this.data.detail._id}).get({
      success: res =>{
        this.setData({
          applyList:res.data
        })
      }
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad:async function (options) {
    innerAudioContext.src = 'https://6461-data-nk0cg-1302648785.tcb.qcloud.la/Audio/CLICK_16.WAV?sign=b0bdf377c2210b31ae637f44b322fba4&t=1595322791'
    wx.showLoading({
      title: '请稍后',
    })
      this.setData({
        detail:app.globalData.nowinvation
      })
      await this.getApplyList()
      wx.hideLoading({
        success: (res) => {},
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