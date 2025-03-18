package com.jobportal.Service;

import com.jobportal.DTO.ApplicantDTO;
import com.jobportal.DTO.Application;
import com.jobportal.DTO.JobDTO;
import com.jobportal.Exeption.JobPortalException;

import java.util.List;

public interface JobService {

    JobDTO postJob(JobDTO jobDTO) throws JobPortalException;

    List<JobDTO> getAllJobs() throws JobPortalException;

    JobDTO getSingleJob(Long id) throws JobPortalException;

    void applyJob(Long jobId, ApplicantDTO applicantDTO) throws JobPortalException;

    List<JobDTO> getJobsPostedBy(Long id);

    void changeAppStatus(Application application) throws JobPortalException;
}
