import { Divider } from "@mantine/core";
import PostJob from "../PostJob/PostJob";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import NotAuthorized from "../NotAuthorized/NotAuthorized";

const PostJobPage = () => {
  const user = useSelector((state: any) => state.user);
  const [isUnauthorized, setIsUnauthorized] = useState(false);

  useEffect(() => {
    if (user && user.accountType === "APPLICANT") {
      setIsUnauthorized(true);
    }
  }, [user]);

  if (isUnauthorized) return <NotAuthorized />; // Show Not Authorized Page
  return (
    <div className="min-h-[100vh] bg-[#2d2d2d] font-['poppins'] overflow-auto [&::-webkit-scrollbar]:hidden px-4 pb-4">
      <Divider size="sm" mx={"md"} className="px-4" />
      <PostJob />
      <Divider size="sm" mx={"md"} className="mt-10" />
    </div>
  );
};

export default PostJobPage;
