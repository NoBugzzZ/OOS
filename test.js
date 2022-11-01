const data=[];
const proxy=new Proxy(data,{
  get(target,p,receiver){
    const res= Reflect.get(target, p, receiver);
    // if(p==="push"){
    //   console.log(p,proxy)
    // }
    return res;
  },
  set(target,p,newValue,receiver){
    const prev=proxy.length;
    const res=Reflect.set(target, p, newValue, receiver);
    if(p==="length"){
      console.log("set",p,newValue,proxy);
      console.log(prev,proxy.length)
      if(prev===proxy.length){
        
      }else{
        console.log("splice",prev,proxy.length)
      }
    }
    // if(p==="push"){
    //   console.log("push",p,newValue,proxy);
    // }
    return res
  }
})

proxy.push({value:1});
proxy.push({value:2})
proxy.splice(1,1);
console.log(proxy);