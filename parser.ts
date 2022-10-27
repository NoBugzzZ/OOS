import RootNode,{JSNode,ObjectNode,ArrayNode,FundamentalNode,RefNode} from "./types";

function parser(schema: RootNode):void {
  traverse(schema)
}

function traverse(schema: JSNode):void {
  const {type}=schema;
  if(type==="object"){

  }else if(type==="array"){

  }else{

  }
}

const Income:JSNode = {
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
