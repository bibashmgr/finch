import React from 'react';

import { ThemeToggle } from '@/components/shared/theme-toggle';

export default function RootPage() {
  return (
    <div className="w-full h-screen flex justify-center items-center">
      <ThemeToggle />
    </div>
  );
}
