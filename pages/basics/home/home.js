Component({
  options: {
    addGlobalClass: true,
  },
  data: {
    skeletonShow:true,
    elements: [],  
    hastask:true
  },
  /**
   * 组件的属性列表
   */
  properties: {
    elements:{
      type:Object,
      value:{}
    },
    users:{
      type:Object,
      value:{}
    }
  },
  lifetimes:{
    // show: function() {
    //   this.onPullDownRefresh=function(){
    //     var _this = this;
    //     wx.cloud.init();
    //     wx.cloud.callFunction({
    //       // 云函数名称
    //       name: 'getProj',
    //       // 传给云函数的参数
    //       data: {},
    //       success: function(res) {
    //         // console.log("云函数 success!", res)
    //         _this.setData({
    //           openid: res.result.userInfo.openId
    //         },()=>{
    //           // console.log("云函数 success 的 setData 的回调函数！");
    //           _this.after_get_openid(_this);
    //           if(type == "Refresh"){
    //             //隐藏loading 提示框
    //             wx.hideLoading();
    //             //隐藏导航条加载动画
    //             wx.hideNavigationBarLoading();
    //             //停止下拉刷新
    //             wx.stopPullDownRefresh();
    //           }
    //         })
    //       },
    //       fail: function(res) {
    //         console.log("刷新 云函数 get proj fail :", res)
    //       }
    //     });  
    //   }
    // },
    ready: function () {
      console.log(this.data.elements.length)
      var that=this
      if(this.data.elements.length==0){
        setTimeout(function () {
          that.setData({
            hastask:false
          })
          //console.log(that.data.hastask)
         }, 3000)
      }     
    }
  },
  methods:{
    containerTap:function(res){
      // console.log(res.touches[0]);
      var x=res.touches[0].pageX-5;
      var y=res.touches[0].pageY+85;
      this.setData({
        rippleStyle:''
      });
      this.setData({
        rippleStyle:'top:'+y+'px;left:'+x+'px;-webkit-animation: ripple 0.4s linear;animation:ripple 0.4s linear;'
      });
    }
  }
})