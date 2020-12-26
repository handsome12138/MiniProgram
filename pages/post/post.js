const app = getApp();
Page({
  data: {
    info:[],  
    value:'',
    StatusBar: app.globalData.StatusBar,
    CustomBar: app.globalData.CustomBar,
    index: null,
    proj_name: null,
    proj_content: null,
    proj_ddl: null,
    userInfo:null,
    openId:null

  },
  PickerChange(e) {
    console.log(e);
    this.setData({
      index: e.detail.value
    })
  },
  MultiChange(e) {
    this.setData({
      multiIndex: e.detail.value
    })
  },
  TimeChange(e) {
    this.setData({
      time: e.detail.value
    })
  },
  DateChange(e) {
    this.setData({
      date: e.detail.value
    })
  },
  RegionChange: function(e) {
    this.setData({
      region: e.detail.value
    })
  },
  ChooseImage() {
    var imgList=this.data.imgList;
    console.log(imgList)
    wx.chooseImage({
      count: 4, //默认9
      sizeType: ['original', 'compressed'], //可以指定是原图还是压缩图，默认二者都有
      sourceType: ['album'], //从相册选择
      success: (res) => {
        
        if (imgList.length != 0) {
          this.setData({
            imgList: imgList.concat(res.tempFilePaths)
          })
        } else {
          this.setData({
            imgList: res.tempFilePaths
          })
        }
      }
    });
  },
  ViewImage(e) {
    wx.previewImage({
      urls: this.data.imgList,
      current: e.currentTarget.dataset.url
    });
  },
  textareaAInput(e) {
    this.setData({
      textareaAValue: e.detail.value
    })
  },
  textareaBInput(e) {
    this.setData({
      textareaBValue: e.detail.value
    })
  },
    additem:function(){ 
    var that=this;
    var info = this.data.info; 
    info.push(1);
    console.log(info)  
    that.setData({  
        info:info 
        }) 
    },
  getValue:function(e){ 
    this.setData({  
        title:e.detail.value,  
        })  
    },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var _this = this;
    var mydate = new Date();
    _this.setData({
      proj_ddl: mydate.toLocaleDateString().replace(/\//g,'-')
      // 用当前时间初始化
    })
    wx.getUserInfo({
      success: res => {
        //console.log(res)
        _this.setData({
          userInfo:res.userInfo
        })
      }
    })
    wx.cloud.callFunction({
      // 云函数名称
      name: 'getProj',
      // 传给云函数的参数
      data: {},
      success: function(res) {
        //console.log(res.result.userInfo.openId)
        _this.setData({
          openId:res.result.userInfo.openId
        })
      }
    })
  },
  submit_create: function(){
    var _this = this;
    console.log(_this.data.proj_name, _this.data.proj_content, _this.data.proj_ddl,_this.data.openId);
    // 这是绑定给提交按钮的时间，调用接口提交create
    wx.request({
      url: 'https://wychandsome12138.xyz/api/post/create_proj',
      method: "POST",
      data:{
        "usrid": "create_proj_test_id",
        // ====================之后这里要换成openid的 ===============
        "openid":_this.data.openId,
        "projcolor": 255, //这没什么用
        "projname": _this.data.proj_name,
        "content": _this.data.proj_content,
        "ddl": _this.data.proj_ddl
      },
      success: function(res){
        console.log(res.data)
      },
      fail: function(res){
        console.log("create project 的 wx request 失败！")
      }
    })

  }
})