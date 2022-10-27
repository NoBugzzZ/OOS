interface RootNode {
  type: "object";
  title: string;
  properties: Property;
  $defs?: Property;
}

interface Property {
  [key: string]: JSNode | RefNode;
}

interface RefNode {
  $ref: string;
}

type JSNode = FundamentalNode | ArrayNode | ObjectNode;

interface FundamentalNode {
  type: "string" | "number" | "integer" | "boolean" | "null";
  title?: string;
  formula?: string;
}

interface ArrayNode {
  type: "array";
  title?: string;
  items: JSNode | RefNode;
}

interface ObjectNode {
  type: "object";
  title?: string;
  properties: Property;
  $defs?: Property;
}

export default RootNode;

export { ObjectNode, ArrayNode, FundamentalNode, RefNode, JSNode };
