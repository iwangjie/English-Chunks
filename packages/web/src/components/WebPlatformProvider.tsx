'use client';

import { useRouter } from 'next/navigation';
import { PlatformProvider, type PlatformAdapters } from '@english-chunks/shared';
import { WebStorageAdapter, WebTTSAdapter, WebNavigationAdapter } from '../adapters';

interface WebPlatformProviderProps {
  children: React.ReactNode;
}

export function WebPlatformProvider({ children }: WebPlatformProviderProps) {
  const router = useRouter();

  const adapters: PlatformAdapters = {
    storage: new WebStorageAdapter(),
    tts: new WebTTSAdapter(),
    navigation: new WebNavigationAdapter(router),
    platform: 'web',
  };

  return (
    <PlatformProvider adapters={adapters}>
      {children}
    </PlatformProvider>
  );
}
