var app = getApp();
Page({
  data:{
    keyresults:[],
    objective:'',
    deadline:'',
    id:'',
    days:''
  },
  onLoad:function(options){
    let id = options.id
    this.getData(id);
  },
  getData:function(id){
    wx.request({
      url:'http://localhost:3000/api/okr/' + id,
      method:'GET',
      data:{
        id:id
      },
      success:(res)=>{
        if(res.data.code==200){
          let deadlineTime = res.data.data.deadline;
          let date = new Date(deadlineTime);
          let nowadays = new Date();
          let total = (date - nowadays)/1000;
          let surplus = parseInt(total / (24*60*60));

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
          let days = '';
          if(surplus<0){
            days = 0
          }else{
            days = surplus
          }
          this.setData({
            keyresults:res.data.data.keyresults,
            objective:res.data.data.objective,
            deadline:deadline,
            id:res.data.data.id,
            days:days
          })
        }
      }
    })
  },
  bindEdit:function(event){
    let id = event.currentTarget.dataset.id;
    let url="/pages/edit_okr/edit_okr?id=" + id;
    wx.navigateTo({url})
  }
})