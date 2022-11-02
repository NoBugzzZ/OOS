function parser(schema) {
  const { type, title, properties, $defs } = schema;
  const data = {};
  for (let key of Object.keys(properties)) {
    data[key] = traverse(properties[key], schema, $defs);
  }
  return schema;
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
const getBasicType = () => {
  return ["integer", "number", "string", "boolean", "null"]
}
function resolveRef($defs, ref = "") {
  if (ref.startsWith("#/$defs/")) {
    const s = ref.split("/");
    return $defs[s[2]];
  }
}
function traverse(schema, root, $defs) {
  // console.dir({ schema, root, $defs })
  const { type } = schema;
  if (type === "array") {
    const { items } = schema;
    if (items.hasOwnProperty("$ref")) {
      if (!(root.hasOwnProperty("_refs"))) {
        root["_refs"] = [];
      }
      root["_refs"].push({ type: "array", ref: items["$ref"] });
      // console.dir()
      const refSchema = resolveRef($defs, items["$ref"]);
      const { properties } = refSchema;
      const data = {};
      for (let key of Object.keys(properties)) {
        data[key] = traverse(properties[key], refSchema, $defs);
      }
      // console.log(data);
      // return [data]
    } else {
      // traverse(items, root, $defs, refs);
    }
  } else if (schema.hasOwnProperty("$ref")) {
    if (!(root.hasOwnProperty("_refs"))) {
      root["_refs"] = [];
    }
    root["_refs"].push({ type: "object", ref: schema["$ref"] });
    const refSchema = resolveRef($defs, schema["$ref"]);
    const { properties } = refSchema;
    const data = {};
    for (let key of Object.keys(properties)) {
      data[key] = traverse(properties[key], refSchema, $defs);
    }
  } else {
    // return getDefault(type);
    if (schema.hasOwnProperty("formula")) {
      if (!(root.hasOwnProperty("_formulas"))) {
        root["_formulas"] = [];
      }
      root["_formulas"].push({ formula: schema["formula"] })
    }
  }
}

function parseData(schema) {
  const { $defs } = schema;
  return traverseForData(schema, schema, $defs);
}

function resolveFormula(formula = "") {
  // console.log("###",formula)
  const start = formula.indexOf("(");
  const end = formula.lastIndexOf(")");
  const param = formula.slice(start + 1, end).split(".");
  const func = formula.slice(0, start);
  return [func, param];
}

const { EventEmitter } = require('./Event')
const event = new EventEmitter();
const { Formula } = require("./Function");
function resolveRefName(ref) {
  if (ref.startsWith("#/$defs/")) {
    const s = ref.split("/");
    return s[2];
  }
}
function observe(obj) {
  return new Proxy(obj, {
    get(target, p, receiver) {
      // console.log("get", p);
      return Reflect.get(target, p, receiver);
    },
    set(target, p, newValue, receiver) {
      // console.log("set", p, newValue);
      return Reflect.set(target, p, newValue, receiver);
    }
  })
}
function traverseForData(schema, root, $defs) {
  const { type } = schema;
  if (type === "object") {
    const { properties } = schema;
    const data = {};
    const basicType = getBasicType();
    for (let key of Object.keys(properties)) {
      const property = properties[key];
      if (basicType.includes(property["type"])) {
        data[key] = getDefault(property["type"]);
        if (property.hasOwnProperty("formula")) {
          const formula = property["formula"];
          const formulaPattern = /^[A-Z]+\(.*\)$/i
          if (formulaPattern.test(formula)) {
            const [func, param] = resolveFormula(formula);
            // console.log(func, param);
            event.on(param[0], (...params) => {
              // console.log(Formula,func,params)
              data[key] = Formula[func](...params);
            });
          }
        }
      } else {
        data[key] = traverseForData(properties[key], root, $defs);
      }
    }
    return data;
  } else if (schema.hasOwnProperty("$ref")) {

  } else if (type === "array") {
    const { items } = schema;
    if (items.hasOwnProperty("$ref")) {
      let data = [];
      const refSchema = resolveRef($defs, items["$ref"]);
      const refName = resolveRefName(items["$ref"]);
      const { _formulas: formulas } = root;
      formulas.forEach(formula => {
        const [func, param] = resolveFormula(formula.formula);
        if (param[0] === refName) {
          data = new Proxy(data, {
            get(target, p, receiver) {
              return Reflect.get(target, p, receiver);
            },
            set(target, p, newValue, receiver) {
              const prev = data.length;
              const res = Reflect.set(target, p, newValue, receiver);
              if (p === "length") {
                // console.log("set", p, newValue, data);
                event.emit(param[0], data, param[1]);
                const len = data.length
                if (prev === len) {
                  console.log("push", len)
                  data[len - 1] = new Proxy(data[len - 1], {
                    set(target, p, newValue, receiver) {
                      const res = Reflect.set(target, p, newValue, receiver);
                      event.emit(param[0], data, param[1]);
                      return res;
                    }
                  })
                } else {
                  console.log("splice", len)
                }
              }
              return res
            }
          })
        }
      })
      data.push(traverseForData(refSchema, refSchema, $defs));
      return data
    } else {
      // traverse(items, root, $defs, refs);
    }
  }
}

{
  const { Account } = require("./data");
  const schema = parser(Account);
  console.dir(schema, { depth: null });
  const data = parseData(schema);
  console.dir(data, { depth: null })
}

// {
//   const { Income } = require("./data")
//   const schema = parser(Income);
//   console.dir(schema, { depth: null });
//   const data = parseData(schema);
//   console.dir(data, { depth: null });
//   data.items.push({ value: 2 });
//   console.dir(data, { depth: null });
//   data.items.push({ value: 3 });
//   console.dir(data, { depth: null });
//   data.items[0].value = 1
//   console.dir(data, { depth: null });
// }

// function toSpreadSheet(data, direction = "vertical") {
//   const spreedsheet = [];
//   for (let key of Object.keys(data)) {
//     const label = [{ value: key }]
//     spreedsheet.push(label)
//     if (!Array.isArray(data[key])) {
//       const cell = [{ value: data[key] }]
//       spreedsheet.push(cell)
//     } else {
//       // console.log(data[key])
//       data[key].forEach(d => {
//         const cell = [];
//         for (let k of Object.keys(d)) {
//           cell.push({ value: d[k] ,
//             insert:()=>{data[key].push({value:0})},
//             update:(value)=>{d[k]=value},
//           })
//         }
//         spreedsheet.push(cell)
//       })

//     }
//   }
//   return spreedsheet;
// }

// const spreadsheet=toSpreadSheet(data)

// console.dir(spreadsheet, { depth: null })

// spreadsheet[1][0].update(5);

// console.dir(toSpreadSheet(data), { depth: null })