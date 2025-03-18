package com.jobportal.Entity;

import com.jobportal.DTO.Certification;
import com.jobportal.DTO.Experience;
import com.jobportal.DTO.ProfileDTO;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.Base64;
import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Document(collection = "profiles")
public class Profile {
    @Id
    private Long id;
    private String email;
    private String name;
    private String jobTitle;
    private String company;
    private String location;
    private String about;
    private byte[] picture;  // Stored as byte[] in MongoDB
    private Long totalExp;
    private List<String> skills;
    private List<Experience> experiences;
    private List<Certification> certifications;
    private List<Long> saveJobs;

    public ProfileDTO profileToProfileDTO() {
        return new ProfileDTO(
                this.id,
                this.email,
                this.name,
                this.jobTitle,
                this.company,
                this.location,
                this.about,
                this.picture != null ? Base64.getEncoder().encodeToString(this.picture) : null,  // Encode byte[] to Base64
                this.totalExp,
                this.skills,
                this.experiences,
                this.certifications,
                this.saveJobs
        );
    }
}
