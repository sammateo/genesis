import StandardLoadingIcon from "../loaders/StandardLoadingIcon";
import { ButtonInterface } from "./primary-button";

const SecondaryButton = ({
  label,
  type = "button",
  Icon,
  pill,
  loading,
  onClick,
  ref,
}: ButtonInterface) => {
  return (
    <button
      ref={ref}
      onClick={onClick}
      disabled={loading}
      className={`flex items-center gap-2  
        ${pill ? "rounded-full" : "rounded-md"}
        border
        ${
          loading
            ? "bg-gray-100 text-blue-900 border-blue-900"
            : "bg-gray-100 text-blue-600 border-blue-600 cursor-pointer"
        }
          px-5 py-1 font-medium `}
      type={type}
    >
      {loading && <StandardLoadingIcon />}

      {Icon && !loading && <Icon />}
      {label}
    </button>
  );
};

export default SecondaryButton;
