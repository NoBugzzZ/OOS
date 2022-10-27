const budget = {
  total: 0,
  categories: [],
  years: [],
};

const category = {
  name: "computer",
  total: 0,
  cpys: budget.years.map(year => ({ year, qauntity: 10, cost: 10, total: 100 })),
}

const year = {
  year: 2000,
  total: 0,
  cpys: budget.categories.map(category => ({ category, qauntity: 20, cost: 20, total: 400 })),
}

budget.categories.push(category);
budget.years.push(year);

console.dir(budget, { depth: null });
category.name = "zz"
console.dir(budget, { depth: null });

// const year2001 = {
//   year: 2001,
//   total: 0,
//   categories: budget.categories,
// }

// budget.years.push(year2001)
// console.dir(budget, { depth: null });