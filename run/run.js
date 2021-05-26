// pages/run/run.js
//var ajax = require('../../unilt/ajax.js');//引入
const DB = wx.cloud.database().collection("test")
let result = []
let resultI={}
Page({

  /**
   * 页面的初始数据
   */
  data: {
    time: (new Date()).toString(),
    daynum:null,
    inputValue:null,
    inputValue1:null,
    inputValue2:null,
    inputValue3:null,
    decide:null,
    input: '',//输入框框的值
    openid:null,
    id:null,
    totol:null

  },
  
    //监听输入事件



  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {   
   this.getOpenid()
    
  },
  totol(e){
    wx.cloud.database().collection('test')
    .where({
      _openid:e
    })
    .count()
    .then(res => {
      console.log("成功",res)
      this.setData({
        totol:res.total
      })
    })
    .catch(res=>{
      console.log("失败")
    })
  },
  link1(){
    if(this.data.totol){
    wx.cloud.database().collection("test")
    .doc(this.data.id)
    .get()
    .then(res=>{console.log("读取成功",res)
    result=res.data.result})
    .catch(res=>{console.log("读取失败")})}
    this.link1later()
  },
 addInfo(e){
    DB.add({
      data:{
        name:"czs",
        result:e
      },
      success(res){
        console.log("S")},
      fail(res){
        console.log("F")},
    })
  },

    add(e,a){   
 
      resultI.result=e
      resultI.id=a
      resultI.time=(new Date()).toString()
      result.push(resultI)
      console.log("You enter")
      wx.cloud.callFunction({
        name:"add",
        data:{
          result:result,
        }
      })
      .then(res=>{console.log("改变状态成功")})
      .catch(res=>{console.log("改变状态失败")})

  },
  bindKeyInput: function (e) {
    this.setData({
      inputValue: e.detail.value
    })
  },
  bindKeyInput1: function (e) {
    this.setData({
      inputValue1: e.detail.value
    })
  },
  bindKeyInput2: function (e) {
    this.setData({
      inputValue2: e.detail.value
    })
  },
  bindKeyInput3: function (e) {
    this.setData({
      inputValue3: e.detail.value
    })
  },
  getOpenid(){
    wx.cloud.callFunction({
      name:"get",
    })
    .then(res=>{console.log("成功")
    this.setData({
      openid:res.result.openid
   })  
   this.totol(res.result.openid)
   console.log(this.data.openid)
   this.getid(res.result.openid)
})
    .catch(res=>{console.log("失败")})
  },
  getid(e){
    wx.cloud.database().collection('test')
    .where({
      _openid:e
    })
    .get()
    .then(res=>{  
      this.setData({
    id:res.data[0]._id
  })
  console.log("id获取成功",res.data[0]._id)
  console.log(this.data.id)
})
    .catch(res=>{"id获取失败"})
  },
link1later(){ 
  this.setData({
    decide:((this.data.inputValue+this.data.inputValue1-2+((this.data.inputValue2-1)/2).toPrecision(1))%6)&&((this.data.inputValue+this.data.inputValue1-2+((this.data.inputValue2-1)/2).toPrecision(1))%6)|0||0
  })
  console.log(this.data.totol)
  if(this.data.totol!=0)
  {  this.add(this.data.decide,this.data.id) 
 }
  else{
     this.addInfo(this.data.decide)
   }
  switch (this.data.decide) {
    case 0:
      wx.redirectTo({
        url: '/pages/link1/limk1',
      })
      break;
    case 1:
      wx.redirectTo({
        url: '/pages/link2/link2',
      })
      break;
    case 2:
        wx.redirectTo({
          url: '/pages/link3/link3',
        })
        break;
    case 3:
          wx.redirectTo({
            url: '/pages/link4/link4',
          })
          break;
    case 4:
            wx.redirectTo({
              url: '/pages/link5/link5',
            })
            break;
    case 5:
              wx.redirectTo({
                url: '/pages/link6/link6',
              })
              break;  
    default:
      break;
  }
  },
  bindKeyInput2: function (e) {
    this.setData({
      inputValue2: e.detail.value
    })
  },
link3(){
  this.setData({
    decide:((this.data.inputValue3%6))
  })
  console.log(this.data.decide)
  switch (this.data.decide) {
    case 0:
      wx.redirectTo({
        url: '/pages/link1/limk1',
      })
      break;
    case 1:
      wx.redirectTo({
        url: '/pages/link2/link2',
      })
      break;
    case 2:
        wx.redirectTo({
          url: '/pages/link3/link3',
        })
        break;
    case 3:
          wx.redirectTo({
            url: '/pages/link4/link4',
          })
          break;
    case 4:
            wx.redirectTo({
              url: '/pages/link5/link5',
            })
            break;
    case 5:
              wx.redirectTo({
                url: '/pages/link6/link6',
              })
              break;  
    default:
      break;
  }
  },
  link2(){
    wx.redirectTo({
      url: '/pages/index/index',
    })
  }, 
link4(){
    wx.redirectTo({
      url: '/pages/index/index',
    })
  },
  link5(){
    wx.redirectTo({
      url: '/pages/link7/link7',
    })
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})