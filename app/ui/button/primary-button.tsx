export interface ButtonInterface {
  Icon?: React.ElementType;
  label: string;
  type?: "submit" | "reset" | "button" | undefined;
}

const PrimaryButton = ({ Icon, label, type = "button" }: ButtonInterface) => {
  return (
    <button
      className="flex items-center gap-2 cursor-pointer rounded border border-blue-600 bg-blue-600 px-5 py-2 font-medium text-white shadow-sm transition-colors hover:bg-blue-700"
      type={type}
    >
      {Icon && <Icon />}
      {label}
    </button>
  );
};

export default PrimaryButton;
