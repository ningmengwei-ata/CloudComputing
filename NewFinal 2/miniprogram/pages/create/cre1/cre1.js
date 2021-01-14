// pages/createinvitation/cre1/cre1.js
const db=wx.cloud.database()
const myinvation=db.collection('invitation')
const app=getApp()
const myapply= db.collection('reason')//获取数据库中的数据
const innerAudioContext = wx.createInnerAudioContext()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    creinvation:[],
    empty1:false,
    crestatus:['等待中','已确认'],
    findstatus:['等待确认','对方已接受'],
    finvation:[],
    navbar: ['我创建的', '我申请的'],
    currentTab: 0,
  },
  navbarTap: function (e) {
    this.setData({
      currentTab: e.currentTarget.dataset.idx
    })
    
    app.globalData.currentTab = e.currentTarget.dataset.idx;
  },
  onShow() {
    this.setData({
      currentTab: app.globalData.currentTab
    })
  },

  onLoad:async function(options){
    innerAudioContext.src = 'https://6461-data-nk0cg-1302648785.tcb.qcloud.la/Audio/CLICK_16.WAV?sign=b0bdf377c2210b31ae637f44b322fba4&t=1595322791'
    wx.showLoading({
      title: '请稍后',
    })
    await this.getcrelist()
    await this.getfindlist()

    wx.hideLoading({
      complete: (res) => {},
    })
  },
  //获取创建列表
  getcrelist(){
     myinvation.where({
      _openid:app.globalData.openid
    }).get({
      success: res =>{
        this.setData({
          creinvation:res.data
        })
        if(res.data.length!=0)
        {
          this.setData({
            empty1:true
          })
        }
        else{
          this.setData({
            empty1:false
          })
        }
        
        console.log(this.data.creinvation)
        
      }
    })
  },
  //获取加入列表
   async getfindlist(){  
    let {finvation}=this.data
    let res= await myapply.where({
      _openid:app.globalData.openid
    }).get()  //从数据库获取数据
    this.setData({
      finvation : res.data,  //刷新获得data，链接数据
    })
    if(res.data.length!=0)
        {
          this.setData({
            empty2:true
          })
        }
        else{
          this.setData({
            empty2:false
          })
        }
  },
  onPullDownRefresh(){  //下拉刷新
    wx.showLoading({
      title: '请稍后',
    })
    this.getcrelist()
    this.getfindlist()

    wx.hideLoading({
      complete: (res) => {},
    })
    wx.stopPullDownRefresh({
      complete: (res) => {},
    })
  },
  
  toCre2:function(){
    innerAudioContext.play()
    wx.switchTab({
      url: '/pages/create/cre2/cre2',
    })
   },
  credetail:async function(e){
    innerAudioContext.play()
    app.globalData.nowinvation = e.currentTarget.dataset.now
    wx.navigateTo({
      url: '../cre3/cre3',
    })
    
  },
  finddetail:async function(e){
    innerAudioContext.play()
    myinvation.where({
      _id:e.currentTarget.dataset.now
    }).get({
      success: res=>{
        if(res.data.length!=0){
          app.globalData.nowinvation = res.data[0]
        wx.navigateTo({
          url: '../../find/find3/find3',
        })
        }
        else
        {
          wx.showToast({
            title: '此邀请已结束',
            icon: 'none',
            duration: 2000
          })
        }
        
      }
    })
    
    
  },
  credel:function(e){
    innerAudioContext.play()
    let that=this
    wx.showModal({
      content:'确认删除？',
      cancelColor: 'cancelColor',
      success (res) {
        if (res.confirm) {
        console.log('用户点击确定')
        myinvation.doc(e.currentTarget.dataset.now).remove({
          success:res=>{
            wx.showToast({
              title: '删除成功',
              icon: 'success',
              duration: 2000
            })
            that.getcrelist()
          }
        })
        
        }
      }
    })
  },
  findel:function(e){
    innerAudioContext.play()
    let that=this
    wx.showModal({
      content:'确认删除？',
      cancelColor: 'cancelColor',
      success (res) {
        if (res.confirm) {
        console.log('用户点击确定')
        myapply.doc(e.currentTarget.dataset.now).remove({
          success:res=>{
            wx.showToast({
              title: '删除成功',
              icon: 'success',
              duration: 2000
            })
            that.getfindlist()
          }
        })
        
        }
      }
    })
  },
  
})