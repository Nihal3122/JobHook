package com.jobportal.Service;

import com.jobportal.DTO.NotificationDTO;
import com.jobportal.DTO.NotificationStatus;
import com.jobportal.Entity.Notification;
import com.jobportal.Exeption.JobPortalException;
import com.jobportal.Repository.NotificationRepository;
import com.jobportal.Utility.Utilities;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;

@Service("notificationService")
public class NotificationServiceImpl implements NotificationService {
    @Autowired
    private NotificationRepository notificationRepository;

    @Override
    public void sendNotification(NotificationDTO notificationDTO) throws JobPortalException {
        notificationDTO.setId(Utilities.getNextSequence("notification"));
        System.out.println("Noti2" + notificationDTO);
        notificationDTO.setTimestamp(LocalDateTime.now());
        notificationDTO.setStatus(NotificationStatus.UNREAD);
        notificationRepository.save(notificationDTO.notificationToNotificationDTO());
    }

    @Override
    public List<Notification> getUnreadNotification(Long userId) {
        return notificationRepository.findByUserIdAndStatus(userId, NotificationStatus.UNREAD);
    }

    @Override
    public void readNotification(Long id) throws JobPortalException {
        Notification notification = notificationRepository.findById(id).orElseThrow(() -> new JobPortalException("Notification Not Found"));
        notification.setStatus(NotificationStatus.READ);
        notificationRepository.save(notification);
    }
}
