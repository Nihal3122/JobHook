package com.jobportal.Entity;

import com.jobportal.DTO.AccountType;
import com.jobportal.DTO.UserDTO;

import lombok.*;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Document(collection = "users")
public class User {

    @Id
    private Long id;

    private String name;

    private String email;

    private String password;

    private AccountType accountType;

    private Long profileId;

    public UserDTO userToUserDTO() {
        return new UserDTO(this.id, this.name, this.email, this.password, this.accountType, this.profileId);
    }
}
