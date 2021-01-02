var animation = wx.createAnimation({});
var i = 1;
Component({
  options: {
    addGlobalClass: true,
  },
  data: {
    donghua: true,
    left1: Math.floor(Math.random() * 400 + 1),
    left2: Math.floor(Math.random() * 300 + 1),
    left3: Math.floor(Math.random() * 200 + 1),
    left4: Math.floor(Math.random() * 400 + 1),
    left5: Math.floor(Math.random() * 300 + 1),
    left6: Math.floor(Math.random() * 650 + 1),
    undone: [],
    done: [],
    done_checks: null,
    undone_checks:null
  },
    /**
   * 组件的属性列表
   */
  properties: {
    done_tasks:{
      type:Object,
      value:{},
      observer:function(val){
        this.setData({
          done_checks: Array(val.length).fill(true),
        })
        // console.log("done_checks set finished")
      }
    },
    undone_tasks:{
      type:Object,
      value:{},
      observer:function(val){
        this.setData({
          undone_checks: Array(val.length).fill(false),
        })
        // console.log("undone_checks set finished")
      }
    },
  },
   methods:{
     tap:function(e){
        // this.donghua();
       //done 和 undone部分的逻辑交给调用组件的部分实现，undone,done作为component的property
      //  console.log(e);
      //  console.log(this.data)
       if(e.target.dataset.type == 'done'){
         var ce = 'done_checks[' + e.target.dataset.index + ']'
         this.setData({
           [ce]: !this.data.done_checks[e.target.dataset.index]
         }) 
        //  this.properties.done_checks[e.target.dataset.index] = !this.properties.done_checks[e.target.dataset.index];
       }else{
        var ce = 'undone_checks[' + e.target.dataset.index + ']'
        this.setData({
          [ce]: !this.data.undone_checks[e.target.dataset.index]
        }) 
        // this.properties.undone_checks[e.target.dataset.index] = !this.properties.undone_checks[e.target.dataset.index];
       }
     },
    //  donghua: function () {
    //    console.log("donghua ！")
    //   setTimeout(function () {
    //     animation.translateY(2000).step({ duration: 6000 })
    //     this.setData({
    //       ["animationData" + i]: animation.export()
    //     })
    //     i++;
    //   }.bind(this), 600)
    //   if (i < 7) {
    //     setTimeout(function () {
    //       this.donghua()
    //     }.bind(this), 1000)
    //   } else {
    //     //console.log(22)
    //     setTimeout(function () {
    //       this.setData({
    //         donghua: false
    //       })
    //     }.bind(this), 4500)
    //     i=1;
    //   }
    // },
    
   },
  lifetimes: {
    ready: function() {
      // 在组件实例进入页面节点树时执行
    },
  },
})