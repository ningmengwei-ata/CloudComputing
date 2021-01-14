const db= wx.cloud.database()//调用数据库
const invites_col= db.collection('invitation')//获取数据库中的数据
var id
const app=getApp()
const innerAudioContext = wx.createInnerAudioContext()
Page({
  data :{
    invites:[], //用来存储invite
    _page:0,
    hasMore:true,
    id:'',
    finvation:[
      {
        id:'1',
        dest:'虹桥机场',
        time:'2020-7-20',
        people:'3',
        status:'申请审核中'
      },
      {
        id:'2',
        dest:'浦东机场',
        time:'2020-7-21',
        people:'4',
        status:'申请已成功'
      }
    ]
  },

  toFind2:function(){
    innerAudioContext.play()
    wx.navigateTo({
      url: '../find2/find2',
    })
  },
  test(){

  },//函数的定义的区别

  toFind3:function(){
    innerAudioContext.play()
    wx.navigateTo({
      url: '../find3/find3',
    })
  },

  onLoad:async function(options){
    var res=await wx.cloud.callFunction({
      name:'getopenid'
    })
    id=res.result.openid
    console.log(id)
  this.loadListData()
  },

  async loadListData(){  //加载数据
    let that=this
    const LIMIT =20 //限制每次获得数据条数
    let {_page,invites}=this.data
  
    let res= await invites_col.where({
      member:id
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
  
})