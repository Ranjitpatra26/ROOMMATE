import React from 'react';
import { QueryClientProvider } from '@tanstack/react-query';
import { queryClient } from './lib/queryClient.js';
import { ThemeProvider } from './context/ThemeContext.js';
import { AppRouter } from './routes/index.js';

export const App: React.FC = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider>
        <AppRouter />
      </ThemeProvider>
    </QueryClientProvider>
  );
};

export default App;
