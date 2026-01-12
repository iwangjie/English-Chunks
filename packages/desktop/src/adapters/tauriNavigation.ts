import type { NavigationAdapter } from '@english-chunks/shared';

export class TauriNavigationAdapter implements NavigationAdapter {
  private navigateFn: (path: string) => void;

  constructor(navigateFn: (path: string) => void) {
    this.navigateFn = navigateFn;
  }

  navigate(path: string): void {
    this.navigateFn(path);
  }

  getCurrentPath(): string {
    if (typeof window === 'undefined') return '/';
    return window.location.pathname;
  }
}
