//app.js
const app=getApp()
App({
  onLaunch: function () {
    if (!wx.cloud) {
      console.error('请使用 2.2.3 或以上的基础库以使用云能力')
    } else {
      wx.cloud.init({
        // env 参数说明：
        //   env 参数决定接下来小程序发起的云开发调用（wx.cloud.xxx）会默认请求到哪个云环境的资源
        //   此处请填入环境 ID, 环境 ID 可打开云控制台查看
        //   如不填则使用默认环境（第一个创建的环境）
        // env: 'my-env-id',
        traceUser: true,
      })
    }
    wx.login({
      success: res => {
        // 发送 res.code 到后台换取 openId, sessionKey, unionId
      }
    })
    wx.getSetting({
      success: res => {
        if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
          wx.getUserInfo({
            success: res => {
              // 可以将 res 发送给后台解码出 unionId
              
              this.globalData.userInfo = res.userInfo
              // console.log("全局变量测试",this.globalData.userInfo)

              // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
              // 所以此处加入 callback 以防止这种情况
              if (this.userInfoReadyCallback) {
                this.userInfoReadyCallback(res)
              }
            }
          },
          wx.cloud.callFunction({
            name:'getopenid',
            complete:res=>{
              // console.log('获取openid:',res.result.openid)
              this.globalData.openid = res.result.openid
              // console.log("全局变量测试",this.globalData.openid)

            }
          })//在这里增加一个获取openid的函数   
          )
        }
      }
    })

//尝试新的定义方式
    this.globalData = {
    userInfo: null,//微信公开授权那个个人信息
    openid: null,
    nowinvation: null,
    ifexist:false,//是否填了,
    currentTab:-1
    }
  }
})
