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
        // console.log("云函数 success!", res)
        _this.setData({
          openid: res.result.userInfo.openId
        },()=>{
          // console.log("云函数 success 的 setData 的回调函数！");
          _this.after_get_openid(_this);
        })
      },
      fail: function(res) {
        console.log("云函数 get proj fail :", res)
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
          // 这个域名不允许被加到白名单
          // wx.request({
          //   url: 'https://api.weixin.qq.com/cgi-bin/message/subscribe/send?access_token=' + app.globalData.access_token,
          //   header: {'content-type': 'application/json'},
          //   method:'POST',
          //   data:
          //     {"touser": app.globalData.openId,
          //     "template_id": "Z3foe66HMD0yAB4WrDjGEOVsZQV_uI50thPH7SdXDpE",
          //     "page": "index",                  //点击订阅消息以后跳转到的小程序页面
          //     "miniprogram_state": "developer",
          //     "lang": "zh_CN",
          //     "data": {
          //         "thing1": {
          //           "value": "Project1"
          //         },
          //         "time2": {
          //           "value": "2020年12月21日 24:00"
          //         }
          //       }
          //   },
          //   //调用接口成功
          //   success: function (res) {
          //     console.log(res);
          //   },
          // });
        }
      },
      fail(err) {
        //失败
        console.error(err);
      }
    })
  },
  after_get_openid(_this){
    // console.log("after_get_openid is running")
    // console.log(_this.data.openid)
    // var response, pid_list=[], i,j, back = [], temp;
    var pid_list=[], i;
    // 这里的wx.request卡住了，我在console里敲一个wx.request他就会继续跑？这TMD到底是为什么
    wx.request({
      url: "https://wychandsome12138.xyz/api/get/get_proj_list_by_usrid", 
      method: "POST", // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT 
      data: {
        "usrid": _this.data.openid
      },
      success: res=>{
        console.log("success request get_proj_list_by_usrid", res.data);
        // console.log(res);
        for(i in res.data){//i 为下标
          pid_list.push(res.data[i].pid)
        };
        // 这里是获取通过Projlist获取详细信息的request
        _this.request_in_projlist(pid_list, _this);
      },
      fail: res=>{
        console.log("get project list by user id 请求数据失败!!", res);
      },
      complete: res=> {
        console.log("after_get_openid 的 wx request complete")
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
      // console.log("success get project content", res.data)
      _this.setData({
        elements: res.data
      })
      //console.log(res.data.length)
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
        // console.log("get access userInfo", res.userInfo) 
        app.globalData.userInfo = res.userInfo
        wx.reLaunch({
          url: '/pages/index/index'
        })
      }
    })
  }
})