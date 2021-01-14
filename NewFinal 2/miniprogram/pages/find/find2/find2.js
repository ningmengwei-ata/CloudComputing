const db= wx.cloud.database()//调用数据库
const invites_col= db.collection('invitation')//获取数据库中的数据
const app=getApp()
// const innerAudioContext = wx.createInnerAudioContext()
Page({
  data :{
    invites:[], //用来存储invite
    _page:0,
    hasMore:true,
    end:"",
    date:'2021-01-12',
    data_change:''
  },
  toCre2:function(){
    // innerAudioContext.play()
    // wx.switchTab({
    //   url: ,
    // })
    wx.navigateTo({
      url: '/pages/create/cre2/cre2',
    })
   },
  detail: function(e){
    app.globalData.nowinvation = e.currentTarget.dataset.now
    if(app.globalData.nowinvation._openid==app.globalData.openid){
      wx.navigateTo({
        url: '../../create/cre3/cre3',
      })
    }
    else{
      wx.navigateTo({
      url: '../find3/find3',
    }) 
    }
     
  },
  onLoad:async function(options){
    // innerAudioContext.src = 'https://6461-data-nk0cg-1302648785.tcb.qcloud.la/Audio/CLICK_16.WAV?sign=b0bdf377c2210b31ae637f44b322fba4&t=1595322791'
    if(app.globalData.userInfo==null)
    {
      wx.switchTab({
      url: '/pages/index/index'})
      wx.showModal({
      title: '提示',
      content: '亲，我们需要获取一下您的头像跟昵称呢',
        success: function (res) {
          if (res.confirm) {//这里是点击了确定以后
              wx.switchTab({
              url: '/pages/index/index'})
          } else {//这里是点击了取消以后
            wx.showToast({
              title: '不完善个人信息就是看不了,3s后自动跳转回用户首页',
              icon:'none',
              // duration:'100'
            })
            wx.switchTab({
              url: '/pages/index/index' //这里NAVI的逻辑
          })
       
        }
      }})
    }
      else if(app.globalData.ifexist==false)
      {
      wx.switchTab({
      url: '/pages/index/index'})
      wx.showModal({
      title: '提示',
      content: '亲，这边需要您先完善一下个人信息呢',
        success: function (res) {
          if (res.confirm) {//这里是点击了确定以后
            wx.showToast({
              title: '确认完善用户信息ing~',
              icon:'none',
              // duration:'100'
            })
            wx.navigateTo({
              url: '/pages/fillinfo/fillinfo'})
          } else {//这里是点击了取消以后
            wx.switchTab({
              url: '/pages/index/index'
          })
        }
      }})
    }
   if(options!=null)
   this.setData({
      end:options.end
   })
   await this.loadListData()
  },

  async loadListData(){  //加载数据
    var that = this
    const LIMIT =20 //限制每次获得数据条数
    let {_page,invites}=this.data
    
      let res= await invites_col.where({
        end:that.data.end,
        status:0
       // time:that.data.data_change
      }).limit(LIMIT).skip(_page*LIMIT).get()  //从数据库获取数据
    wx.stopPullDownRefresh({
      complete: (res) => {},
    })
    wx.hideLoading({
      complete: (res) => {},
    })
    this.setData({
      invites : [...invites,...res.data],  //刷新获得data，链接数据
      _page:++_page,
      hasMore:res.data.length === LIMIT
    })
  },
  onReachBottom(){  //上拉刷新
    if(!this.data.hasMore){
      wx.showToast({
        title: 'Nomore Data',
        icon:"none"
      })
      return console.log('没有数据')
    }
    console.log('刷新')
    this.loadListData()
  },
  onPullDownRefresh(){  //下拉刷新
    this.setData({
      invites:[],
      _page:0,
      hasMore:true
    })
    this.loadListData()
  },
  bindDateChange: function(e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      data_change: e.detail.value,
      date:e.detail.value
    })
  },
  FindDate: async function(){
    // innerAudioContext.play()
    this.setData({
      invites:[],
      _page:0,
      hasMore:true
    })
    this.loadListData_date()
  },
  async loadListData_date(){  //加载数据
    var that = this
    const LIMIT =20 //限制每次获得数据条数
    let {_page,invites}=this.data
    wx.showLoading({
      title: 'Loading',
    })
      let res= await invites_col.where({
        end:that.data.end,
        time:that.data.data_change
      }).limit(LIMIT).skip(_page*LIMIT).get()  //从数据库获取数据
    wx.stopPullDownRefresh({
      complete: (res) => {},
    })
    wx.hideLoading({
      complete: (res) => {},
    })
    this.setData({
      invites : [...invites,...res.data],  //刷新获得data，链接数据
      _page:++_page,
      hasMore:res.data.length === LIMIT
    })
  },
  Reset(){
    // innerAudioContext.play()
    this.setData({
      invites:[],
      _page:0,
      hasMore:true
    })
    this.loadListData()


  }
})