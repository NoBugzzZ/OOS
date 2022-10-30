function parser(schema) {
  const { type, title, properties, $defs } = schema;
  const root = {};
  const refs = [];
  const path = '#';
  const data={};
  for (let key of Object.keys(properties)) {
    data[key]=traverse(properties[key], root, $defs, refs);
  }
  return data;
}
const getDefault = (type) => {
  const mapper = {
    "integer": 0,
    "number": 0.0,
    "string": "",
    "boolean": false,
    "null": null
  }
  return mapper[type];
}
function traverse(schema, root, $defs, refs) {
  const { type } = schema;
  if (type === "object") {
    const { properties } = schema;
    for (let key of Object.keys(properties)) {
      traverse(properties[key], root, $defs, refs);
    }
  } else if (type === "array") {
    if (schema.hasOwnProperty("$ref")) {

    } else {
      const { items } = schema;
      traverse(items, root, $defs, refs);
    }
  } else if (schema.hasOwnProperty("$ref")) {

  } else {
    return getDefault();
  }
}

const test=parser(Income);


