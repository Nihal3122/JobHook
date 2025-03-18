import { useParams } from "react-router-dom";
import JobCard from "../FindJobs/JobCard";
import { useEffect, useState } from "react";
import { getAllJobs } from "../Services/JobService";

const RecommandedJobs = () => {
  const { id } = useParams();
  const [jobList, setJobList] = useState([{}]);
  useEffect(() => {
    const getAllJob = async () => {
      const response = await getAllJobs();
      setJobList(response.data);
    };
    getAllJob();
  }, []);
  return (
    <div>
      <div className="text-xl font-semibold mb-5">Recommanded Jobs</div>
      <div className="flex flex-col flex-wrap gap-5">
        {jobList.map(
          (job: any, index: any) =>
            index < 6 && job.id != id && <JobCard {...job} />
        )}
      </div>
    </div>
  );
};

export default RecommandedJobs;
