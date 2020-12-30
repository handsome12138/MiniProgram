// share/share.js
const app = getApp();
Page({
  /**
   * 页面的初始数据
   */
  data: {
    eye:true,
    userInfo:null,
    hasUserInfo:false,
    openid: null, 
    pid:0,
    projinfo: null
  },
  // options: {
  //   addGlobalClass: true,
  // },
  joinProj:function(options){
    _this.setData({
      pid: options.pid,
      projinfo: options.projinfo
    });
    wx.request({
      url: 'https://wychandsome12138.xyz/api/post/join_proj',
      method: "POST",
      data:{
        "id": this.data.openid,
        "url": this.data.userInfo.avatarUrl,
        "name":this.data.userInfo.nickName,
        "projid": projId,
      },
      success: function(res){
        console.log(res)
       
        wx.showToast({
          title: '加入成功',
        })
      },
      fail: function(res){
        console.log("请求加入proj的request 失败！")
      }
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var _this = this;
    this.getUserInfoFun();
    wx.cloud.init();
    wx.cloud.callFunction({
      // 云函数名称
      name: 'getProj',
      // 传给云函数的参数
      data: {},
      success: function(res) {
        //console.log(res.result.userInfo.openId)
        _this.setData({
          openid:res.result.userInfo.openId
        })
      }
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    // console.log(this.data.eye)
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  },
  getUserInfoFun: function (){
    var _this = this;
    wx.getUserInfo({
        success: function (res){
          console.log(res)　　　　　　　//do anything
          _this.setData({
            userInfo: res,
            eye: true
          })
        },
        fail: function(res){
          // _this.showPrePage();
          _this.setData({
            eye: false
          })
        }
      })
  },
  showPrePage:function(){
      console.log("show PrePage");
      this.setData({
        eye:false
      })
  }
})