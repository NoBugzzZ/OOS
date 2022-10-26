import Income from "./Income";
import Expense from "./Expense";
import Base, { Constraint } from "./Base";
import emmiter from "./Event";

class Account extends Base {
  income: Income;
  expense: Expense;
  netEarings: number;
  constructor(
    income: Income,
    expense: Expense,
    constraints: Constraint[] = []
  ) {
    super(constraints);
    this.income = income;
    this.expense = expense;
    emmiter.on("Income", () => {});
    emmiter.on("Expense", () => {});
  }
  do(): void {
    this.constraints.forEach((constraint) => {
      const { source, target, result } = constraint;
      (this as any)[target] = result((this as any)[source]);
    });
  }
}
