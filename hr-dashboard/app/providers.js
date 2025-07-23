'use client';

import { ThemeProvider } from '@/contexts/ThemeContext';
import { BookmarkProvider } from '@/contexts/BookmarkContext';

export default function Providers({ children }) {
  return (
    <ThemeProvider>
      <BookmarkProvider>
        {children}
      </BookmarkProvider>
    </ThemeProvider>
  );
}