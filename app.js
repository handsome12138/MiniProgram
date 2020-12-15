//app.js
App({
  globalData: {
    userInfo: null,
    appId:"wx8d5a947dca8f7394",
    secret:"bcd0ad6883cd9440b12605608cccb787",
    openid:null,
    getUserInfoReady:false
  },
  onLaunch: function () {
    // 展示本地存储能力
    var logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)
    // 获取用户信息
    wx.getSetting({
      success: res => {
        if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
          var userBasicInfo;
          var userOpenId;
          wx.getUserInfo({
            success: res => {
              // 可以将 res 发送给后台解码出 unionId
              userBasicInfo=res.userInfo;
              //console.log(userBasicInfo)
              this.globalData.userInfo = res.userInfo
              wx.cloud.init()
              wx.cloud.callFunction({
                // 云函数名称
                name: 'getProj',
                // 传给云函数的参数
                data: {},
                success: function(res) {
                  userOpenId=res.result.userInfo.openId;
                  //console.log(userOpenId);
                  wx.request({
                    url: 'http://wychandsome12138.xyz:996/api/post/user_sign',
                    method: "POST",
                    header: {
                      'content-type': 'application/json' 
                    },
                    data:{
                      "id": userOpenId,
                      "url":userBasicInfo.avatarUrl,
                      "name":userBasicInfo.nickName
                    },
                    success: function(res){
                      console.log(res)
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