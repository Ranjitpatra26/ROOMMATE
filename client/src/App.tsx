import React from 'react';
import { QueryClientProvider } from '@tanstack/react-query';
import { queryClient } from './lib/queryClient.js';
import { ThemeProvider } from './context/ThemeContext.js';
import { AppRouter } from './routes/index.js';
import { WaterBubbleClickEffect } from './components/effects/WaterBubbleClickEffect.js';

export const App: React.FC = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider>
        <AppRouter />
        <WaterBubbleClickEffect />
      </ThemeProvider>
    </QueryClientProvider>
  );
};

export default App;
