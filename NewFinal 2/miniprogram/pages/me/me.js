var app=getApp()
Page({
  data:{
    orderItems:[
    {
      typeId:0,
      name:'接单记录'
    }
  ]
  },
 toSend:function(){
   wx.navigateTo({
     url: 'pages/send1/send1'
   })
 },
 jump(){                        //返回注册页面
  wx.navigateTo({
    url: '/pages/send1/send1'
  })
},
})