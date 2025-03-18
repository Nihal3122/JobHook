import JobCard from "../FindJobs/JobCard";

const JobComp = (props: any) => {
  return (
    <div className="mt-10  flex flex-wrap gap-5 pl-4 pb-10">
      {props.jobList.map((job: any, index: any) => (
        <JobCard key={index} {...job} />
      ))}
    </div>
  );
};

export default JobComp;
