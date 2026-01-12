import type { StorageAdapter } from '@english-chunks/shared';
import { invoke } from '@tauri-apps/api/core';

export class TauriStorageAdapter implements StorageAdapter {
  async getItem(key: string): Promise<string | null> {
    try {
      const result = await invoke<string | null>('get_item', { key });
      return result;
    } catch (error) {
      console.error('Error getting item from storage:', error);
      return null;
    }
  }

  async setItem(key: string, value: string): Promise<void> {
    try {
      await invoke('set_item', { key, value });
    } catch (error) {
      console.error('Error setting item in storage:', error);
    }
  }

  async removeItem(key: string): Promise<void> {
    try {
      await invoke('remove_item', { key });
    } catch (error) {
      console.error('Error removing item from storage:', error);
    }
  }

  async clear(): Promise<void> {
    try {
      await invoke('clear_storage');
    } catch (error) {
      console.error('Error clearing storage:', error);
    }
  }
}
