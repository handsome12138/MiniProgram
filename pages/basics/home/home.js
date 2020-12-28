Component({
  options: {
    addGlobalClass: true,
  },
  data: {
    skeletonShow:true,
    elements: [],  
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
    onLoad: function (options) {
      console.log(options);
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