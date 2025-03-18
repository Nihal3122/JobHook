package com.jobportal.Service;

import com.jobportal.DTO.ProfileDTO;
import com.jobportal.Entity.Profile;
import com.jobportal.Exeption.JobPortalException;
import com.jobportal.Repository.ProfileRepository;
import com.jobportal.Utility.Utilities;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service("profileService")
public class ProfileServiceImpl implements ProfileService {

    @Autowired
    private ProfileRepository profileRepository;


    @Override
    public Long createProfile(String email) throws JobPortalException {
        Profile profile = new Profile();
        profile.setId(Utilities.getNextSequence("profiles"));
        profile.setEmail(email);
        profile.setSkills(new ArrayList<>());
        profile.setExperiences(new ArrayList<>());
        profile.setCertifications(new ArrayList<>());
        profileRepository.save(profile);
        return profile.getId();
    }

    public ProfileDTO getProfile(Long id) throws JobPortalException {
        Profile profile = profileRepository.findById(id)
                .orElseThrow(() -> new JobPortalException("PROFILE_NOT_FOUND"));
        return profile.profileToProfileDTO();
    }


    @Override
    public ProfileDTO updateProfile(ProfileDTO profileDTO) throws JobPortalException {
        profileRepository.findById(profileDTO.getId()).orElseThrow(() -> new JobPortalException("PROFILE_NOT_FOUND"));
        profileRepository.save(profileDTO.profileDTOToProfile());
        return profileDTO;
    }

    @Override
    public List<ProfileDTO> getAllProfiles() throws JobPortalException {
        return profileRepository.findAll().stream().map(Profile::profileToProfileDTO).toList();
    }

}
