import Base, { Constraint } from "./Base";
import emmiter from "./Event";

class Item {
  value: number;
  constructor(value: number) {
    this.value = value;
  }
}

class Income extends Base {
  items: Item[];
  total: number;
  constructor(
    items: Item[] = [],
    total: number = 0,
    constraints: Constraint[] = []
  ) {
    super(constraints);
    this.items = items;
    this.total = total;
  }
  insert(index: number = 0, item: Item): void {
    this.items.splice(index, 0, item);
    this.do();
  }
  delete(index: number = 0): void {
    this.items.splice(index, 1);
    this.do();
  }
  do(): void {
    this.constraints.forEach((constraint) => {
      const { source, target, result } = constraint;
      (this as any)[target] = result();
    });
    emmiter.emit("Income");
  }
}

export default Income;

const income = new Income([], 0, [
  {
    source: ["items"],
    target: "total",
    result: (items: any[]) => items.reduce((prev, cur) => prev + cur.value, 0),
  },
]);
console.dir(income, { depth: null });
income.insert(0, new Item(2));
income.insert(0, new Item(3));
income.insert(2, new Item(4));
console.dir(income, { depth: null });

income.delete(1);
console.dir(income, { depth: null });
