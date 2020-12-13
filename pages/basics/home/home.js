// Page({
//   onLoad: function (res) {
//     var that = this 
//     wx.request({
//       url: '47.98.210.49:996', 
//       header: {
//         'content-type': 'application/json' // 默认值
//       },
//       success: function (res) {
//         console.log(res.data.data.forecast)
//         that.setData({
//           Industry: res.data.data.forecast
//         })  
//       },
//       fail: function () {
//        console.log("fail")
//       },
//       complete: function () {
//          that.setData({
//            isshow:false
//          })
//       } 
//     })
//   }
// })
Component({
  options: {
    addGlobalClass: true,
  },
  data: {
    skeletonShow:true,
    elements: [{
        title: 'Project1',
        name: '完成小程序注册哈哈哈哈哈哈哈哈',
        ddl: '12月1日',
        icon: 'newsfill',
        number:5
      },
      {
        title: 'Project2',
        name: '建立自己的小程序',
        ddl: '12月5日',
        icon: 'font',
        number:4
      },
      {
        title: 'Project3',
        name: '前端设计',
        ddl: '12月1日',
        icon: 'icon',
        number:2
      },
      {
        title: 'Project4',
        name: '连接数据库',
        ddl: '12月5日',
        icon: 'newsfill',
        number:5
      },
      {
        title: '项目8',
        name: '后端交互完成',
        ddl: '12月9日',
        icon: 'btn',
        number:3
      }
    ],
    members:[
      {
        name: '唐呈凌',
        url:'https://ossweb-img.qq.com/images/lol/web201310/skin/big10001.jpg'
      },
    ]
  },
  /**
   * 组件的属性列表
   */
  properties: {
    elements:{
      type:Object,
      value:{}
    }
  },
  lifetimes:{
    onLoad: function (options) {
    }
  }
})