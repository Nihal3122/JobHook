package com.jobportal.DTO;

import com.jobportal.Entity.Profile;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Base64;
import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class ProfileDTO {
    private Long id;
    private String email;
    private String name;
    private String jobTitle;
    private String company;
    private String location;
    private String about;
    private String picture;  // Base64 encoded string
    private Long totalExp;
    private List<String> skills;
    private List<Experience> experiences;
    private List<Certification> certifications;
    private List<Long> saveJobs;

    public Profile profileDTOToProfile() {
        return new Profile(
                this.id,
                this.email,
                this.name,
                this.jobTitle,
                this.company,
                this.location,
                this.about,
                this.picture != null ? Base64.getDecoder().decode(this.picture) : null,  // Decode Base64 string to byte[]
                this.totalExp,
                this.skills,
                this.experiences,
                this.certifications,
                this.saveJobs
        );
    }
}
