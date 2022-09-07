import { useState } from 'react';

export const useLoading = (defaultLoading: boolean = false) => {
  const [isLoading, setIsLoading] = useState(defaultLoading);
  return {
    isLoading,
    setIsLoading,
  };
};
