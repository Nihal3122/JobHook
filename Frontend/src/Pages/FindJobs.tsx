import { Divider } from "@mantine/core";
import SearchBar from "../FindJobs/SearchBar";
import Jobs from "../FindJobs/Jobs";
import { useSelector } from "react-redux";
import NotAuthorized from "../NotAuthorized/NotAuthorized";

const FindJobs = () => {
  const user = useSelector((state: any) => state.user);

  if (user?.accountType === "EMPLOYER") {
    return <NotAuthorized />;
  }

  return (
    <div className="min-h-[100vh] bg-[#2d2d2d] font-['poppins'] overflow-auto [&::-webkit-scrollbar]:hidden">
      <Divider size="sm" mx={"md"} className="px-4" />
      <SearchBar />
      <Divider size="sm" mx={"md"} />
      <Jobs />
    </div>
  );
};

export default FindJobs;
