const db= wx.cloud.database()//调用数据库
const tasks_col= db.collection('task')//获取数据库中的数据
var id1
Page({
  data :{
    tasks:[], //用来存储task
    _page:0,
    hasMore:true,
  },

  onLoad:async function(options){
    var res=await wx.cloud.callFunction({
      name:'getopenid'
    })
    id1=res.result.openid
    console.log(id1)
   this.loadListData()
  },
  async loadListData(){  //加载数据
    const LIMIT =20 //限制每次获得数据条数
    let {_page,tasks}=this.data
    wx.showLoading({
      title: 'Loading',
    })
    let res= await tasks_col.where({
      flag:"2",
      id2:id1
    }).limit(LIMIT).skip(_page*LIMIT).get()  //从数据库获取数据
    wx.stopPullDownRefresh({
      complete: (res) => {},
    })
    wx.hideLoading({
      complete: (res) => {},
    })
    this.setData({
      tasks : [...tasks,...res.data],  //刷新获得data，链接数据
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
      tasks:[],
      _page:0,
      hasMore:true
    })
    this.loadListData()
  }
})