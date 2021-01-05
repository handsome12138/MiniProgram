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
    ready: function () {
      console.log(this.data.elements.length)
      var that=this
      if(this.data.elements.length==0){
        setTimeout(function () {
          that.setData({
            hastask:false
          })
          console.log(that.data.hastask)
         }, 5000)
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