const app = getApp();
Page({
  data: {
    navbarInitTop: 0, //导航栏初始化距顶部的距离
    isFixedTop: true, //是否固定顶部
    PageCur: 'missionslist',
    projId: null,
    date: '2020-11-27',
  }, 
  NavChange(e) {
    this.setData({
      PageCur: e.currentTarget.dataset.cur
    })
  },
  onLoad:function(options) {
    var pid = options.projId;
    this.setData({
      projId:pid
    })
    let that = this;
    setTimeout(function() {
      that.setData({
        loading: true
      })
    }, 500)
    console.log(this.data.projId)
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
})