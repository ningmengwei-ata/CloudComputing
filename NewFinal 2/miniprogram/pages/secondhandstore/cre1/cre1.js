// miniprogram/pages/secondhandstore/secondhandstore.js
const db = wx.cloud.database().collection("testmarket")
const _ =db.command
const app = getApp()
const innerAudioContext = wx.createInnerAudioContext()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    goodsList:[],
    inputValue:"",
    step: 1,
    counterId: '',
    openid: '',
    count: null,
    queryResult: '',
  },

  delete_this: function(event) {
    let value= event.currentTarget.dataset.value
    console.log("value："+value)
    db.doc(value).remove({
      success: res => {
/*         if (app.globalData.openid) {
          this.setData({
            openid: app.globalData.openid
          })
        }
    
        db.where({
          _openid: this.data.openid
        }).get({
          success: res => {
            console.log(res.data)
            that.setData({
              goodsList: res.data,
            })
          }
        }) */
        wx.navigateTo({
          url: '/pages/secondhandstore/cre1/cre1'
        })//微信内页面跳转
        
      }
    })
},


  seekChange:function(e){
    this.data.inputValue = e.detail.value
  },

  seekGoods:function(e){
    var that=this;
    let key = that.data.inputValue;
    console.log("搜索关键字:",key);
    let goodsList1=[]
    db.where({
      _openid: this.data.openid
    }).get({
      success: res => {
        console.log(res.data)
        goodsList1 = res.data
        if(key == ''){
          that.setData({
            goodsList: goodsList1
          })}
        else{
          let temp=[]
          goodsList1.forEach(function(val,index){
            let i = val.desc.indexOf(key);
            console.log("配置索引:结果 ",index,i)
            if (i >= 0){
              console.log("匹配成功，添加..."+val.id)
              temp.push(val);
            }
          })
          that.setData({
            goodsList: temp
          })

        }
      }
    })
  },


  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that=this;
    if (app.globalData.openid) {
      this.setData({
        openid: app.globalData.openid
      })
    }

    db.where({
      _openid: this.data.openid
    }).get({
      success: res => {
        console.log(res.data)
        that.setData({
          goodsList: res.data,
        })
      }
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
    var that=this;
    if (app.globalData.openid) {
      this.setData({
        openid: app.globalData.openid
      })
    }

    db.where({
      _openid: this.data.openid
    }).get({
      success: res => {
        console.log(res.data)
        that.setData({
          goodsList: res.data,
        })
      }
    })
  
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