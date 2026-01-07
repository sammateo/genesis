import Link from "next/link";
export interface LinkInterface {
  Icon?: React.ElementType;
  label: string;
  href: string;
}

const PrimaryLink = ({ Icon, label, href }: LinkInterface) => {
  return (
    <Link
      href={href}
      className="flex items-center justify-center gap-2 cursor-pointer rounded border border-blue-600 bg-blue-600 px-5 py-2 font-medium text-white shadow-sm transition-colors hover:bg-blue-700"
    >
      {Icon && <Icon />}
      {label}
    </Link>
  );
};

export default PrimaryLink;
