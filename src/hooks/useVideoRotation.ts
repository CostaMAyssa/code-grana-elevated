import { useState, useCallback, useRef } from 'react';

interface UseVideoRotationProps {
  videos: string[];
  rotationInterval?: number;
}

export function useVideoRotation({ 
  videos, 
  rotationInterval = 45000 
}: UseVideoRotationProps) {
  const [currentVideoIndex, setCurrentVideoIndex] = useState(0);
  const [isVideoLoaded, setIsVideoLoaded] = useState(false);
  const [hasError, setHasError] = useState(false);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  const nextVideo = useCallback(() => {
    setCurrentVideoIndex((prev) => (prev + 1) % videos.length);
    setIsVideoLoaded(false);
    setHasError(false);
  }, [videos.length]);

  const handleVideoEnd = useCallback(() => {
    nextVideo();
  }, [nextVideo]);

  const handleVideoError = useCallback(() => {
    console.warn(`Erro ao carregar vídeo ${currentVideoIndex + 1}, tentando próximo...`);
    setHasError(true);
    nextVideo();
  }, [currentVideoIndex, nextVideo]);

  const handleVideoLoaded = useCallback(() => {
    setIsVideoLoaded(true);
    setHasError(false);
  }, []);

  const startRotation = useCallback(() => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }
    
    intervalRef.current = setInterval(() => {
      nextVideo();
    }, rotationInterval);
  }, [nextVideo, rotationInterval]);

  const stopRotation = useCallback(() => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
  }, []);

  // Cleanup no unmount
  const cleanup = useCallback(() => {
    stopRotation();
  }, [stopRotation]);

  return {
    currentVideoIndex,
    isVideoLoaded,
    hasError,
    nextVideo,
    handleVideoEnd,
    handleVideoError,
    handleVideoLoaded,
    startRotation,
    stopRotation,
    cleanup
  };
}
