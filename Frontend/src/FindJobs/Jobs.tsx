import { useEffect, useState } from "react";
import JobCard from "./JobCard";
import Sort from "./Sort";
import { getAllJobs } from "../Services/JobService";
import { useDispatch, useSelector } from "react-redux";
import { resetFilter } from "../Slices/FilterSlice";
import { resetSort } from "../Slices/SortSlice";

const Jobs = () => {
  const [jobList, setJobList] = useState([]);
  const [filteredJobs, setFilteredJobs] = useState([]);
  const filter = useSelector((state: any) => state.filter);
  const sort = useSelector((state: any) => state.sort);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(resetFilter());
    dispatch(resetSort());
    const getAllJob = async () => {
      const response = await getAllJobs();
      setJobList(response.data.filter((job: any) => job.jobStatus == "ACTIVE"));
    };
    getAllJob();
  }, []);

  useEffect(() => {
    if (sort == "Most Recent") {
      setJobList(
        [...jobList].sort(
          (a: any, b: any) =>
            new Date(b.postTime).getTime() - new Date(a.postTime).getTime()
        )
      );
    } else if (sort == "Salary (Low to High)") {
      setJobList(
        [...jobList].sort(
          (a: any, b: any) =>
            new Date(a.packageOffered).getTime() -
            new Date(b.packageOffered).getTime()
        )
      );
    } else if (sort == "Salary (High to Low)") {
      setJobList(
        [...jobList].sort(
          (a: any, b: any) =>
            new Date(b.packageOffered).getTime() -
            new Date(a.packageOffered).getTime()
        )
      );
    }
  }, [sort]);

  useEffect(() => {
    let allJobs = jobList;
    if (filter["Job Type"] && filter["Job Type"].length > 0) {
      allJobs = allJobs.filter((job: any) =>
        filter["Job Type"].some((title: any) =>
          job?.jobType?.toLowerCase().includes(title.toLowerCase())
        )
      );
    }
    if (filter["Job Title"] && filter["Job Title"].length > 0) {
      allJobs = allJobs.filter((job: any) =>
        filter["Job Title"].some((title: any) =>
          job?.jobTitle?.toLowerCase().includes(title.toLowerCase())
        )
      );
    }
    if (filter.Location && filter.Location.length > 0) {
      allJobs = allJobs.filter((job: any) =>
        filter.Location.some((location: any) =>
          job.location.toLowerCase().includes(location.toLowerCase())
        )
      );
    }
    if (filter.Experience && filter.Experience.length > 0) {
      allJobs = allJobs.filter((job: any) =>
        filter.Experience.some((exp: any) =>
          job.experience?.toLowerCase().includes(exp.toLowerCase())
        )
      );
    }
    if (filter.salary && filter.salary.length > 0) {
      allJobs = allJobs.filter(
        (job: any) =>
          filter.salary[0] <= job.packageOffered &&
          job.packageOffered <= filter.salary[1]
      );
    }

    setFilteredJobs(allJobs);
  }, [filter, jobList]);
  return (
    <div className="p-5">
      <div className="flex justify-between">
        <div className="text-3xl font-semibold">Recommanded Jobs</div>
        <Sort />
      </div>
      <div className="mt-10  flex flex-wrap gap-5 pl-4">
        {filteredJobs?.map((job: any, index: any) => (
          <JobCard key={index} {...job} />
        ))}
      </div>
    </div>
  );
};

export default Jobs;
