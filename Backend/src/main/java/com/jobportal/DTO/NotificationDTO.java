package com.jobportal.DTO;

import com.jobportal.Entity.Notification;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.ToString;

import java.time.LocalDateTime;

@Data
@AllArgsConstructor
@NoArgsConstructor
@ToString
public class NotificationDTO {
    private Long id;
    private Long userId;
    private String message;
    private String action;
    private String route;
    private LocalDateTime timestamp;
    private NotificationStatus status;

    public Notification notificationToNotificationDTO() {
        return new Notification(this.id, this.userId, this.message, this.action, this.route, this.timestamp, this.status);
    }
}
