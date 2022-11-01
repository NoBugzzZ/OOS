const Income = {
  type: "object",
  title: "Income",
  properties: {
    items: {
      type: "array",
      items: {
        $ref: "#/$defs/Item",
      },
    },
    total: {
      type: "integer",
      formula: "SUM(Item.value)",
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

module.exports={
  Income
}