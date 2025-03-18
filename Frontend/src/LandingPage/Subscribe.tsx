import { TextInput } from "@mantine/core";

const Subscribe = () => {
  return (
    <div className="mt-20 pb-10 flex bg-[#3d3d3d] mx-20 py-12 rounded-xl justify-around items-center">
      <div className="text-4xl w-2/5 text-[#e7e7e7] font-semibold text-center">
        Never want to miss any{" "}
        <span className="text-[#ffbd20]">Job News ?</span>
      </div>
      <div className="flex gap-4 bg-[#454545] px-3 py-2 rounded-xl items-center">
        <TextInput
          className=" [&_input]:!text-[#e7e7e7] font-semibold py-2"
          variant="unstyled"
          placeholder="Your@email.com"
        />
        <button className="bg-[#ffbd20] hover:bg-[#f99b07] text-white font-medium px-6 py-2 rounded-md shadow-md transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-[#ffbd20] cursor-pointer">
          Subscribe
        </button>
      </div>
    </div>
  );
};

export default Subscribe;
