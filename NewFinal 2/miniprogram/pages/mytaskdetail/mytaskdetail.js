const db=wx.cloud.database()
const task_col =db.collection('task')
let that = this ;
Page({
  data:{
    detail:{},//声明一个对象
    openid:''
  },

 onLoad:function(options){  //获取ID
  let id=options.id;
  task_col.doc(id).get().then(res=>{
    this.setData({
      detail:res.data,
    })
  })
  //this.getopenid();
 },
 getopenid(){
   wx.cloud.callFunction({
     name:'getopenid',
     complete:res=>{
      task_col.doc(this.data.detail._id).remove({
        success: res => {
          wx.showToast({
            title: '删除成功',
          })}
        })
     }
   })
 },
 up:function(){
   this.getopenid();/*
task_col.doc(this.data.detail._id).update({
data:{
  flag:1,
  id2:res.result.openid
}
})*/
},
 

})