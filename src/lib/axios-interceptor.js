'use client';

import axios from 'axios';
import { toast } from 'sonner';

let isRedirecting = false;
let interceptorSetup = false;

// Create axios interceptor for handling 401 and 403 errors
export const setupAxiosInterceptors = () => {
  // Prevent setting up interceptor multiple times
  if (interceptorSetup) {
    return;
  }

  interceptorSetup = true;

  axios.interceptors.response.use(
    (response) => response,
    (error) => {
      // Check if it's a 401 (Unauthorized) or 403 (Forbidden) error
      const status = error.response?.status;

      if ((status === 401 || status === 403) && !isRedirecting) {
        isRedirecting = true;

        // Mark error as handled to prevent further processing
        error._handled = true;

        // Clear the invalid token
        if (typeof window !== 'undefined') {
          localStorage.removeItem('token');
        }

        // Show toast notification
        const message = status === 401 ? 'Session expired' : 'Access denied';
        const description = status === 401
          ? 'Your session has expired. Please login again.'
          : 'You need to login to access this resource.';

        toast.error(message, {
          description,
          style: {
            '--normal-bg': 'color-mix(in oklab, var(--destructive) 10%, var(--background))',
            '--normal-text': 'var(--destructive)',
            '--normal-border': 'var(--destructive)'
          },
          duration: 3000,
        });

        // Redirect to login after a short delay
        setTimeout(() => {
          if (typeof window !== 'undefined') {
            window.location.href = '/login';
          }
        }, 1500);
      }

      return Promise.reject(error);
    }
  );

  // Add global error handler for unhandled promise rejections
  if (typeof window !== 'undefined') {
    window.addEventListener('unhandledrejection', (event) => {
      // Prevent default error handling for handled errors
      if (event.reason?._handled) {
        event.preventDefault();
        console.log('Handled error caught by global handler:', event.reason);
      }
    });
  }
};
