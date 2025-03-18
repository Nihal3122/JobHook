package com.jobportal.Api;

import com.jobportal.DTO.ApplicantDTO;
import com.jobportal.DTO.Application;
import com.jobportal.DTO.JobDTO;
import com.jobportal.DTO.ResponseDTO;
import com.jobportal.Exeption.JobPortalException;
import com.jobportal.Service.JobService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin(origins = "http://localhost:5173", allowCredentials = "true")
@RequestMapping("/job")
@Validated
public class JobAPI {
    @Autowired
    private JobService jobService;

    @PostMapping("/post")
    public ResponseEntity<JobDTO> postJob(@RequestBody JobDTO jobDTO) throws JobPortalException {
        return new ResponseEntity<>(jobService.postJob(jobDTO), HttpStatus.CREATED);
    }

    @GetMapping("/getAll")
    public ResponseEntity<List<JobDTO>> getAllJobs() throws JobPortalException {
        return new ResponseEntity<>(jobService.getAllJobs(), HttpStatus.OK);
    }

    @GetMapping("/get/{id}")
    public ResponseEntity<JobDTO> getSingleJob(@PathVariable Long id) throws JobPortalException {
        return new ResponseEntity<>(jobService.getSingleJob(id), HttpStatus.OK);
    }

    @PostMapping("/apply/{jobId}")
    public ResponseEntity<ResponseDTO> applyJob(@PathVariable Long jobId, @RequestBody ApplicantDTO applicantDTO) throws JobPortalException {
        jobService.applyJob(jobId, applicantDTO);
        return new ResponseEntity<>(new ResponseDTO("Job Applied Successfully"), HttpStatus.OK);
    }

    @GetMapping("/postedBy/{id}")
    public ResponseEntity<List<JobDTO>> getJobsPostedBy(@PathVariable Long id) throws JobPortalException {
        return new ResponseEntity<>(jobService.getJobsPostedBy(id), HttpStatus.OK);
    }

    @PostMapping("/changeAppStatus")
    public ResponseEntity<ResponseDTO> changeAppStatus(@RequestBody Application application) throws JobPortalException {
        jobService.changeAppStatus(application);
        return new ResponseEntity<>(new ResponseDTO("Application Status Changes Successfully"), HttpStatus.OK);
    }


}
