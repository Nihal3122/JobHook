import { Button, Divider } from "@mantine/core";
import { IconArrowLeft } from "@tabler/icons-react";
import { Link, useParams } from "react-router-dom";
import JobDetails from "../JobDetails/JobDetails";
import RecommandedJobs from "../JobDetails/RecommandedJobs";
import { useEffect, useState } from "react";
import { getSingleJobs } from "../Services/JobService";

const JobDetailPage = () => {
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
    <div className="min-h-[100vh] bg-[#2d2d2d] font-['poppins'] overflow-auto [&::-webkit-scrollbar]:hidden px-4">
      <Divider size="sm" mx={"xs"} className="px-4" />
      <Link to="/find-jobs" className="my-5 inline-block">
        <Button
          leftSection={<IconArrowLeft size={20} />}
          color="brightSun.4"
          variant="light"
        >
          Back
        </Button>
      </Link>
      <div className="flex gap-5 justify-around">
        <JobDetails {...job} />
        <RecommandedJobs />
      </div>
    </div>
  );
};

export default JobDetailPage;
