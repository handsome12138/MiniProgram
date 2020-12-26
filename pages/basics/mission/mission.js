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
    undone: [{
      title: '完成小程序构建',
      content: '完成小程序注册哈哈哈哈哈哈哈哈',
      ddl: '12月1日',
      tag: '微信小程序实践',
    },
    {
      title: '进一步完成小程序构建',
      content: '哈哈哈哈哈哈哈1111111111111222222',
      ddl: '12月5日',
      tag: '微信小程序实践',
    },
    {
      title: '完成后端逻辑整理',
      content: '创建数据库给出api，让前端可以调用',
      ddl: '12月22日',
      tag: '大作业',
    },
    {
      title: '做视频',
      content: '将大作业做成视频aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈或',
      ddl: '12月30日',
      tag: '大作业展示',
    }],
    done: [{
      title: '组队',
      content: '完成组队啊啊啊',
      ddl: '11月11日',
      tag: '抱大腿',
    },
    {
      title: '第一次小会',
      content: '讨论内容啊啊啊啊啊啊',
      ddl: '11月22日',
      tag: '组队',
    }]

  },
    /**
   * 组件的属性列表
   */
  properties: {
    done_tasks:{
      type:Object,
      value:{}
    },
    undone_tasks:{
      type:Object,
      value:{}
    }
  },
   methods:{
     tap:function(){
        this.donghua();
       //这里wx.request重新请求done和undone的数据，setdata后重新渲染页面
     },
     donghua: function () {
      setTimeout(function () {
        animation.translateY(2000).step({ duration: 6000 })
        this.setData({
          ["animationData" + i]: animation.export()
        })
        i++;
      }.bind(this), 600)
      if (i < 7) {
        setTimeout(function () {
          this.donghua()
        }.bind(this), 1000)
      } else {
        //console.log(22)
        setTimeout(function () {
          this.setData({
            donghua: false
          })
        }.bind(this), 4500)
        i=1;
      }
    }
   }
})