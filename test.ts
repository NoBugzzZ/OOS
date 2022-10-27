function sum(...args:number[]){
  return args.reduce((prev,cur)=>prev+cur,0);
}

console.log(sum(...[1,2,3]))