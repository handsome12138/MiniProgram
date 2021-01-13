const app = getApp();
Page({
  data: {
    navbarInitTop: 0, //导航栏初始化距顶部的距离
    isFixedTop: true, //是否固定顶部
    PageCur: 'missionslist',
    msgList:[
      {
        projName:"习概大作业",
        taskName:"完成课堂讨论记录",
        time:"2020-12-14 23:10",
        leftTime:"24h",
      },
      {
        projName:"微信小程序",
        taskName:"完成前端页面构建",
        time:"2020-12-14 13:10",
        leftTime:"48h",
      },
      {
        projName:"马原论文",
        taskName:"完成引言部分撰写",
        time:"2020-12-11 11:11",
        leftTime:"1h",
      },
      {
        projName:"系统消息",
        taskName:"学习使用TeamHelper",
        time:"2020-12-11 11:11",
        leftTime:"12h",
      }

    ]
  },
  NavChange(e) {
    this.setData({
      PageCur: e.currentTarget.dataset.cur
    })
  },
  onLoad() {
    let that = this;
    setTimeout(function() {
      that.setData({
        loading: true
      })
    }, 500)
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
  gridchange: function (e) {
    this.setData({
      gridCol: e.detail.value
    });
  },
  gridswitch: function (e) {
    this.setData({
      gridBorder: e.detail.value
    });
  },
  menuBorder: function (e) {
    this.setData({
      menuBorder: e.detail.value
    });
  },
  delItem: function (e) {
    //获取列表中要删除项的下标
    var index = e.currentTarget.dataset.index;
    console.log(index)
    var msgList = this.data.msgList;
    //移除列表中下标为index的项
    msgList.splice(index, 1);
    //更新列表的状态
    this.setData({
        msgList: msgList
    });
  },
  menuArrow: function (e) {
    this.setData({
      menuArrow: e.detail.value
    });
  },
  menuCard: function (e) {
    this.setData({
      menuCard: e.detail.value
    });
  },
  switchSex: function (e) {
    this.setData({
      skin: e.detail.value
    });
  },

  // ListTouch触摸开始
  ListTouchStart(e) {
    this.setData({
      ListTouchStart: e.touches[0].pageX
    })
  },

  // ListTouch计算方向
  ListTouchMove(e) {
    this.setData({
      ListTouchDirection: e.touches[0].pageX - this.data.ListTouchStart > 0 ? 'right' : 'left'
    })
  },

  // ListTouch计算滚动
  ListTouchEnd(e) {
    if (this.data.ListTouchDirection =='left'){
      this.setData({
        modalName: e.currentTarget.dataset.target
      })
    } else {
      this.setData({
        modalName: null
      })
    }
    this.setData({
      ListTouchDirection: null
    })
  }
})
