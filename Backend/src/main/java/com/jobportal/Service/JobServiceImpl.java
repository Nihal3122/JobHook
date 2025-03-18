package com.jobportal.Service;

import com.jobportal.DTO.*;
import com.jobportal.Entity.Applicant;
import com.jobportal.Entity.Job;
import com.jobportal.Exeption.JobPortalException;
import com.jobportal.Repository.JobRepository;
import com.jobportal.Utility.Utilities;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.Objects;

@Service("jobService")
public class JobServiceImpl implements JobService {
    @Autowired
    private JobRepository jobRepository;

    @Autowired
    private NotificationService notificationService;


    @Override
    public JobDTO postJob(JobDTO jobDTO) throws JobPortalException {
        if (jobDTO.getId() == 0) {
            jobDTO.setId(Utilities.getNextSequence("jobs"));
            jobDTO.setPostTime(LocalDateTime.now());
            NotificationDTO notiDTO = new NotificationDTO();
            notiDTO.setAction("Job Posted Successfully");
            notiDTO.setMessage("Job Posted Successfully For : " + jobDTO.getJobTitle() + " At " + jobDTO.getCompany());
            notiDTO.setUserId(jobDTO.getPostedBy());
            notiDTO.setRoute("/posted-job/" + jobDTO.getId());
            notificationService.sendNotification(notiDTO);
        } else {
            Job job = jobRepository.findById(jobDTO.getId()).orElseThrow(() -> new JobPortalException("JOB_NOT_FOUND"));
            if (job.getJobStatus().equals(JobStatus.DRAFT) || jobDTO.getJobStatus().equals(JobStatus.CLOSE)) {
                jobDTO.setPostTime(LocalDateTime.now());
            }
        }
        return jobRepository.save(jobDTO.jobDTOToJob()).jobToJobDTO();
    }

    @Override
    public List<JobDTO> getAllJobs() throws JobPortalException {
        return jobRepository.findAll().stream().map(Job::jobToJobDTO).toList();
    }

    @Override
    public JobDTO getSingleJob(Long id) throws JobPortalException {
        return jobRepository.findById(id).orElseThrow(() -> new JobPortalException("JOB_NOT_FOUND")).jobToJobDTO();
    }

    @Override
    public void applyJob(Long jobId, ApplicantDTO applicantDTO) throws JobPortalException {

        Job job = jobRepository.findById(jobId)
                .orElseThrow(() -> new JobPortalException("JOB_NOT_FOUND"));

        List<Applicant> applicants = job.getApplicants();
        if (applicants == null) {
            applicants = new ArrayList<>();
        }

        boolean isAlreadyApplied = applicants.stream()
                .anyMatch(applicant -> applicant.getApplicantId().equals(applicantDTO.getApplicantId()));

        if (isAlreadyApplied) {
            throw new JobPortalException("JOB_APPLIED_ALREADY");
        }

        applicantDTO.setApplicationStatus(ApplicationStatus.APPLIED);
        applicants.add(applicantDTO.applicantDTOToApplicant());
        job.setApplicants(applicants);
        jobRepository.save(job);
    }

    @Override
    public List<JobDTO> getJobsPostedBy(Long id) {
        return jobRepository.findByPostedBy(id).stream().map(Job::jobToJobDTO).toList();
    }

    @Override
    public void changeAppStatus(Application application) throws JobPortalException {
        Job job = jobRepository.findById(application.getId())
                .orElseThrow(() -> new JobPortalException("JOB_NOT_FOUND"));

        List<Applicant> applicants = job.getApplicants().stream().map((applicant -> {
            if (Objects.equals(application.getApplicantId(), applicant.getApplicantId())) {
                applicant.setApplicationStatus(application.getApplicationStatus());
                if (applicant.getApplicationStatus().equals(ApplicationStatus.INTERVIEWING)) {
                    applicant.setInterviewTime(application.getInterviewTime());
                    NotificationDTO notiDTO = new NotificationDTO();
                    notiDTO.setAction("Interview Scheduled");
                    notiDTO.setMessage("Interview scheduled for job id : " + application.getId());
                    notiDTO.setUserId(application.getApplicantId());
                    notiDTO.setRoute("/job-dashboard");
                    try {
                        notificationService.sendNotification(notiDTO);
                    } catch (JobPortalException e) {
                        throw new RuntimeException(e);
                    }
                }

            }
            return applicant;
        })).toList();
        job.setApplicants(applicants);
        jobRepository.save(job);
    }

}
