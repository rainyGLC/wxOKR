var app = getApp();

Page({
  data:{
    name:'',
    password:'',
    hidden:true,
    toastText:''
  },
  bindNameInput:function(event){
    let name = event.detail.value;
    this.setData({name})
  },
  bindPassInput:function(event){
    let password = event.detail.value;
    this.setData({password})
  },
  startLogin:function(){
    let that = this;
    if(!that.data.name || !that.data.password){
      that.setData({
        hidden:true
      })
      return
    }
    wx.request({
      url:'http://localhost:3000/api/login',
      data:{
        name:that.data.name,
        password:that.data.password
      },
      method:'POST',
      header:{
        'content-type':'application/json'
      },
      success:function(res){
        let key = res.data.token;
        if(res.data.code==200){
          wx.setStorage({
            key:"tokens",
            data:res.data.token,
            success:function(){
              wx.navigateTo({url:'/pages/add_okr/add_okr'})
            }
          })
        }else if(res.data.code==0){
          that.setData({
            hidden:false,
            toastText:res.data.data.msg
          })
        }
      },
      fail:function(err){
        console.log(err)
        this.setData({
          toastText:'网络发生错误'
        })
      }
    })
  },
  // onShow:function(){
  //   let url = 'http://localhost:3000/api/login';
  //   console.log(url)
  //   wx.getStorage({
  //     key:'token',
  //     success(res){
  //       console.log(res.data)
  //       if(key && !url){
  //         wx.redirectTo({
  //           url:'/pages/login/login'
  //         })
  //         return
  //       }
  //       if(key && url){
  //         wx.redirectTo({
  //           url:url
  //         })
  //       }

  //     }
  //   })
  // }
})


