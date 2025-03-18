package com.jobportal.Service;


import com.jobportal.DTO.NotificationDTO;
import com.jobportal.Entity.Notification;
import com.jobportal.Exeption.JobPortalException;

import java.util.List;

public interface NotificationService {
    void sendNotification(NotificationDTO notificationDTO) throws JobPortalException;

    List<Notification> getUnreadNotification(Long userId);

    void readNotification(Long id) throws JobPortalException;
}
