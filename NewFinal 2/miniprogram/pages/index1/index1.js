const db= wx.cloud.database()//调用数据库
const tasks_col= db.collection('task')//获取数据库中的数据
const app=getApp()
Page({
  data :{
    tasks:[], //用来存储task
    _page:0,
    hasMore:true

  },
  onLoad:async function(options){
    wx.cloud.callFunction({
      name:'getopenid',
      complete:res=>{
        console.log('获取openid:',res.result.openid)
        app.globalData.openid = res.result.openid
        console.log("全局变量测试",app.globalData.openid)
      }
    })//在这里增加一个获取openid的函数  
    let res= await tasks_col.where({
      OPENID:app.globalData.openid
    }).get()
    if (res.data.length!=0){
      app.globalData.ifexist=true
           console.log(app.globalData.ifexist)
    }
    console.log("res打印测试",res)
   this.loadListData()
  },
  async loadListData(){  //加载数据
    const LIMIT =20 //限制每次获得数据条数
    let {_page,tasks}=this.data
    // wx.showLoading({
    //   title: 'Loading',
    // })
    // let res = await tasks_col.get()
    let res= await tasks_col.where({_openid:db.command.neq(app.globalData.openid)}).limit(LIMIT).skip(_page*LIMIT).get() //从数据库获取数据
    console.log(res)
    console.log("现在的openid",app.globalData.openid)
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
  jumpfa(){
    // console.log("Page内全局变量测试",app.globalData)

    // if(app.globalData.userInfo==null){
    //   wx.showModal({
    //     title: '提示',
    //     content: '亲，我们首先需要获取一下您的头像跟昵称呢',
    //       success: function (res) {
    //         if (res.confirm) {//这里是点击了确定以后
    //             wx.switchTab({//wx.switchTab是干什么用的
    //             url: '/pages/frontdemo/frontdemo'})
    //         } else {//这里是点击了取消以后
    //       }
    //     }}
    //     )

    // }
    // if (app.globalData.ifexist==false){
    //   wx.showModal({
    //     title: '提示',
    //     content: '亲，这边需要您先完善一下个人信息呢',
    //       success: function (res) {
    //         if (res.confirm) {//这里是点击了确定以后
    //           wx.navigateTo({//注意wx.navigateTo和switchTab的区别
    //             url: '/pages/fillinfo/fillinfo'})
    //         } else {//这里是点击了取消以后
    //       }
    //     }})
    // }
    // else if (app.globalData.ifexist==true){
      wx.navigateTo({
        //当已经存在个人信息的时候
        url: '/pages/send/send'
      })//微信内页面跳转
    // }
    
  
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
  },
  
})