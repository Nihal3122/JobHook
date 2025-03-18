package com.jobportal.Service;

import com.jobportal.DTO.LoginDTO;
import com.jobportal.DTO.UserDTO;
import com.jobportal.Exeption.JobPortalException;
import jakarta.validation.Valid;

public interface UserService {
    UserDTO registerUser(UserDTO userDTO) throws JobPortalException;

    UserDTO loginUser(@Valid LoginDTO loginDTO) throws JobPortalException;

    void sendOpt(String email) throws Exception;

    void verifyOtp(String email, String otp) throws JobPortalException;

    void changePassword(@Valid LoginDTO loginDTO) throws JobPortalException;

    UserDTO getUserByEmail(String email) throws JobPortalException;
}
