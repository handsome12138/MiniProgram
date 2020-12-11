const app = getApp();
Page({
  data: {
    PageCur: 'basics',
    userInfo:[],
    hasUserInfo:false,
    usrid: "test_usrid",
    elements: []
    // usrid 应该通过接口获取后setdata
  },
  onLoad: function () {
    var response, pid_list=[], i,j, back = [], temp, _this=this;
    wx.request({
      url: "http://wychandsome12138.xyz:996/api/get/get_proj_list_by_usrid", 
      method: "POST", // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT 
      data: {
        "usrid":"test_usrid"
      },
      success: function(res) {
        console.log("success request");
        for(i in res.data){//i 为下标
          pid_list.push(res.data[i].pid)
        };
        wx.request({
          url: 'http://wychandsome12138.xyz:996/api/get/get_proj_content',
          method: "POST",
          data:{
            "projid": pid_list
          },
          success: function(res){
            console.log(res)
            for(i in res.data){
              temp = res.data[i];
              back.push({
                title: temp.pname,
                name: temp.content,
                ddl: temp.ddl
              })
            }
            _this.setData({
              elements: back
            })
          },
          fail: function(res){
            console.log("请求proj content的 list的request 失败！")
          }
        })
      },
      fail: function(res) {
        console.log("请求数据失败!!");
      },
      complete: function(res) {
      }
    })
    // wx.request 范例
    // var pidlist = [item.pid for (item of projlist)]
    


    if (app.globalData.userInfo) {
      this.setData({
        userInfo: app.globalData.userInfo,
        hasUserInfo: true
      })
      
    } else if (this.data.canIUse){
      // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
      // 所以此处加入 callback 以防止这种情况
      console.log(0)
      app.userInfoReadyCallback = res => {
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true
        })
        console.log(res.userInfo)
      }
    } else {
      // 在没有 open-type=getUserInfo 版本的兼容处理
      wx.getUserInfo({
        success: res => {
          app.globalData.userInfo = res.userInfo
          this.setData({
            userInfo: res.userInfo,
            hasUserInfo: true
          })
        }
      })
    }
  },
  getUserInfo: function(e) {
    console.log(e)
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
  onShareAppMessage() {
    return {
      title: 'TeamHelprt',
      imageUrl: '/images/share.jpg',
      path: '/pages/index/index'
    }
  }  
})