package com.jobportal.Api;

import com.jobportal.DTO.ResponseDTO;
import com.jobportal.Entity.Notification;
import com.jobportal.Exeption.JobPortalException;
import com.jobportal.Service.NotificationService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin(origins = "http://localhost:5173", allowCredentials = "true")
@RequestMapping("/notification")
@Validated
public class NotificationAPI {
    @Autowired
    private NotificationService notificationService;

    @GetMapping("/get/{userId}")
    public ResponseEntity<List<Notification>> getNotifications(@PathVariable Long userId) {
        return new ResponseEntity<>(notificationService.getUnreadNotification(userId), HttpStatus.OK);
    }

    @PutMapping("/read/{id}")
    public ResponseEntity<ResponseDTO> readNotifications(@PathVariable Long id) throws JobPortalException {
        notificationService.readNotification(id);
        return new ResponseEntity<>(new ResponseDTO("Success"), HttpStatus.OK);
    }
}
