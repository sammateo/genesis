import { ButtonInterface } from "./primary-button";

const SecondaryButton = ({ label, type = "button", Icon }: ButtonInterface) => {
  return (
    <button
      className="flex items-center gap-2 cursor-pointer rounded-md bg-gray-100 px-5 py-2 font-medium text-blue-600"
      type={type}
    >
      {Icon && <Icon />}
      {label}
    </button>
  );
};

export default SecondaryButton;
