function sum(items=[],key=''){
  return items.reduce((prev,cur)=>prev+cur[key],0);
}

module.exports={
  Formula:{
    "SUM":sum
  }
}