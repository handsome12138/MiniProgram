const app = getApp();
Page({
  data: {
    pid: null,
    users: [],
    StatusBar: app.globalData.StatusBar,
    CustomBar: app.globalData.CustomBar,
    hidden: true,
    userinfo:[],
    openid:null
  },
  onShareAppMessage: function () {
    //console.log(userInfo.nickName);
    return {
        title: 'TeamHelper',
        desc: '快来加入我们的项目和大家一起肝DDL吧',
        imageUrl: '/static/TeamHelper.jpg',  
        path: "/share/share?pid=" + this.data.pid + "&inviter=" + app.globalData.userInfo.nickName // 路径，传递参数到指定页面。
    }
  },
  onLoad(options) {
    var _this = this;
    this.setData({
      pid: options.pid
    },()=>{
      wx.request({
        url: 'https://wychandsome12138.xyz/api/get/get_users_by_idlist',
        method: "POST",
        data:{
          "projid": [_this.data.pid]
        },
        success: function(res){
          _this.setData({
            users: res.data[_this.data.pid]
          });
          // console.log(res.data[_this.data.pid]);
        },
        fail: function(res){
          console.log("请求proj users的 list的request 失败！")
        }
      });
    });
    let list = [];
    for (let i = 0; i < 26; i++) {
      list[i] = String.fromCharCode(65 + i)
    }
    this.setData({
      list: list,
      listCur: list[0]
    })                                   
  },
  // onReady() {
   
  //   try{
  //     var that=this
  //     this.setData({
  //       userInfo:app.globalData.userInfo,
  //       openid:app.globalData.openId
  //     })      
  //   }catch(E){
  //     console.log(0);
  //   }
  //   console.log(this.data.userInfo)
  //   console.log(app.globalData.openId)
  //   var userinfo=this.data.userinfo
  //   var projId=23
  //     wx.request({
  //       url: 'https://wychandsome12138.xyz/api/post/join_proj',
  //       method: "POST",
  //       data:{
  //         "id":app.globalData.openId,
  //         "url": userinfo.avatarUrl,
  //         "name":userinfo.nickName,
  //         "projid": projId,
  //       },
  //       success: function(res){
  //         console.log(res)
         
  //         wx.showToast({
  //           title: '加入成功',
  //         })
  //       },
  //       fail: function(res){
  //         console.log("请求加入proj的request 失败！")
  //       }
  //     })
  // },
  // options: {
  //   addGlobalClass: true,
  // } 
});