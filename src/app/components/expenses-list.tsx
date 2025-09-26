import { Trash2 } from "lucide-react"
import { Expense } from "../types"

type ExpensesListProps = {
  splitBillTitle?: string
  expenses: Expense[]
  totalExpenses: number
  taxRate: number
  serviceFeeRate: number
  grandTotal: number
  removeExpense: (expenseId: number) => void
}

export const ExpensesList = (props: ExpensesListProps) => {
  const { splitBillTitle, expenses, totalExpenses, taxRate, serviceFeeRate, grandTotal, removeExpense } = props
  return (
    <div className="mb-8 p-4 bg-green-50 rounded-lg">
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
                  <span>
                    {expense.amount} x {expense.price.toFixed(2)} =
                  </span>
                  <span className="text-green-600 font-semibold">${(expense.amount * expense.price).toFixed(2)}</span>
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
  )
}