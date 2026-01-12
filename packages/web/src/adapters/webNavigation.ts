import type { NavigationAdapter } from '@english-chunks/shared';
import { useRouter } from 'next/navigation';

export class WebNavigationAdapter implements NavigationAdapter {
  private router: ReturnType<typeof useRouter>;

  constructor(router: ReturnType<typeof useRouter>) {
    this.router = router;
  }

  navigate(path: string): void {
    this.router.push(path);
  }

  getCurrentPath(): string {
    if (typeof window === 'undefined') return '/';
    return window.location.pathname;
  }
}
