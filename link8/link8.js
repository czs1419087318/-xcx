// pages/link8/link8.js
const DB = wx.cloud.database().collection("test")
let resultI={}
Page({

  /**
   * 页面的初始数据
   */
  data: {
    text1:"(至少有三次的记录且时间接近)\
    大喜小悲\n好事时机就在这一片范围\n什么都保持原样也不会有大问题",
    text2:'(至少有三次的记录且时间接近)\n大悲小喜\n成功在望却难有结果，做事拖延，做了也难有结果',
    text:'',
    decide:0,
    decidet:0,
    result:[]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getOpenid()

  },
return(){
  wx.redirectTo({
    url: '/pages/link7/link7',
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
    wx.cloud.database().collection("test")
    .doc(res.data[0]._id)
    .get()
    .then(res=>{console.log("读取成功",res)
    this.setData({
      result:res.data.result
    })})
    .catch(res=>{console.log("读取失败")})
})
  .catch(res=>{"id获取失败"})
},
show(){
 // console.log(this.data.result[0].result)
  if(this.data.result.length==0){
    this.setData({
      text:"抱歉，您还没有相应的记录"
    })
  }
  else{
  for(var i=0;i<(this.data.result.length);i++){
   // console.log("循环一次")
    var index=i
    if(this.data.result[index].result<3){this.data.decide=this.data.decide+1}
    if(this.data.result[index].result>3){this.data.decidet=this.data.decidet+1}
  }
  console.log(this.data.decide)
  console.log(this.data.decidet)
  if((this.data.decide/(this.data.decide+this.data.decidet))>0.5){
    this.setData({
      text:this.data.text1
    })
  }
  else{
    this.setData({
      text:this.data.text2
    })
  }
}
 // console.log(this.data.decide/(this.data.decide+this.data.decidet))
  //console.log(this.data.text)
  //console.log(this.data.text1)
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