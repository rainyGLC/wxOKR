var app = getApp();
Page({
  data:{
    objectives:[],
    message:''
  },
  onLoad:function(options){
    this.getDate()
  },
  getDate:function(){
    let tokens = app.globalData.tokens;
    console.log(tokens);
    wx.request({
      url:"http://localhost:3000/api/okr",
      data:{
        tokens:tokens
      },
      method:'GET',
      success:(res)=>{
        if(res.data.data.length){
          let objectives=res.data.data;
          let objectiveArr = objectives.map((item,index)=>{
            let deadlines = item.deadline;
            let date = new Date(deadlines);
            let fullYear = date.getFullYear();
            let month = date.getMonth() + 1;
            if(month >=1 && month <=9){
              month = "0" + month;
            }
            let day = date.getDate();
            if(day >=0 && day<=9){
              day ="0" + day;
            }
            let deadline = fullYear +'-' + month + '-' +day;
            return{
              objective:item.objective,
              id:item.id,
              deadline:deadline,
              keyresults:item.keyresults
            }
          })
          this.setData({
            objectives:objectiveArr,
          })
        }else{
          this.setData({
            message:'你还没有添加OKR'
          })
        }
      }
    })
  },
  bindAdd:function(){
    let url = '/pages/add_okr/add_okr'
    wx.navigateTo({url})
  },
  bindViewOkr:function(event){
    let id = event.currentTarget.dataset.id;
    let url="/pages/view_okr/view_okr?id=" + id;
    wx.navigateTo({url})
  }

})