Page({
  data:{
    eye:true,
    userInfo: null
  },
  onLoad:function(){
   
  },
  onShow: function (options){
    this.getUserInfoFun()
  },
  getUserInfoFun: function (){
    var _this = this;
    wx.getUserInfo({
        success: function (res){
          console.log(res)　　　　　　　//do anything
          _this.setData({
            userInfo: res,
          })
        },
        fail: _this.showPrePage
      })
  },
  showPrePage:function(){
      this.setData({
        eye:false
      })
  }
})