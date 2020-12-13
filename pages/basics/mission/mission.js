Component({
  options: {
    addGlobalClass: true,
  },
  data: {
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
   methods:{
     tap(){
       console.log(1);
     }
   }
})