type ButtonProps = {
  onClick: () => void;
  children: React.ReactNode;
  className?: string;
  type?: "button" | "submit" | "reset";
}

const initialClassName = `px-4 py-2 text-white rounded-lg bg-blue-500 hover:bg-blue-600`

export const Button = (props: ButtonProps) => {
  const { onClick, children, className = "", type = "button" } = props;
  return (
    <button
      type={type}
      onClick={onClick}
      className={`${initialClassName} ${className}`}
    >
      {children}
    </button>
  );
}