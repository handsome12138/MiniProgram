const app = getApp()
Component({
  lifetimes:{

    ready(){
      try{
        var that=this
        this.setData({
          userInfo:app.globalData.userInfo
        })      
      }catch(E){
        console.log(0);
      }
    }
  },
  options: {
    addGlobalClass: true,
  },
  data: {
    finishedNum: 8,
    unfinishedNum: 15,
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo')
  },
  methods: {
    showQrcode() {
      wx.previewImage({
        urls: ['https://image.weilanwl.com/color2.0/zanCode.jpg'],
        current: 'https://image.weilanwl.com/color2.0/zanCode.jpg' // 当前显示图片的http链接      
      })
    },
  }
})

