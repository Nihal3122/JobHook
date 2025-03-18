package com.jobportal.Service;

import com.jobportal.DTO.ProfileDTO;
import com.jobportal.Exeption.JobPortalException;

import java.util.List;

public interface ProfileService {
    Long createProfile(String email) throws JobPortalException;

    ProfileDTO getProfile(Long id) throws JobPortalException;

    ProfileDTO updateProfile(ProfileDTO profileDTO) throws JobPortalException;

    List<ProfileDTO> getAllProfiles() throws JobPortalException;
}
