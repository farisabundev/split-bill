type TextInputProps = {
  type?: "text" | "number";
  value: string | number;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
  className?: string;
  step?: string;
  min?: number;
  max?: number;
  onEnterPress?: () => void;
};

const initialClassName =
  "text-black px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500";

export const TextInput = (props: TextInputProps) => {
  const {
    type = "text",
    value,
    onChange,
    placeholder,
    className = "",
    step,
    min,
    max,
    onEnterPress,
  } = props;
  return (
    <input
      type={type}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      step={step}
      min={min}
      max={max}
      className={`${initialClassName} ${className}`}
      onKeyDown={(e) => {
        if (e.key === "Enter" && onEnterPress) {
          e.preventDefault();
          onEnterPress();
        }
      }}
    />
  );
};
