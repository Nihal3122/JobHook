package com.jobportal.Api;

import com.jobportal.DTO.ProfileDTO;
import com.jobportal.Exeption.JobPortalException;
import com.jobportal.Service.ProfileService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin(origins = "http://localhost:5173", allowCredentials = "true")
@RequestMapping("/profile")
@Validated
public class ProfileAPI {
    @Autowired
    private ProfileService profileService;

    @GetMapping("/get/{id}")
    public ResponseEntity<?> getProfile(@PathVariable Long id) {
        try {
            ProfileDTO profile = profileService.getProfile(id);
            return new ResponseEntity<>(profile, HttpStatus.OK);
        } catch (JobPortalException e) {
            return new ResponseEntity<>("PROFILE_NOT_FOUND", HttpStatus.NOT_FOUND);
        } catch (Exception e) {
            return new ResponseEntity<>("Internal Server Error", HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }


    @PutMapping("/update")
    public ResponseEntity<ProfileDTO> updateProfile(@RequestBody ProfileDTO profileDTO) throws JobPortalException {
        return new ResponseEntity<>(profileService.updateProfile(profileDTO), HttpStatus.OK);
    }

    @GetMapping("/getAll")
    public ResponseEntity<List<ProfileDTO>> getAllProfiles() throws JobPortalException {
        return new ResponseEntity<>(profileService.getAllProfiles(), HttpStatus.OK);
    }
}
