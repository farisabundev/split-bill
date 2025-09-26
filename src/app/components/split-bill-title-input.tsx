import { TextInput } from "./text-input";

type SplitBillTitleInputProps = {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

export const SplitBillTitleInput = (props: SplitBillTitleInputProps) => {
  const { value, onChange } = props;

  return (
    <div className="mb-8">
      <div className="flex items-center gap-2 mb-4">
        {/* <h2 className="text-xl font-semibold text-gray-700">Set Title</h2> */}
      </div>
      <TextInput
        value={value}
        onChange={onChange}
        placeholder="Split bill title..."
        className="w-full"
      />
    </div>
  );
};
