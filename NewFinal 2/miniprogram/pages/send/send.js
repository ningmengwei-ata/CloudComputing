// pages/send/send.js
const db = wx.cloud.database();
const app=getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    openId:null,
    dialogShow:false,
    buttons: [{text: '取消'}, {text: '确定'}],
    // 需要删除的数据id
    deleteId:null,
    dataList:[
      // {
      //   title:1,
      //   content:1,
      //   id:1
      // },
    ],
    page:0,
    hasMore:true
  },

  async getTaskList(){
    const limit = 6 //限制每次获得数据条数
    const page  = this.data.page;
    console.log(page)
    await db.collection('task').limit(limit).skip(page*limit).where({
      // _openid: this.data.openId // 填入当前用户 openid
      _openid:app.globalData.openid
    // await db.collection('taskInfo')
  }).get({  //从数据库获取数据
      success:res=>{
        console.log(res);
        let arr = this.data.dataList.concat(res.data);
        this.setData({
          dataList:arr
        })
        console.log(this.data.dataList);
        wx.stopPullDownRefresh({
          complete: (res) => {},
        })
        wx.hideLoading()
      }
    })
  },

  onReachBottom(){  //上拉刷新
    if(!this.data.hasMore){
      wx.showToast({
        title: '暂无数据',
        icon:"none"
      })
      return console.log('没有数据')
    }
    const page = ++this.data.page;
    this.setData({
      page:page
    },()=>{
      this.getTaskList();
    })
    
  },
  onPullDownRefresh(){  //下拉刷新
    // wx.showNavigationBarLoading()
    // this.onLoad()
    setTimeout(() => {
      wx.hideNavigationBarLoading()
      wx.stopPullDownRefresh()
    }, 1000);
    
    // this.onLoad()
  },

  taskDetail(e){
    console.log(e);
    const id = e.currentTarget.dataset.id;
    wx.navigateTo({
      url:`/pages/sendContent/sendContent?id=${id}`
    });
  },

  deleteTaskDialog(e){
    console.log(e);
    const id = e.currentTarget.dataset.id;
    this.setData({
      deleteId:id
    });
    this.setData({
      dialogShow:true
    })
  },

  tapDialogButton(e){
    this.setData({
      dialogShow:false
    })
    const confirm = e.detail.item.text === '确定';
    if(confirm){
      this.deleteTask(this.data.deleteId);
    }
  },

  deleteTask(id){
    db.collection('task').doc(id).remove({
      
      success:res=>{
        console.log("删除成功")
        // var that = this;
        wx.navigateTo({
          url:"/pages/send/send",
          success: (e) => {
            let page = getCurrentPages().pop();
            if (page == undefined || page == null) return;
            // page.onLoad();
            wx.showToast({
              title: '删除成功'
            })
        }
        })
        // const pages = getCurrentPages()
        // const perpage = pages[pages.length - 1]
        // page.onLoad();
        // perpage.onLoad();
        // data:{
        //   　　show:false
        //   }
        //   //每次进入页面都会将show变为true
        //   onshow:{
        //       this.setData({
        //           show:true
        //       })
        //   }
        
        
        // getnewTaskList();
        // perpage.onLoad();
        // that.setData({
        //   contentlistn: res.data // 页面分配数据
        // });
        // perpage.onLoad()  
        // perpage.onLoad()  

      },
      fail: console.error,
      complete: console.log
    })
    // getnewTaskList()
  },
  async getnewTaskList(){
    const limit = 6 //限制每次获得数据条数
    const page  = this.data.page;
    console.log(page)
    await db.collection('task').limit(limit).skip(page*limit).where({
      _openid: this.data.openId // 填入当前用户 openid
    // await db.collection('taskInfo')
  }).get({  //从数据库获取数据
      success:res=>{
        console.log(res);
        let arr = this.data.dataList.concat(res.data);
        this.setData({
          dataList:arr
        })
        console.log(this.data.dataList);
        wx.stopPullDownRefresh({
          complete: (res) => {},
        })
        wx.hideLoading()
      }
    })
  },
  getUserInfo(){
    console.log(2323);
    wx.cloud.callFunction({
      name:'getopenid',
      success:res=>{
        console.log(res);
        const { openid } = res.result;
        console.log(openid);
        this.setData({
          openId:openid
        },()=>{
          this.getTaskList();
        })
      },
      fail:res=>{
        console.log(res)
      }
    
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // wx.showLoading({
    //   title: '加载中',
    // })
    this.getUserInfo();
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
    var t = this
    db.collection('task').where({
      _openid: this.data.openId // 填入当前用户 openid
    // await db.collection('taskInfo')
  }).get().then(res=>{
      console.log("刷新成功")
      console.log(res)
      t.setData({
        data: res.data
      })
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
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  },

  sendOrder:() => {
    wx.navigateTo({
      url:"/pages/sendContent/sendContent"
    })
  }
})