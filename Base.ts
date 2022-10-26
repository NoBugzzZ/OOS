interface Constraint {
  source: string[];
  target: string;
  result: (arg: any) => any;
}

class Base {
  constraints: Constraint[];
  constructor(constraints: Constraint[] = []) {
    this.constraints = constraints;
  }
}

export default Base;

export { Constraint };
