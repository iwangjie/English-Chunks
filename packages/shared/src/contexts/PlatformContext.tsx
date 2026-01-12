'use client';

import React, { createContext, useContext, ReactNode } from 'react';
import type { PlatformAdapters } from '../adapters';

const PlatformContext = createContext<PlatformAdapters | null>(null);

export interface PlatformProviderProps {
  children: ReactNode;
  adapters: PlatformAdapters;
}

export const PlatformProvider: React.FC<PlatformProviderProps> = ({
  children,
  adapters
}) => {
  return (
    <PlatformContext.Provider value={adapters}>
      {children}
    </PlatformContext.Provider>
  );
};

export const usePlatform = (): PlatformAdapters => {
  const context = useContext(PlatformContext);
  if (!context) {
    throw new Error('usePlatform must be used within a PlatformProvider');
  }
  return context;
};

export const useStorage = () => {
  const { storage } = usePlatform();
  return storage;
};

export const useTTS = () => {
  const { tts } = usePlatform();
  return tts;
};

export const useNavigation = () => {
  const { navigation } = usePlatform();
  return navigation;
};

export const usePlatformType = () => {
  const { platform } = usePlatform();
  return platform;
};
