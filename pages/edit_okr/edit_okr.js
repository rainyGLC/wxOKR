Page({
  data:{
    date:'',
    objective:'',
    keyresults:[],
    isDelete:[],//存储删除keysults的id
    id:''
  },
  bindDateChange(e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      date: e.detail.value
    })
  },
  onLoad:function(options){
    let id = options.id;
    this.getData(id)
  },
  getData(id){
    wx.request({
      url:'http://localhost:3000/api/okr/' + id,
      method:'GET',
      data:{
        id:id
      },
      success:(res)=>{
        if(res.data.code==200){
          let keyresultlist = res.data.data.keyresults;
          let keyresults =[];
          keyresultlist.forEach((item,index)=>{
            keyresults.push(item)
          })
          console.log(keyresults);
          let deadlineTime = res.data.data.deadline;
          let date = new Date(deadlineTime);
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
          this.setData({ 
            objective:res.data.data.objective,
            keyresults:keyresults,
            date:deadline,
            id:res.data.data.id
          })
        }
      }
    })
  },
  addInput:function(event){
    console.log(event);
    let keyresult='';
    this.data.keyresults.push({
      keyresult
    })
    this.setData({
      keyresults:this.data.keyresults
    })
    console.log(this.data.keyresults);
  },
  removeIndex:function(index){
    let tmp = this.data.keyresults.splice(index,1);
    let id=tmp[0].id;
    this.data.isDelete.push({id});
    console.log(this.data.isDelete)
    this.setData({
      keyresults:this.data.keyresults,
      isDelete:this.data.isDelete
    })
    console.log(this.data.keyresults);
    console.log(this.data.isDelete);
  },
  bindObjectiveInput:function(event){
    let objective = event.detail.value;
    this.setData({objective});
  },
  bindKeyresultInput:function(event){
    let index=event.currentTarget.dataset.index;
    console.log(index);
    let value = event.detail.value;
    let keyresults = this.data.keyresults;
    console.log(keyresults);
    keyresults[index]=value;
    this.setData({
      keyresults
    })
    console.log(this.data.keyresults);
  },
  bindCancel:function(event){
    let id = event.currentTarget.dataset.id;
    console.log(id);
    let url="/pages/view_okr/view_okr?id=" + id;
    wx.navigateTo({url})
  },
  // bindUpdate:function(event){
  //   let that = this;
  //   let id = event.currentTarget.dataset.id;
  //   let objective = that.data.objective;
  //   console.log(objective)
  //   let keyresults = that.data.keyresults;
  //   keyresults = keyresults.concat(that.data.isDelete);
  //   console.log(keyresults);
  //   let date = that.data.date
  //   console.log(id);
  //   wx.request({
  //     url:'http://localhost:3000/api/okr/' + id,
  //     method:'PUT',
  //     data:{
  //       id:id,
  //       objective:objective,
  //       keyresults:keyresults,
  //       deadline:date
  //     },
  //     success:(res)=>{
  //       if(res.data.code==200){
  //         let url = "/pages/view_okr/view_okr?id=" + id;
  //         wx.navigateTo({url})
  //       }
  //     }
  //   })
  // }
})











