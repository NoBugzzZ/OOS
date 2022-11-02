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

const Account = {
  "type": "object",
  "title": "Account",
  "properties": {
    "netEarning": {
      "type": "integer",
      "formula": "Income.total - Expense.total"
    },
    "income": {
      "$ref": "#/$defs/Income"
    },
    "expense": {
      "$ref": "#/$defs/Expense"
    }
  },
  "$defs": {
    "Item": {
      "type": "object",
      "title": "Item",
      "properties": {
        "value": {
          "type": "integer",
          "title": "value",
        }
      }
    },
    "Income": {
      "type": "object",
      "title": "Income",
      "properties": {
        "total": {
          "type": "integer",
          "formula": "SUM(Item.value)",
        },
        "items": {
          "type": "array",
          "items": {
            "$ref": "#/$defs/Item"
          }
        }
      }
    },
    "Expense": {
      "type": "object",
      "title": "Expense",
      "properties": {
        "total": {
          "type": "integer",
          "formula": "SUM(Item.value)",
        },
        "items": {
          "type": "array",
          "items": {
            "$ref": "#/$defs/Item"
          }
        }
      }
    }
  }
}

module.exports = {
  Income,
  Account
}