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
        // console.log(val)
        if(val){
          this.setData({
            done_checks: Array(val.length).fill(true),
          })
        }
        // console.log("done_checks set finished")
      }
    },
    undone_tasks:{
      type:Object,
      value:{},
      // 监听值的改变赋初值，在生命周期函数里不好使
      observer:function(val){
        if(val != null){
          this.setData({
            undone_checks: Array(val.length).fill(false),
          })
        }
        // console.log("undone_checks set finished")
      }
    },
  },
  methods:{
    longpress:function(e){
      var that = this;
      var tid = e.currentTarget.dataset.tid;//获取当前长按task id
      var type = e.currentTarget.dataset.type;//获取当前长按task 类型 done/undone
      var index = e.currentTarget.dataset.index;//获取当前长按task index
      console.log(e.currentTarget.dataset)
      wx.showModal({
        title: '提示',
        content: '确定要删除此Task吗？',
        success: function (res) {
          if (res.confirm) {
            console.log('确定删除了');
            wx.request({
              url: 'https://wychandsome12138.xyz/api/post/delete_task',
              method: "POST",
              data:{
                "tid": tid
              },
              success: function(res){
                console.log("success delete task", res.data)
                if(type == "done"){
                  var temp_task = that.data.done_tasks, temp_check = that.data.done_checks
                  temp_task.splice(index,1);
                  temp_check.splice(index,1);
                  that.setData({
                    done_tasks: temp_task,
                    done_checks: temp_check
                  })
                }else{ //undone
                  var temp_task = that.data.undone_tasks, temp_check = that.data.undone_checks
                  temp_task.splice(index,1);
                  temp_check.splice(index,1);
                  that.setData({
                    undone_tasks: temp_task,
                    undone_checks: temp_check
                  })
                }
                //console.log(res.data.length)
              },
              fail: function(res){
                console.log("delete task 的 request 失败！")
              }
            });
          } else if (res.cancel) {
            console.log('点击取消了');
            return false;    
          }
        }
      })
    },
    tap:function(e){
        // this.donghua();
       //done 和 undone部分的逻辑交给调用组件的部分实现，undone,done作为component的property
      //  console.log(e);
      //  console.log(this.data)
      var tid = null;
      if(e.target.dataset.type == 'done'){
        var ce = 'done_checks[' + e.target.dataset.index + ']'
        tid = this.data.done_tasks[e.target.dataset.index].id
        this.setData({
          [ce]: !this.data.done_checks[e.target.dataset.index]
        }) 
      }else{
        var ce = 'undone_checks[' + e.target.dataset.index + ']'
        tid = this.data.undone_tasks[e.target.dataset.index].id
        this.setData({
          [ce]: !this.data.undone_checks[e.target.dataset.index]
        }) 
      }
      this.alter_task_status(tid);
     },
     alter_task_status(tid){
      wx.request({
        url: 'https://wychandsome12138.xyz/api/post/alter_task_status',
        method: "POST",
        data:{
          "tid": tid
        },
        success: function(res){
          console.log("alter task status success")
        },
        fail: function(res){
          console.log("alter task status 的 request 失败！")
        }
      });
     },
      donghua: function () {
        console.log("donghua ！")
       
     },
    
   },
  lifetimes: {
    ready: function() {
      // 在组件实例进入页面节点树时执行
    },
  },
})