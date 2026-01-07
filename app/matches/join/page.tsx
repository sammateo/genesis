import Header from "@/app/components/header/header";
import PrimaryButton from "@/app/ui/button/primary-button";
import { HiSearch } from "react-icons/hi";

const page = () => {
  return (
    <div>
      {" "}
      <Header />
      <div className="mx-auto flex flex-col w-screen max-w-7xl px-4 py-16 sm:px-6 sm:py-24 gap-5 lg:px-8 lg:py-32">
        <h1 className="mx-auto font-bold text-3xl capitalize">
          Enter match code
        </h1>
        <input
          className="border-2 border-blue-900 outline-none px-5 py-3 rounded-full mx-auto w-full max-w-2xl transition-shadow duration-300 ease-in-out focus:shadow-xl shadow-blue-200"
          type="text"
          placeholder="match code"
        />
        <div className="flex justify-center">
          <PrimaryButton label={"Search"} Icon={HiSearch} pill={true} />
        </div>
      </div>
    </div>
  );
};

export default page;
