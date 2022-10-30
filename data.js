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

export {Income}