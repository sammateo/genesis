import StandardLoadingIcon from "../loaders/StandardLoadingIcon";

export interface ButtonInterface {
  Icon?: React.ElementType;
  label: string;
  type?: "submit" | "reset" | "button" | undefined;
  pill?: boolean;
  loading?: boolean;
}

const PrimaryButton = ({
  Icon,
  label,
  type = "button",
  pill,
  loading,
}: ButtonInterface) => {
  return (
    <button
      disabled={loading}
      className={`flex items-center gap-2  ${
        pill ? "rounded-full" : "rounded"
      } border  ${
        loading
          ? "bg-gray-100 text-blue-900 border-blue-900"
          : "text-white bg-blue-600 hover:bg-blue-700 border-blue-600 cursor-pointer"
      } px-5 py-2 font-medium  shadow-sm transition-colors `}
      type={type}
    >
      {loading && <StandardLoadingIcon />}
      {Icon && !loading && <Icon />}
      {label}
    </button>
  );
};

export default PrimaryButton;
