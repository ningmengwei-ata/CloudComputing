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
    showformbox:false,
    errortest:false,
    inputValue:"",
    info:{
      cloudfileid:'cloud://liwapaotui-3gzl16crdee48e86.6c69-liwapaotui-3gzl16crdee48e86-1304586505/ECNU_Emblem.svg',
      logo:'cloud://liwapaotui-3gzl16crdee48e86.6c69-liwapaotui-3gzl16crdee48e86-1304586505/ECNU_Emblem.svg',
      avatars:'',
      name:'',
      contact:'',
      desc:'',
      picdesc:[],
      price:0,
      status:0,
      area:"中山北路校区",
    }
  },

  radioChange:function(e){
    this.data.info.area = e.detail.value;
  },

  infomodify: function (e) {
    let val = e.detail.value;
    let col = e.currentTarget.dataset.col;
    let data = "{\"info." + col + "\":\"" + val + "\"}";
    console.log(data);
    data = JSON.parse(data);
    this.setData(data);
  },
  toggleFormBox(e){
     console.log(e);
     let val = e.currentTarget.dataset.val;
     this.setData({
       showformbox: val==1?true:false
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
    db.get({
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

  uploadFile(filePath) {
    var that = this;
    wx.cloud.uploadFile({
      sizeType: ['original', 'compressed'],//选择原图或压缩后的图片
      sourceType: ['album', 'camera'],//选择访问相册、相机
      cloudPath: (new Date()).valueOf()+'.png', // 文件名
      filePath: filePath, // 文件路径
      success: res => {
        wx.showLoading({ //显示加载提示框 不会自动关闭 只能wx.hideLoading关闭
          title : "图片上传中", //提示框显示的提示信息
          mask : true, //显示透明蒙层，防止触摸。为true提示的时候不可以对屏幕进行操作，不写或为false时可以操作屏幕
          success : function () {
              wx.hideLoading() //让提示框隐藏、消失
          }
        });
        that.setData({
          'info.cloudfileid': res.fileID
        })
        // get resource ID
        console.log(info.cloudfileid)
        console.log(res.fileID)
        return res.fileID
      },
      fail: err => {
        console.log("error setting cloudfileid")
        return 'cloud://liwapaotui-3gzl16crdee48e86.6c69-liwapaotui-3gzl16crdee48e86-1304586505/ECNU_Emblem.svg'
        // handle error
      }
    })
  },

  saveFormboxcontent:function(e){
    var that = this;
    that.setData({"info.avatars" : app.globalData.userInfo.avatarUrl})
    
    let info = that.data.info;
    //格式校验
    if(!(info.contact && info.price && info.desc)){
      that.setData({
        showformbox: false,
        errortest: true
      })
      return;
    }
    db.add({
      //要添加的数据
      data:{
        name : info.name,
        contact : info.contact,
        price : info.price,
        desc : info.desc,
        area : info.area,
        avatars : info.avatars,
        cloudFileID:info.cloudfileid
      },
      //添加成功时的操作
      success(res){
        //打印“添加成功”
        console.log("添加成功",res)
      },
      //添加失败时的操作
      fail(res){
        console.log("添加失败",res)
      },
    })

    this.setData({
      showformbox:false,
      errortest:false,
      inputValue:"",
      info:{
        logo:'cloud://liwapaotui-3gzl16crdee48e86.6c69-liwapaotui-3gzl16crdee48e86-1304586505/ECNU_Emblem.svg',
        cloudfileid:'cloud://liwapaotui-3gzl16crdee48e86.6c69-liwapaotui-3gzl16crdee48e86-1304586505/ECNU_Emblem.svg',
        name:'',
        contact:'',
        desc:'',
        area:"中山北路校区",
        picdesc:[],
        price:0,
        status:0,
      }
    })
 
  },

  backFormboxcontent:function(e){
    this.setData({
      showformbox: false,
      errortest: false
    })
  },

  chooseImage: function () {
    var that = this;
    wx.chooseImage({
      success: function (res) {
        that.setData({
          'info.logo': res.tempFilePaths[0]
        })
    
        that.uploadFile( res.tempFilePaths[0])
      },
    })

  },
  



  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that=this;

    db.get({
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
    db.get({
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