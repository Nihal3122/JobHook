import { Button, Divider } from "@mantine/core";
import { IconArrowLeft } from "@tabler/icons-react";
import { useNavigate, useParams } from "react-router-dom";
import ApplyJobComp from "../ApplyJob/ApplyJobComp";
import { useEffect, useState } from "react";
import { getSingleJobs } from "../Services/JobService";

const ApplyJob = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [job, setJob] = useState<any>(null);
  useEffect(() => {
    window.scrollTo(0, 0);
    const getSingleJob = async () => {
      try {
        const response = await getSingleJobs(id);
        setJob(response.data);
      } catch (error) {
        console.log(error);
      }
    };
    getSingleJob();
  }, [id]);
  return (
    <div className="min-h-[100vh] bg-[#2d2d2d] font-['poppins'] overflow-auto [&::-webkit-scrollbar]:hidden px-4 pb-4">
      <Divider size="sm" mx={"md"} className="px-4" />
      <Button
        onClick={() => navigate(-1)}
        leftSection={<IconArrowLeft size={20} />}
        color="brightSun.4"
        variant="light"
        className="my-5"
      >
        Back
      </Button>
      <ApplyJobComp {...job} />

      <Divider size="sm" mx={"md"} />
    </div>
  );
};

export default ApplyJob;
