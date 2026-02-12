import { Component, inject, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NotificationService } from '../../services/notification.service';
import { Notification } from '../../models/notification.model';

@Component({
  selector: 'app-toast',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="fixed top-4 right-4 z-50 space-y-2">
      @for (notification of notifications(); track notification.id) {
        <div
          [class]="getToastClasses(notification)"
          class="animate-slide-in-down shadow-lg rounded-lg overflow-hidden max-w-sm"
          role="alert"
        >
          <!-- Progress bar -->
          @if (notification.duration && notification.duration > 0) {
            <div class="h-1 bg-black bg-opacity-10">
              <div
                class="h-full bg-white bg-opacity-40 animate-progress"
                [style.animation-duration.ms]="notification.duration"
              ></div>
            </div>
          }

          <div class="p-4 flex items-start gap-3">
            <!-- Icon -->
            <div class="flex-shrink-0">
              <svg
                class="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                @switch (notification.type) {
                  @case ('success') {
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  }
                  @case ('error') {
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  }
                  @case ('warning') {
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                    />
                  }
                  @case ('info') {
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  }
                }
              </svg>
            </div>

            <!-- Content -->
            <div class="flex-1 min-w-0">
              <p class="text-sm font-semibold">{{ notification.title }}</p>
              <p class="mt-1 text-sm opacity-90">{{ notification.message }}</p>
            </div>

            <!-- Close button -->
            <button
              (click)="notificationService.remove(notification.id)"
              class="flex-shrink-0 text-white hover:opacity-80 transition-opacity"
              aria-label="Close notification"
            >
              <svg class="h-5 w-5" fill="currentColor" viewBox="0 0 20 20">
                <path
                  fill-rule="evenodd"
                  d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                  clip-rule="evenodd"
                />
              </svg>
            </button>
          </div>
        </div>
      }
    </div>
  `,
  styles: [
    `
      @keyframes slideInDown {
        from {
          opacity: 0;
          transform: translateY(-100%);
        }
        to {
          opacity: 1;
          transform: translateY(0);
        }
      }

      @keyframes progress {
        from {
          width: 100%;
        }
        to {
          width: 0%;
        }
      }

      .animate-slide-in-down {
        animation: slideInDown 0.3s ease-out;
      }

      .animate-progress {
        animation: progress linear;
      }
    `,
  ],
})
export class ToastComponent {
  notificationService = inject(NotificationService);
  notifications = computed(() => this.notificationService.notifications());

  getToastClasses(notification: Notification): string {
    const baseClasses = 'text-white';
    const typeClasses = {
      success: 'bg-gradient-to-r from-emerald-500 to-emerald-600',
      error: 'bg-gradient-to-r from-red-500 to-red-600',
      warning: 'bg-gradient-to-r from-amber-500 to-amber-600',
      info: 'bg-gradient-to-r from-blue-500 to-blue-600',
    };
    return `${baseClasses} ${typeClasses[notification.type]}`;
  }
}
