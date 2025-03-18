import { Divider } from "@mantine/core";
import SearchBar from "../FindTalent/SearchBar";
import Talent from "../FindTalent/Talent";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import NotAuthorized from "../NotAuthorized/NotAuthorized";

const FindTalentPage = () => {
  const user = useSelector((state: any) => state.user);
  const [isUnauthorized, setIsUnauthorized] = useState(false);

  useEffect(() => {
    if (user && user.accountType === "APPLICANT") {
      setIsUnauthorized(true);
    }
  }, [user]);

  if (isUnauthorized) return <NotAuthorized />; // Show Not Authorized Page

  return (
    <div className="min-h-[100vh] bg-[#2d2d2d] font-['poppins'] overflow-auto [&::-webkit-scrollbar]:hidden">
      <Divider size="sm" mx={"md"} className="px-4" />
      <SearchBar />
      <Divider size="sm" mx={"md"} />
      <Talent />
    </div>
  );
};

export default FindTalentPage;
