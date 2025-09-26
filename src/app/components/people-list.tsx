import { Plus, Trash2, Users } from "lucide-react";
import { TextInput } from "./text-input";
import { Button } from "./button";

type PeopleListProps = {
  people: string[];
  newPersonName: string;
  setNewPersonName: (name: string) => void;
  addPerson: () => void;
  removePerson: (name: string) => void;
};

export const PeopleList = (props: PeopleListProps) => {
  const { people, newPersonName, setNewPersonName, addPerson, removePerson } =
    props;
  return (
    <div className="mb-8">
      <div className="flex items-center gap-2 mb-4">
        <Users className="w-5 h-5" />
        <h2 className="text-xl font-semibold text-gray-700">People</h2>
      </div>

      <div className="flex gap-2 mb-4">
        <TextInput
          value={newPersonName}
          onChange={(e) => setNewPersonName(e.target.value)}
          placeholder="Add new person..."
          onEnterPress={addPerson}
          className="w-full"
        />

        <Button
          onClick={addPerson}
          className="px-4 py-2 text-white rounded-lg flex items-center gap-2 bg-blue-500 hover:bg-blue-600"
        >
          <Plus className="w-4 h-4" />
          Add
        </Button>
      </div>

      {people.length === 0 ? (
        <></>
      ) : (
        <div className="flex flex-wrap gap-2 mb-4">
          {people.map((person) => (
            <div
              key={person}
              className="flex items-center gap-2 px-3 py-1 rounded-full"
            >
              <span className="font-medium">{person}</span>
              <Button
                onClick={() => removePerson(person)}
                className="text-red-500 hover:text-red-700"
              >
                <Trash2 className="w-4 h-4" />
              </Button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
