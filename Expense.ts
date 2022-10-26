import Base, { Constraint } from "./Base";
import emmiter from "./Event";

class Item {
  value: number;
  constructor(value: number) {
    this.value = value;
  }
}

class Expense extends Base {
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
      (this as any)[target] = result((this as any)[source]);
    });
    emmiter.emit("Expense")
  }
}

export default Expense;

// const expense = new Expense([], 0, [
//   {
//     source: "items",
//     target: "total",
//     result: (items: any[]) => items.reduce((prev, cur) => prev + cur.value, 0),
//   },
// ]);
// console.dir(expense, { depth: null });
// expense.insert(0, new Item(2));
// expense.insert(0, new Item(3));
// expense.insert(2, new Item(4));
// console.dir(expense, { depth: null });

// expense.delete(1);
// console.dir(expense, { depth: null });
