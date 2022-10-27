function parser(schema) {
  const {type,title,properties,$defs}=schema;
  const root={};
  const refs=[];
  for(let key of Object.keys(properties)){
    traverse(properties[key],root,$defs,refs);
  }

}

function traverse(schema,root,$defs,refs){
  const {type}=schema;
  if(type==="object"){
    const {properties}=schema;
    for(let key of Object.keys(properties)){
      traverse(properties[key],root,$defs,refs);
    }
  }else if(type==="array"){

  }else if(schema.hasOwnProperty("$ref")){

  }else{
    
  }
}

const Income = {
  type: "object",
  title: "Income",
  properties: {
    total: {
      type: "integer",
      formula: "SUM(Item.value)",
    },
    items: {
      type: "array",
      items: {
        $ref: "#/$defs/Item",
      },
    },
  },
  $defs: {
    Item: {
      type: "object",
      title: "Item",
      properties: {
        value: {
          type: "integer",
          title: "value",
        },
      },
    },
  },
};
