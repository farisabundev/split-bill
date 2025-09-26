type Person = string;

type NewExpense = {
  description: string;
  price: string;
  amount: string;
  paidBy: Person;
  splitAmong: Person[];
};

type Expense = {
  id: number;
  description: string;
  amount: number;
  price: number;
  paidBy: Person;
  splitAmong: Person[];
};

type Settlement = {
  from: Person;
  to: Person;
  price: number;
};

export type { Person, Expense, NewExpense, Settlement };