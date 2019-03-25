var app = getApp();
Page({
  data:{
    date:'',
    objective:'',
    keysultArr:[],
    hidden:false
  },
  bindObjectiveInput:function(event){
    let objective = event.detail.value;
    this.setData({objective});
  },
  addInput:function(event){
    let keyresult = '';
    this.data.keysultArr.push({keyresult})
    this.setData({
      keysultArr:this.data.keysultArr
    })
  },
  removeIndex:function(index){
    this.data.keysultArr.splice(index,1);
    this.setData({
      keysultArr:this.data.keysultArr
    })
  },
   bindKeyresultInput:function(event){
    let index=event.currentTarget.dataset.index;
    let keysultArr = this.data.keysultArr;
    let value = event.detail.value;
    keysultArr[index] = value;
    this.setData({
      keysultArr
    });
  },
   bindDateChange(e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      date: e.detail.value
    })
  },
  bindSave:function(){
    let that = this;
    let objective = that.data.objective;
    let keyresultArr = that.data.keysultArr;
    let keyresults = [];
    keyresultArr.forEach((item,index)=>{
      keyresults.push(item)
    })
    console.log(keyresults);
    let date = that.data.date;
    let tokens = app.globalData.tokens;
    console.log(tokens);
    wx.request({
      url:'http://localhost:3000/api/okr',
      data:{
        tokens:tokens,
        objective:objective,
        keyresult:keyresults,
        deadline:date
      },
      method:'POST',
      success:function(res){
        console.log(res)
        if(res.data.code==200){
          let url = '/pages/my_okr/my_okr'
          wx.navigateTo({url});
        }
      }
    })
  },
  bindCancel:function(){
    let url = '/pages/my_okr/my_okr'
    wx.navigateTo({url})
  }

})