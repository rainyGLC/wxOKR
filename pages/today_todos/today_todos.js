var app = getApp();
Page({
  data:{
    today:'',//当前okr
    objectivesArr:[],//当前OKr
    todoOne:'',
    todoTwo:'',
    todoThree:'',
    surprise:'',
    okrOne:[],
    okrTwo:[],
    okrThree:[],//三件事的关联okrId
    writingOne:[],
    writingTwo:[],
    writingThree:[],//三件事的关联文字
    show:true,
    temporary:[]
  },
  todoOneInput:function(event){
    let todoOne=event.detail.value;
    this.setData({todoOne})
  },
  todoTwoInput:function(event){
    let todoTwo=event.detail.value;
    this.setData({todoTwo});
  },
  todoThereInput:function(event){
    let todoThree= event.detail.value;
    this.setData({todoThree})
  },
  happinessInput:function(event){
    let surprise=event.detail.value;
    this.setData({surprise})
  },
  relevance:function(event){
    let that = this;
    let today = that.data.today;
    let index=event.currentTarget.dataset.index;
    that.data.show=false;
    that.setData({
      show:that.data.show,
      today:index
    });
    console.log(this.data.today)
    let tokens = app.globalData.tokens;
    wx.request({
      url:"http://localhost:3000/api/okr",
      data:{
        tokens:tokens
      },
      method:'GET',
      success:(res)=>{
        if(res.data.code==200){
          // let objectivesArr = res.data.data.map(data => {
          //   let keyresults = data.keyresults
          //   keyresults.forEach(item => item.active = false)
          //   return data
          // })
          this.setData({ objectivesArr: res.data.data})
        }
      }
    })
  },
  hindeBtn:function(){
    let that=this;
    let today=that.data.today;
    that.data.show=true;
    that.setData({
      show:that.data.show
    });
    if(today==1){
      that.data.okrOne = [];
      that.data.writingOne=[];
      that.setData({
        okrOne:that.data.okrOne,
        writingOne:that.data.writingTwo
      })
    }else if(today==2){
      that.data.okrTwo=[];
      that.data.writingTwo=[];
      that.setData({
        okrTwo:that.data.okrTwo,
        writingTwo:that.data.writingTwo
      })
    }else{
      that.data.okrThree=[];
      that.data.writingThree=[];
      that.setData({
        okrThree:that.data.okrThree,
        writingThree:that.data.writingThree
      })
    }
  },
  highlight:function(event){
    let today=this.data.today;
    console.log(today);
    let obj_index = event.currentTarget.dataset.obj_index;
    let kr_index = event.currentTarget.dataset.kr_index;
    let id = event.currentTarget.dataset.id;
    let keyresult = event.currentTarget.dataset.title;
    let objectivesArr = this.data.objectivesArr;
    let active = objectivesArr[obj_index].keyresults[kr_index].active
    // let active = objectivesArr[obj_index].keyresults[kr_index].active ? true : false;
    objectivesArr[obj_index].keyresults[kr_index].active = !active;
    this.setData({ objectivesArr })
    if(!active){
      if(today==1){      
        this.data.okrOne.push(id);
        this.data.writingOne.push(keyresult);
        this.setData({
          okrOne:this.data.okrOne,
          writingOne:this.data.writingOne
        })
        console.log(this.data.okrOne);
        console.log(this.data.writingOne);
      }else if(today==2){
        this.data.okrTwo.push(id);
        this.data.writingTwo.push(keyresult);
        this.setData({
          okrTwo:this.data.okrTwo,
          writingTwo:this.data.writingTwo
        })
        console.log(this.data.okrTwo);
        console.log(this.data.writingTwo);
      }else if(today==3){
        this.data.okrThree.push(id);
        this.data.writingThree.push(keyresult);
        this.setData({
          okrThree:this.data.okrThree,
          writingThree:this.data.writingThree
        })
        console.log(this.data.okrThree);
        console.log(this.data.writingThree);
      }
    }else{
      if(today==1){
        this.data.okrOne.forEach((item,data)=>{
          if(item==id){
            kr_index=data
          }
        })
        this.data.okrOne.splice(kr_index,1);
        this.data.writingOne.splice(kr_index,1);
        this.setData({
          okrOne:this.data.okrOne,
          writingOne:this.data.writingOne
        })
        console.log(this.data.okrOne);
        console.log(this.data.writingOne);
      }else if(today==2){
        this.data.okrTwo.forEach((item,data)=>{
          if(item==id){
            kr_index=data
          }
        })
        this.data.okrTwo.splice(kr_index,1);
        this.data.writingTwo.splice(kr_index,1);
        this.setData({
          okrTwo:this.data.okrTwo,
          writingTwo:this.data.writingTwo
        })
        console.log(this.data.okrTwo);
        console.log(this.data.writingTwo);
      }else if(today==3){
        this.data.okrThree.forEach((item,data)=>{
          if(item==id){
            kr_index=data
          }
        })
        this.data.okrThree.splice(kr_index,1);
        this.data.writingThree.splice(kr_index,1);
        this.setData({
          okrThree:this.data.okrThree,
          writingThree:this.data.writingThree
        })
        console.log(this.data.okrThree);
        console.log(this.data.writingThree)
      } 
    }
  },
  ensure:function(){
    this.data.show=true;
    this.setData({show:this.data.show})
  },
  save:function(){
    let surprise=this.data.surprise;
    let data =[{value:this.data.todoOne,keyresults:this.data.okrOne},
    {value:this.data.todoTwo,keyresults:this.data.okrTwo},
    {value:this.data.todoThree,keyresults:this.data.okrThree}];
    let tokens = app.globalData.tokens;
    wx.request({
      url:'http://localhost:3000/api/todos',
      data:{
        tokens:tokens,
        todos:data,
        surprise:surprise
      },
      method:'POST',
      success:(res)=>{
       if(res.data.code==200){
        let id = res.data.todos_id;
        let url="/pages/notreflection/notreflection?id=" + id;
        wx.navigateTo({url})
       }
      }
    })
  }
  // onShow(){
  //   let today=this.data.todat;
  //   if(today==1){
  //     this.data.temporary=this.data.writingOne;
  //   }else if(today==2){
  //     this.data.temporary=this.data.writingTwo;
  //   }else if(today==3){
  //     this.data.temporary=this.data.writingThree;
  //   }
  // }
})










