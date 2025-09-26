import { Plus } from "lucide-react";
import { TextInput } from "./text-input";
import { Button } from "./button";
import { NewExpense } from "../types";

type AddItemProps = {
  newExpense: NewExpense;
  setNewExpense: React.Dispatch<React.SetStateAction<NewExpense>>;
  people: string[];
  togglePersonInSplit: (person: string) => void;
  addItem: () => void;
};

export const AddItem = (props: AddItemProps) => {
  const { newExpense, setNewExpense, people, togglePersonInSplit, addItem } =
    props;

  return (
    <div className="mb-8 p-4 bg-gray-50 rounded-lg">
      <h3 className="text-lg font-semibold text-gray-700 mb-4">
        Add Item
      </h3>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
        <TextInput
          type="text"
          value={newExpense.description}
          onChange={(e) =>
            setNewExpense((prev) => ({
              ...prev,
              description: e.target.value,
            }))
          }
          placeholder="Item name"
        />

        <div className="flex gap-2">
          <TextInput
            type="number"
            value={newExpense.amount}
            onChange={(e) =>
              setNewExpense((prev) => ({
                ...prev,
                amount: e.target.value,
              }))
            }
            placeholder="Amount"
            className="w-full"
            min={1}
          />

          <div className="flex items-center bg-white border border-gray-300 rounded-lg px-3">
            <span className="text-black">$</span>
          </div>

          <TextInput
            type="number"
            value={newExpense.price}
            onChange={(e) =>
              setNewExpense((prev) => ({
                ...prev,
                price: e.target.value,
              }))
            }
            placeholder="Price"
            step="0.01"
            className="w-full"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
        {/* <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Paid by:
          </label>

          <select
            value={newExpense.paidBy}
            onChange={(e) =>
              setNewExpense((prev) => ({
                ...prev,
                paidBy: e.target.value,
              }))
            }
            className="text-black w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 "
          >
            {people.map((person) => (
              <option key={person} value={person}>
                {person}
              </option>
            ))}
          </select>
        </div> */}

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Split among:
          </label>
          <div className="flex flex-wrap gap-2">
            {people.map((person) => (
              <Button
                key={person}
                onClick={() => togglePersonInSplit(person)}
                className={`px-3 py-1 rounded-full text-sm font-medium ${newExpense.splitAmong.includes(person)
                    ? "bg-red-400 text-white"
                    : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                  }`}
              >
                {person}
              </Button>
            ))}
          </div>
        </div>
      </div>

      <Button
        onClick={addItem}
        className="w-full bg-green-600 hover:bg-green-700 flex items-center justify-center gap-2"
      >
        <Plus className="w-4 h-4" />
        Add Expense
      </Button>
    </div>
  );
};
