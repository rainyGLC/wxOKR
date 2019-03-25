var app = getApp();
Page({
  data:{
    todos:[],
    surprise:'',
    notreflection:''
  },
  onLoad:function(options){
    console.log(options);
    let id = options.id
    this.getDate(id)
  },
  getDate:function(id){
    let tokens = app.globalData.tokens; 
    wx.request({
      url:'http://localhost:3000/api/todos',
      data:{
        tokens:tokens
      },
      method:'GET',
      success:(res=>{
        console.log(res)
        if(res.data.code==200){
          let newData=res.data.data[0];
          let reflect=newData.reflect;
          console.log(reflect);
        }
      })
    })
  },
  bindAdd:function(){

  }
  
})