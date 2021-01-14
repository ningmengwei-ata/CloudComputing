// pages/sendContent/sendContent.js
const db = wx.cloud.database();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    // 订单id
    targetId:null,
    detailLength:0,
    cancelDialogShow: false,
    dialogShow:false,
    buttons: [{text: '取消'}, {text: '确定'}],
    formData: {
      title: '',
      money:'',
      content:'',
      flag:'1',
      phone:'',
      name:''
    },
    rules: [
      {
        name: 'title',
        rules: {required: true, message: '请填写标题'},
      },
      {
        name: 'money',
        rules: {required: true, message: '请填写赏金'},
      },
      {
        name: 'name',
        rules: {required: true, message: '请输入您的姓名'},
      },
      {
        name: 'phone',
        rules: {required: true, message: '请输入您的手机号'},
      },
      {
        name: 'content',
        rules: {required: true, message: '请填写详细内容'},
      },
    ]
  },

  // 获取订单详情 用来修改
  getTaskDetail(id){
    // this.setData({
    //   'formData.title': id
    // })
    console.log(id)
    db.collection('task').where(
      {
      // 查询条件
      _id: id
      }
      ).get({
      success:res=>{
        const { title, money, phone,name,content } = res.data[0]
        this.setData({
          'formData.title': title,
          'formData.money': money,
          'formData.name': name,
          'formData.phone': phone,
          'formData.content': content,
          'formData.flag': 1
        })
      },
      fail: console.error,
      complete: console.log
    })
    wx.hideLoading()
    console.log(this.data);
  },

  tapCancelDialogButton(e) {
    console.log(e);
    const confirm = e.detail.item.text === '确定';
    this.setData({
      cancelDialogShow: false
    })
    // 如果是确认取消
    if(confirm){
      wx.navigateBack({
        delta: 1 //想要返回的层级
      })
    }
  },

  confirmDialog(e) {
    this.setData({
        dialogShow: true
    })
  },

  formTextareaChange(e) {
    const {field} = e.currentTarget.dataset
    console.log(field)
    this.setData({
        [`formData.${field}`]: e.detail.value,
        detailLength: e.detail.value.length
    })
  },

  formInputChange(e) {
    const {field} = e.currentTarget.dataset
    let value = e.detail.value;
    this.data.formData[field] = value;
    this.setData({
        [`formData.${field}`]: this.data.formData[field]
    })
    console.log(this.data)
  },

  // 取消
  cancel(){
    this.setData({
      cancelDialogShow: true
    })
  },

  tapDialogButton(e){
    console.log(e);
    const confirm = e.detail.item.text === '确定';
    this.setData({
      dialogShow: false
    })
    // 如果是确认取消
    if(confirm){
      this.confirmSubmitForm();
    }
    
  },

  // 二次确认
  confirmSubmitForm() {
    this.selectComponent('#form').validate((valid, errors) => {
        console.log('valid', valid, errors)
        if (!valid) {
            const firstError = Object.keys(errors)
            if (firstError.length) {
                this.setData({
                    error: errors[firstError[0]].message
                })
                wx.showToast({
                  title: '填写有误',
                  icon: 'none'
              })
            }
        } else {
          // 此处判断是添加还是修改 获取到id的就是修改
          if(this.data.targetId){
            this.changeTask();
          } else {
            this.submitTask();
          }
        }
    })
  },

  submitTask(){
    console.log("submitTask")
    db.collection('task').add({
      data:this.data.formData,
      success:res=>{
        console.log("add_success")
        // wx.switchTab({
        wx.navigateTo({
          
        
          url:"/pages/send/send",
          success: (e) => {
            console.log("提交成功")
            let page = getCurrentPages().pop();
            if (page == undefined || page == null) return;
            // page.onLoad();
            wx.showToast({
              title: '提交成功'
            })
        }
        })
      },
      fail: console.error,
      
      complete: console.log
      
    })
    
    // getnewTaskList()
  },

  changeTask(){
    // 通过id更新数据
    db.collection('task').doc(this.data.targetId).update({
      data:this.data.formData,
      success:res=>{
        wx.navigateTo({
          
          url:"/pages/send/send",
          success: (e) => {
            console.log("打印订单id",this.data.targetId)
            let page = getCurrentPages().pop();
            if (page == undefined || page == null) return;
            // page.onLoad();
            wx.showToast({
              title: '修改成功'
            })
        }
        })
      },
      fail: console.error,
      complete: console.log
    })
    getnewTaskList()
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options)
    // 获取订单id 查询订单详情
    if (options){
      const id = options.id
      if(id){
        wx.showLoading({
          title: '加载中',
        })
        this.setData({
          targetId: id
        },()=>{
          this.getTaskDetail(id);
        });
      }
    }
    else{
      wx.showLoading({
        title: '加载中',
      })
      this.setData({
        targetId: null
      },()=>{
        this.getTaskDetail(null);
      });
    }
    // const id = options.id?options.id:null;
    // const id=null;
    
    //  if(id){
    //   wx.showLoading({
    //     title: '加载中',
    //   })
    //   this.setData({
    //     targetId: id
    //   },()=>{
    //     this.getTaskDetail(id);
    //   });
    },
    
  // },

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