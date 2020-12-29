//app.js
App({
  globalData: {
    userInfo: null,
    appId:"wx8d5a947dca8f7394",
    secret:"bcd0ad6883cd9440b12605608cccb787",
    openId:null,
    getUserInfoReady:false,
    access_token:null
  },
  onLaunch: function () {
    // 展示本地存储能力
    var logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)
    // 获取用户信息
    wx.getSetting({
      success: res => {
        // console.log("getSetting success")
        if (res.authSetting['scope.userInfo']) {
          // 就是这里没成功。
          console.log("auth setting is true")
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
          var userBasicInfo;
          var userOpenId;
          wx.getUserInfo({
            success: res => {
              // 可以将 res 发送给后台解码出 unionId
              userBasicInfo=res.userInfo;
              //console.log(userBasicInfo)
              this.globalData.userInfo = res.userInfo
               //获取access_token  (openid已经事先获取到了，很简单，官方文档介绍的很清楚了)
                var appid ='wx8d5a947dca8f7394';//微信公众号开发者id
                var secret ='6feadcff71f7e71b065d525345c960af';//微信公众号开发者secret_key
                var that = this
                wx.request({
                  url: 'https://api.weixin.qq.com/cgi-bin/token?grant_type=client_credential' + '&appid=' + appid + '&secret=' + secret,
                  header: {
                    'content-type': 'application/json' // 默认值
                  },
                  success(res) {
                    console.log(res.data)
                    that.globalData.access_token=res.data.access_token;
                    console.log(that.globalData.access_token)
                  }
                })
                wx.cloud.init();
                wx.cloud.callFunction({
                  // 云函数名称
                  name: 'getProj',
                  // 传给云函数的参数
                  data: {},
                  success: function(res) {
                    var that=this;
                    console.log(res);
                    userOpenId=res.result.userInfo.openId;
                    //console.log(userOpenId);
                    var app = getApp();
                    
                    app.globalData.openId=userOpenId;
                    //console.log(app.globalData.openId)
                    wx.request({
                      url: 'https://wychandsome12138.xyz/api/post/user_sign',
                      method: "POST",
                      data:{
                        "id": userOpenId,
                        "url":userBasicInfo.avatarUrl,
                        "name":userBasicInfo.nickName
                      },
                      success: function(res){
                          console.log("user sign success!");
                          console.log(res);
                        },
                        fail: function(res){
                          console.log("请求User login的request 失败！")
                        }
                      })
                    },
                    fail: console.error
                  })
              
                
                  }
                })
                
        }
      }
    })
    
    wx.getSystemInfo({
      success: e => {
        this.globalData.StatusBar = e.statusBarHeight;
        let custom = wx.getMenuButtonBoundingClientRect();
        this.globalData.Custom = custom;  
        this.globalData.CustomBar = custom.bottom + custom.top - e.statusBarHeight;
        
      }
    })          
  }  
})