"use client";

import React, { useState } from "react";
import { Trash2, Calculator } from "lucide-react";
import { Expense, NewExpense, Person, Settlement } from "./types";

import { PeopleList } from "./components/people-list";
import { TaxFeeSetting } from "./components/tax-fee-setting";
import { AddItem } from "./components/add-item";
import { SplitBillTitleInput } from "./components/split-bill-title-input";

export default function SplitBillApp() {
  const [splitBillTitle, setSplitBillTitle] = useState<string>("");
  const [people, setPeople] = useState<Person[]>([]);
  const [expenses, setExpenses] = useState<Expense[]>([]);
  const [newPersonName, setNewPersonName] = useState<string>("");
  const [newExpense, setNewExpense] = useState<NewExpense>({
    description: "",
    amount: "1",
    price: "",
    paidBy: "",
    splitAmong: [],
  });

  const [taxRate, setTaxRate] = useState<number>(0);
  const [serviceFeeRate, setServiceFeeRate] = useState<number>(0);

  const addPerson = () => {
    if (newPersonName.trim() && !people.includes(newPersonName.trim())) {
      const updatedPeople = [...people, newPersonName.trim()];
      setPeople(updatedPeople);
      setNewExpense((prev) => ({
        ...prev,
        splitAmong: updatedPeople,
      }));
      setNewPersonName("");
    }
  };

  const removePerson = (personToRemove: Person) => {
    const updatedPeople = people.filter((person) => person !== personToRemove);
    setPeople(updatedPeople);

    setExpenses((prev) =>
      prev.map((expense) => ({
        ...expense,
        splitAmong: expense.splitAmong.filter(
          (person) => person !== personToRemove
        ),
        paidBy:
          expense.paidBy === personToRemove ? updatedPeople[0] : expense.paidBy,
      }))
    );

    setNewExpense((prev) => ({
      ...prev,
      splitAmong: prev.splitAmong.filter((person) => person !== personToRemove),
      paidBy: prev.paidBy === personToRemove ? updatedPeople[0] : prev.paidBy,
    }));
  };

  const addItem = () => {
    if (
      newExpense.description.trim() &&
      newExpense.amount &&
      newExpense.splitAmong.length > 0
    ) {
      setExpenses((prev) => [
        ...prev,
        {
          ...newExpense,
          price: parseFloat(newExpense.price),
          amount: parseFloat(newExpense.amount),
          id: Date.now(),
        },
      ]);
      setNewExpense({
        description: "",
        amount: "1",
        price: "",
        paidBy: people[0] ?? "",
        splitAmong: [...people],
      });
    }
  };

  const removeExpense = (expenseId: number) => {
    setExpenses((prev) => prev.filter((expense) => expense.id !== expenseId));
  };

  const togglePersonInSplit = (person: Person) => {
    setNewExpense((prev) => ({
      ...prev,
      splitAmong: prev.splitAmong.includes(person)
        ? prev.splitAmong.filter((p) => p !== person)
        : [...prev.splitAmong, person],
    }));
  };

  const calculateSettlements = () => {
    const balances: Record<Person, number> = {};
    people.forEach((person) => {
      balances[person] = 0;
    });

    expenses.forEach((expense) => {
      const taxAmount = expense.price * (taxRate / 100);
      const serviceFeeAmount = expense.price * (serviceFeeRate / 100);
      const totalAmount = expense.price + taxAmount + serviceFeeAmount;

      const sharePerPerson = totalAmount / expense.splitAmong.length;

      balances[expense.paidBy] += expense.price;

      expense.splitAmong.forEach((person) => {
        balances[person] -= sharePerPerson;
      });
    });

    const totalExpenses = expenses.reduce(
      (sum, expense) => sum + expense.price,
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
    const creditors: { person: Person; price: number }[] = [];
    const debtors: { person: Person; price: number }[] = [];

    Object.entries(balances).forEach(([person, balance]) => {
      if (balance > 0.01) {
        creditors.push({ person, price: balance });
      } else if (balance < -0.01) {
        debtors.push({ person, price: Math.abs(balance) });
      }
    });

    let i = 0,
      j = 0;
    while (i < creditors.length && j < debtors.length) {
      const creditor = creditors[i];
      const debtor = debtors[j];
      const price = Math.min(creditor.price, debtor.price);

      if (price > 0.01) {
        settlements.push({
          from: debtor.person,
          to: creditor.person,
          price,
        });
      }

      creditor.price -= price;
      debtor.price -= price;

      if (creditor.price < 0.01) i++;
      if (debtor.price < 0.01) j++;
    }

    return { balances, settlements, totalTax, totalServiceFee };
  };

  const { balances, settlements, totalTax, totalServiceFee } =
    calculateSettlements();

  const totalExpenses = expenses.reduce(
    (sum, expense) => sum + expense.amount,
    0
  );

  const grandTotal = totalExpenses + totalTax + totalServiceFee;

  return (
    <div className="mt-10">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white rounded-xl shadow-lg p-6 mb-6">
          <div className="flex items-center gap-3 mb-6">
            <Calculator className="w-8 h-8" />

            <h1 className="text-3xl font-bold text-gray-800">
              Split Bill Calculator
            </h1>
          </div>

          {/* <SplitBillTitleInput
            value={splitBillTitle}
            onChange={(e) => setSplitBillTitle(e.target.value)}
          /> */}

          <PeopleList
            people={people}
            newPersonName={newPersonName}
            setNewPersonName={setNewPersonName}
            addPerson={addPerson}
            removePerson={removePerson}
          />

          <AddItem
            newExpense={newExpense}
            setNewExpense={setNewExpense}
            people={people}
            togglePersonInSplit={togglePersonInSplit}
            addItem={addItem}
          />

          {/* <TaxFeeSetting
            taxRate={taxRate}
            setTaxRate={setTaxRate}
            serviceFeeRate={serviceFeeRate}
            setServiceFeeRate={setServiceFeeRate}
            totalExpenses={totalExpenses}
            totalTax={totalTax}
            totalServiceFee={totalServiceFee}
            grandTotal={grandTotal}
          /> */}

          <div className="mb-8">
            <h3 className="text-lg font-semibold text-gray-700 mb-4">
              {splitBillTitle || "Expenses"}
              {" "}
              {expenses.length > 0 && (
                <span className="text-sm font-normal text-gray-600">
                  (Subtotal: ${totalExpenses.toFixed(2)}
                  {(taxRate > 0 || serviceFeeRate > 0) &&
                    ` • Total with fees: ${grandTotal.toFixed(2)}`}
                  )
                </span>
              )}
            </h3>

            {expenses.length === 0 ? (
              <p className="text-gray-500 text-center py-8">
                No expenses added yet
              </p>
            ) : (
              <div className="space-y-3">
                {expenses.map((expense) => (
                  <div
                    key={expense.id}
                    className="bg-white border border-gray-200 rounded-lg p-4 flex items-center justify-between"
                  >
                    <div className="flex-1">
                      <div className="flex items-center gap-3">
                        <h4 className="font-medium text-gray-800">
                          {expense.description}
                        </h4>
                        <span className="text-green-600 font-semibold">
                          ${expense.price.toFixed(2)}
                        </span>
                      </div>
                      <div className="text-sm text-gray-600 mt-1">
                        Paid by{" "}
                        <span className="font-medium">{expense.paidBy}</span> •
                        Split among: {expense.splitAmong.join(", ")}
                        {(taxRate > 0 || serviceFeeRate > 0) && (
                          <span className="text-blue-600 ml-2">
                            ($
                            {(
                              (expense.amount +
                                (expense.amount * (taxRate + serviceFeeRate)) /
                                  100) /
                              expense.splitAmong.length
                            ).toFixed(2)}{" "}
                            per person incl. fees)
                          </span>
                        )}
                      </div>
                    </div>
                    <button
                      onClick={() => removeExpense(expense.id)}
                      className="text-red-500 hover:text-red-700 ml-4"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* {expenses.length > 0 && (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div>
                <h3 className="text-lg font-semibold text-gray-700 mb-4">
                  Individual Balances
                </h3>
                <div className="space-y-2">
                  {Object.entries(balances).map(([person, balance]) => (
                    <div
                      key={person}
                      className="flex justify-between items-center p-3 bg-gray-50 rounded-lg"
                    >
                      <span className="font-medium">{person}</span>
                      <span
                        className={`font-semibold ${
                          balance > 0
                            ? "text-green-600"
                            : balance < 0
                            ? "text-red-600"
                            : "text-gray-600"
                        }`}
                      >
                        {balance > 0 ? "+" : ""}${balance.toFixed(2)}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-gray-700 mb-4">
                  Who Owes Whom
                </h3>
                {settlements.length === 0 ? (
                  <p className="text-gray-500 p-3 bg-gray-50 rounded-lg">
                    Everyone is settled up! 🎉
                  </p>
                ) : (
                  <div className="space-y-2">
                    {settlements.map((settlement, index) => (
                      <div
                        key={index}
                        className="p-3 bg-yellow-50 border border-yellow-200 rounded-lg"
                      >
                        <span className="font-medium text-gray-800">
                          {settlement.from}
                        </span>
                        <span className="text-gray-600"> owes </span>
                        <span className="font-medium text-gray-800">
                          {settlement.to}
                        </span>
                        <span className="text-yellow-700 font-semibold ml-2">
                          ${settlement.amount.toFixed(2)}
                        </span>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          )} */}
        </div>
      </div>
    </div>
  );
}
