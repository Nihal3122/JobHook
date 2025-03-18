import { Divider } from "@mantine/core";
import PostedJob from "../PostedJob/PostedJob";
import PostedJobDesc from "../PostedJob/PostedJobDesc";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { getJobPostedBy } from "../Services/JobService";
import NotAuthorized from "../NotAuthorized/NotAuthorized";

const PostedJobPage = () => {
  const { id } = useParams();
  const user = useSelector((state: any) => state.user);
  const [jobList, setJobList] = useState<any>([]);
  const [job, setJob] = useState<any>([]);
  const [isUnauthorized, setIsUnauthorized] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    window.scrollTo(0, 0);
    getJobPostedBy(user.id)
      .then((res) => {
        if (res && res.data.length > 0 && Number(id) == 0) {
          navigate(`/posted-job/${res.data[0].id}`);
        }
        setJobList(res.data);
        setJob(res.data.find((job: any) => job.id == id));
      })
      .catch((error: any) => {
        console.log(error);
      });
  }, [id]);

  useEffect(() => {
    if (user && user.accountType === "APPLICANT") {
      setIsUnauthorized(true);
    }
  }, [user]);

  if (isUnauthorized) return <NotAuthorized />; // Show Not Authorized Page

  return (
    <div className="min-h-[100vh] bg-[#2d2d2d] font-['poppins'] overflow-auto [&::-webkit-scrollbar]:hidden px-4 pb-4">
      <Divider size="sm" mx={"md"} className="px-4" />
      <div className="flex gap-5 ">
        <PostedJob job={job} jobList={jobList} />
        <PostedJobDesc {...job} />
      </div>
    </div>
  );
};

export default PostedJobPage;
