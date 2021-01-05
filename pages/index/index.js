const app = getApp();
Page({
  data: {
    accessReady:true,
    PageCur: 'basics',
    userInfo:[],
    hasUserInfo:false,
    usrid: "test_usrid",
    elements: [],
    usrss: [],
    openid: null
    // usrid 应该通过接口获取后setdata
  },
  onLoad: function () {
    var _this = this;
    wx.getSetting({
      success: res => {
        // console.log("getSetting in index success")
        _this.setData({
          accessReady: (typeof(res.authSetting['scope.userInfo'])!="undefined"&&res.authSetting['scope.userInfo'])?true:false
        })
      }
    })
    // this.setData({
    //   accessReady: app.globalData.getUserInfoReady
    // })
    wx.cloud.init();
    wx.cloud.callFunction({
      // 云函数名称
      name: 'getProj',
      // 传给云函数的参数
      data: {},
      success: function(res) {
        //console.log(res.result.userInfo.openId)
        _this.setData({
          openid: res.result.userInfo.openId
        },()=>{
          // console.log(_this.data.openid);
          _this.after_get_openid(_this);
        })
      }
    });    
  },
  getUserInfo: function(e) {
    // console.log(e)
    app.globalData.userInfo = e.detail.userInfo
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
  },
  NavChange(e) {
    this.setData({
      PageCur: e.currentTarget.dataset.cur
    })
  },
  sendMsg:function(){
    var that = this
    wx.requestSubscribeMessage({
      tmplIds: ["Z3foe66HMD0yAB4WrDjGEOVsZQV_uI50thPH7SdXDpE"],
      success(res) {
        console.log(app.globalData.openId)
        console.log(res)
        if (res["Z3foe66HMD0yAB4WrDjGEOVsZQV_uI50thPH7SdXDpE"] === 'accept') {
          console.log('用户同意了')
          wx.showToast({
            title: '订阅OK！',
            duration: 1000,
          })
          wx.request({
            url: 'https://api.weixin.qq.com/cgi-bin/message/subscribe/send?access_token=' + app.globalData.access_token,
            header: {'content-type': 'application/json'},
            method:'POST',
            data:
              {"touser": app.globalData.openId,
              "template_id": "Z3foe66HMD0yAB4WrDjGEOVsZQV_uI50thPH7SdXDpE",
              "page": "index",                  //点击订阅消息以后跳转到的小程序页面
              "miniprogram_state": "developer",
              "lang": "zh_CN",
              "data": {
                  "thing1": {
                    "value": "Project1"
                  },
                  "time2": {
                    "value": "2020年12月21日 24:00"
                  }
                }
            },
            //调用接口成功
            success: function (res) {
              console.log(res);
            },
          });
        }
      },
      fail(err) {
        //失败
        console.error(err);
      }
    })
  },
  after_get_openid(_this){
    // var response, pid_list=[], i,j, back = [], temp;
    var pid_list=[], i;
    wx.request({
      url: "https://wychandsome12138.xyz/api/get/get_proj_list_by_usrid", 
      method: "POST", // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT 
      data: {
        // "usrid":"test_usrid" //测试id
        "usrid":_this.data.openid
      },
      success: function(res) {
        // console.log("success request get_proj_list_by_usrid");
        // console.log(res);
        for(i in res.data){//i 为下标
          pid_list.push(res.data[i].pid)
        };
        // 这里是获取通过Projlist获取详细信息的request
        _this.request_in_projlist(pid_list, _this);
      },
        fail: function(res) {
          console.log("请求数据失败!!");
        },
        complete: function(res) {
        }
      })
    // wx.request 范例
    // var pidlist = [item.pid for (item of projlist)]
    // if (app.globalData.userInfo) {
    //   this.setData({
    //     userInfo: app.globalData.userInfo,
    //     hasUserInfo: true
    //   })
    
    // } else if (this.data.canIUse){
    //   // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
    //   // 所以此处加入 callback 以防止这种情况
    //   console.log(0)
    //   app.userInfoReadyCallback = res => {
      //     this.setData({
        //       userInfo: res.userInfo,
        //       hasUserInfo: true
        //     })
        //     console.log(res.userInfo)
        //   }
        // } else {
          //   // 在没有 open-type=getUserInfo 版本的兼容处理
          //   wx.getUserInfo({
            //     success: res => {
              //       app.globalData.userInfo = res.userInfo
              //       this.setData({
                //         userInfo: res.userInfo,
    //         hasUserInfo: true
    //       })
    //     }
    //   })
    // }  
  }, //这里是after_get_openid的结尾
  request_in_projlist(pid_list, _this){
    var i, back = [], temp;
    // console.log(pid_list);
    wx.request({
      url: 'https://wychandsome12138.xyz/api/get/get_proj_content',
      method: "POST",
      data:{
        "projid": pid_list
      },
    success: function(res){
      // console.log(res.data)
      _this.setData({
        elements: res.data
      })
      //console.log(res.data.length)
      if(res.data.length!=0){
       
      }else{
        _this.setData({
          elements:
            {
              0:{
                color:255,
                content:"快来和我一起添加任务，开始你的高质量团队协作之旅吧",
                ddl:"2021-12-31",
                deleted:"0",
                pname:"开始任务吧"
              }
            }
        })
      }
    },
    fail: function(res){
      console.log("请求proj content的 list的request 失败！")
    }
  });
  // 这里是通过projlist 获取用户头像列表的request
  wx.request({
    url: 'https://wychandsome12138.xyz/api/get/get_users_by_idlist',
    method: "POST",
    data:{
      "projid": pid_list
    },
    success: function(res){
      //console.log(res)
      _this.setData({
        users: res.data
      })
    },
    fail: function(res){
      console.log("请求proj 头像的 list的request 失败！")
    }
  });
  },
  getAccessFun:function(){
    wx.getUserInfo({
      success: res => {
        // 可以将 res 发送给后台解码出 unionId
        console.log("get access userInfo", res.userInfo) 
        app.globalData.userInfo = res.userInfo
        wx.reLaunch({
          url: '/pages/index/index'
        })
      }
    })
  }
})