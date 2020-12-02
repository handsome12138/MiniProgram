Page({
  data: {
    PageCur: 'basics'
  },
  NavChange(e) {
    this.setData({
      PageCur: e.currentTarget.dataset.cur
    })
  },
  onShareAppMessage() {
    return {
      title: 'ColorUI-高颜值的小程序UI组件库',
      imageUrl: '/images/share.jpg',
      path: '/pages/index/index'
    }
  }
})
var _this = this;
wx.request({
  url: "https://api.imjad.cn/cloudmusic/", //上线的话必须是https，没有appId的本地请求貌似不受影响 
  method: 'GET', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT 
  header: {
    'content-type': 'json',
  }, // 设置请求的 header
  data: {
    'id':28012031
  },
  success: function(res) {
    console.log(1)
    console.log(res)
    if (res.data.code == 1) {
      _this.setData({
        phone: res.data.user.phone,
      })
    }
  },
  fail: function(res) {
    console.log("请求数据失败");
    console.log(res)
  },
  complete: function() {
    // complete 
  }
})