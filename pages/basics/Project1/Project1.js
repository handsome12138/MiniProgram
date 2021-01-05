const app = getApp();
Page({
  data: {
    navbarInitTop: 0, //导航栏初始化距顶部的距离
    isFixedTop: true, //是否固定顶部
    PageCur: 'missionslist',
    date: '2020-12-27',
    pid: null,
    projContent: null,
    portraits: null,
    new_task_title: null,
    new_task_content: null,
    new_task_ddl: null,
    new_task_create_day: null,
    percentage: '100%',
  }, 
  NavChange(e) {
    this.setData({
      PageCur: e.currentTarget.dataset.cur
    })
  },
  onLoad:function(options) {
    // var projid = options.projID;
    wx.showNavigationBarLoading(); 
    //显示 loading 提示框。需主动调用 wx.hideLoading 才能关闭提示框
    wx.showLoading({
      title: '加载中...',
    })
    this.setData({
      pid: options.projID,
    })
    this.onRefresh();
    // setTimeout(function() {
    //   that.setData({
    //     loading: true
    //   })
    // }, 500)
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
  submit_create_task(e){
    console.log("创建任务成功");
    var _this = this;
    this.hideModal(e);
    wx.request({
      url: 'https://wychandsome12138.xyz/api/post/create_task',
      method: "POST",
      data:{
        "pid": _this.data.pid,
        "vid": 1, //因为没考虑版本，所以暂时忽略
        "title": _this.data.new_task_title,
        "content": _this.data.new_task_content,
        "ddl": _this.data.new_task_ddl,
        "create_day": _this.data.new_task_create_day,
        // 下面都是暂时用不到的东西
        "method": 0,
        "need_min": 2,
        "need_max": 5,
        "color": 255
      },
      success: function(res){
        console.log("request to create task success!");
        console.log(res.data);
        _this.get_db_info(_this);
      },
      fail: function(res){
        console.log("create task 的 wx request 失败！")
      }
    })
  },
  get_db_info(_this){
    wx.request({
      url: 'https://wychandsome12138.xyz/api/get/get_one_proj_all',
      method: "POST",
      data:{
        "pid": _this.data.pid
      },
      success: function(res){
        console.log(res.data)
        _this.setData({
          projContent: res.data,
          percentage: ( (res.data.done_tasks.length + res.data.undone_tasks.length) > 0 )?Math.floor(res.data.done_tasks.length / (res.data.done_tasks.length + res.data.undone_tasks.length) * 100).toString() + '\%':'0%',
        }, ()=>{
          //隐藏loading 提示框
          wx.hideLoading();
          //隐藏导航条加载动画
          wx.hideNavigationBarLoading();
          //停止下拉刷新
          wx.stopPullDownRefresh();
        })
        // console.log(Math.floor(res.data.done_tasks.length / (res.data.done_tasks.length + res.data.undone_tasks.length) * 100).toString() + '\%')
      },
      fail: function(res){
        console.log("请求proj 所有数据的request 失败！")
      }
    });
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
  onPullDownRefresh: function (){
    wx.showNavigationBarLoading(); 
    //显示 loading 提示框。需主动调用 wx.hideLoading 才能关闭提示框
    wx.showLoading({
      title: '刷新中...',
    })
    this.onRefresh();
    
  },
  onRefresh: function(){
    var _this = this;
    var mydate = new Date();
    _this.setData({
      new_task_ddl: mydate.toLocaleDateString().replace(/\//g,'-'),
      new_task_create_day: mydate.toLocaleDateString().replace(/\//g,'-')
    },
    () => {
      _this.get_db_info(_this);
    })
  }
})