import { Injectable, signal } from '@angular/core';
import { Notification, NotificationType } from '../models/notification.model';

@Injectable({
  providedIn: 'root',
})
export class NotificationService {
  notifications = signal<Notification[]>([]);
  private readonly MAX_NOTIFICATIONS = 3;
  private readonly DEFAULT_DURATION = 5000;

  private show(
    type: NotificationType,
    title: string,
    message: string,
    duration?: number
  ) {
    const notification: Notification = {
      id: this.generateId(),
      type,
      title,
      message,
      duration: duration ?? this.DEFAULT_DURATION,
      timestamp: new Date(),
    };

    // Add notification to the list
    const current = this.notifications();

    // Keep only MAX_NOTIFICATIONS
    if (current.length >= this.MAX_NOTIFICATIONS) {
      current.shift(); // Remove oldest
    }

    this.notifications.set([...current, notification]);

    // Auto-remove after duration
    if (notification.duration && notification.duration > 0) {
      setTimeout(() => {
        this.remove(notification.id);
      }, notification.duration);
    }
  }

  success(title: string, message: string, duration?: number) {
    this.show('success', title, message, duration);
  }

  error(title: string, message: string, duration?: number) {
    this.show('error', title, message, duration);
  }

  warning(title: string, message: string, duration?: number) {
    this.show('warning', title, message, duration);
  }

  info(title: string, message: string, duration?: number) {
    this.show('info', title, message, duration);
  }

  remove(id: string) {
    const current = this.notifications();
    this.notifications.set(current.filter((n) => n.id !== id));
  }

  clear() {
    this.notifications.set([]);
  }

  private generateId(): string {
    return `notification-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
  }
}
