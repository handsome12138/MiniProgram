const app = getApp();
Page({
  data: {
    navbarInitTop: 0, //导航栏初始化距顶部的距离
    isFixedTop: true, //是否固定顶部
    PageCur: 'missionslist',
    date: '2020-11-27',
    pid: null,
    projContent: null,
    portraits: null
  }, 
  NavChange(e) {
    this.setData({
      PageCur: e.currentTarget.dataset.cur
    })
  },
  onLoad:function(options) {
    // var projid = options.projID;
    var _this = this;
    let that = this;
    this.setData({
      pid: options.projID
    },
    () => {
      console.log(_this.pid); //按理来说这里作为回调应该已经赋值完了才对，奇怪
      wx.request({
        url: 'https://wychandsome12138.xyz/api/get/get_one_proj_all',
        method: "POST",
        data:{
          "pid": options.projID
        },
        success: function(res){
          console.log(res.data)
          _this.setData({
            projContent: res.data
          })
        },
        fail: function(res){
          console.log("请求proj 所有数据的request 失败！")
        }
      });
    })
    setTimeout(function() {
      that.setData({
        loading: true
      })
    }, 500)
    
  },
  showModal(e) {
    this.setData({
      modalName: e.currentTarget.dataset.target
    })
  },
  hideModal(e) {
    this.setData({
      modalName: null
    })
  },
})