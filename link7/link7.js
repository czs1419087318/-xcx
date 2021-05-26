// pages/link7/link7.js
const DB = wx.cloud.database().collection("test")
let holder={}
let result=[]
let arry=[]
Page({

  /**
   * 页面的初始数据
   */
  data: {
    result:[],
    openid:null,
    id:null
  },
 onClick(){
   wx.showToast({
     title: '清空完成'
   })
 },
  /**
   * 生命周期函数--监听页面加载
   */

  onLoad: function (options) {
    this.getOpenid()
  },
  getOpenid(){
    wx.cloud.callFunction({
      name:"get",
    })
    .then(res=>{console.log("成功")
    this.setData({
      openid:res.result.openid
   })  
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
  let that=this  
  wx.cloud.database().collection("test")
  .doc(res.data[0]._id)
  .get()
  .then(res=>{console.log("读取成功",res)
  that.setData({
    result:res.data.result
  })})

  .catch(res=>{console.log("读取失败",res)})
})
    .catch(res=>{"id获取失败"})
  },
return(){
wx.redirectTo({
  url: '/pages/run/run',
})
},
clearData(){
  result.pop()
  console.log(result)
  wx.cloud.database().collection('test')
  .doc(this.data.id)
  .update({
    data:{
      result:result
    }

  })
  .then(res=>{
    console.log("更新成功")
    wx.redirectTo({
      url: '/pages/link7/link7',
    })
  })
  .catch(res=>{
    console.log("更新失败")
  })


},
showRecent(){
  wx.redirectTo({
    url: '/pages/link8/link8',
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