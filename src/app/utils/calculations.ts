const calculateSettlements = () => {
  const balances: Record<Person, number> = {};
  people.forEach((person) => {
    balances[person] = 0;
  });

  expenses.forEach((expense) => {
    const taxAmount = expense.amount * (taxRate / 100);
    const serviceFeeAmount = expense.amount * (serviceFeeRate / 100);
    const totalAmount = expense.amount + taxAmount + serviceFeeAmount;

    const sharePerPerson = totalAmount / expense.splitAmong.length;

    balances[expense.paidBy] += expense.amount;

    expense.splitAmong.forEach((person) => {
      balances[person] -= sharePerPerson;
    });
  });

  const totalExpenses = expenses.reduce(
    (sum, expense) => sum + expense.amount,
    0
  );
  const totalTax = totalExpenses * (taxRate / 100);
  const totalServiceFee = totalExpenses * (serviceFeeRate / 100);
  const totalAdditionalFees = totalTax + totalServiceFee;

  if (totalAdditionalFees > 0 && people.length > 0) {
    const feePerPerson = totalAdditionalFees / people.length;
    people.forEach((person) => {
      balances[person] -= feePerPerson;
    });
    balances[people[0]] += totalAdditionalFees;
  }

  const settlements: Settlement[] = [];
  const creditors: { person: Person; amount: number; }[] = [];
  const debtors: { person: Person; amount: number; }[] = [];

  Object.entries(balances).forEach(([person, balance]) => {
    if (balance > 0.01) {
      creditors.push({ person, amount: balance });
    } else if (balance < -0.01) {
      debtors.push({ person, amount: Math.abs(balance) });
    }
  });

  let i = 0,
    j = 0;
    
  while (i < creditors.length && j < debtors.length) {
    const creditor = creditors[i];
    const debtor = debtors[j];
    const amount = Math.min(creditor.amount, debtor.amount);

    if (amount > 0.01) {
      settlements.push({
        from: debtor.person,
        to: creditor.person,
        amount,
      });
    }

    creditor.amount -= amount;
    debtor.amount -= amount;

    if (creditor.amount < 0.01) i++;
    if (debtor.amount < 0.01) j++;
  }

  return { balances, settlements, totalTax, totalServiceFee };
};

export { calculateSettlements };