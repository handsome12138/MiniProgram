const app = getApp();
Page({
  data: {
    navbarInitTop: 0, //导航栏初始化距顶部的距离
    isFixedTop: true, //是否固定顶部
    PageCur: 'missionslist'
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
  }
})