'use client';

import { useEffect } from 'react';
import { setupAxiosInterceptors } from '@/lib/axios-interceptor';

export default function AxiosInterceptorSetup() {
  useEffect(() => {
    setupAxiosInterceptors();
  }, []);

  return null;
}
