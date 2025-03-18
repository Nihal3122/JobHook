import { Divider } from "@mantine/core";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import NotAuthorized from "../NotAuthorized/NotAuthorized";
import JobDashboard from "../JobHistory/JobDashboard ";

const JobiHstoryPage = () => {
  const user = useSelector((state: any) => state.user);
  const navigate = useNavigate();
  const [isUnauthorized, setIsUnauthorized] = useState(false);

  useEffect(() => {
    if (user && user.accountType === "EMPLOYER") {
      setIsUnauthorized(true);
    }
  }, [user, navigate]);

  if (isUnauthorized) return <NotAuthorized />;

  return (
    <div className="min-h-[100vh] bg-[#2d2d2d] font-['poppins'] overflow-auto [&::-webkit-scrollbar]:hidden px-4 pb-4">
      <Divider size="sm" mx={"md"} className="px-4" />
      <div className="my-5"></div>
      <JobDashboard />
    </div>
  );
};

export default JobiHstoryPage;
