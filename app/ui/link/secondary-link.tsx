import Link from "next/link";
export interface LinkInterface {
  Icon?: React.ElementType;
  label: string;
  href: string;
}

const SecondaryLink = ({ Icon, label, href }: LinkInterface) => {
  return (
    <Link
      href={href}
      className="flex items-center justify-center gap-2 cursor-pointer rounded-md bg-gray-100 px-5 py-1 font-medium text-blue-600 shadow-sm transition-colors hover:bg-gray-50 hover:text-blue-700"
    >
      {Icon && <Icon />}
      {label}
    </Link>
  );
};

export default SecondaryLink;
