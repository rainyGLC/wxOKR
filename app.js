//app.js
App({
  onLaunch: function(options){
    try{
      this.globalData.tokens = wx.getStorageSync('tokens'); 
    }catch(e){
      console.log(e)
    }
  },
  globalData:{
    tokens:''
  },
  onShow: function(options) {

  },
  onHide: function() {
      // 生命周期函数--监听小程序隐藏
  },
  onError: function(msg) {
      // 错误监听函数
  },
})


 // onShow:function(){
 //    let url = 'http://localhost:3000/api/login';
 //    console.log(url)
 //    wx.getStorage({
 //      key:'token',
 //      success(res){
 //        console.log(res.data)
 //        if(key && !url){
 //          wx.redirectTo({
 //            url:'/pages/login/login'
 //          })
 //          return
 //        }
 //        if(key && url){
 //          wx.redirectTo({
 //            url:url
 //          })
 //        }

 //      }
 //    })
 //  }