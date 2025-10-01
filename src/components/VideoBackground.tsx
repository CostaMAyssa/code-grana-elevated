import { useEffect, useRef } from 'react';
import heroImage from '@/assets/hero-video-poster.jpg';
import { useVideoRotation } from '@/hooks/useVideoRotation';

// Importar os vídeos
import video1 from '@/videos/1350205-hd_1920_1080_30fps.mp4';
import video2 from '@/videos/1957733-hd_1920_1080_30fps.mp4';
import video3 from '@/videos/3006961-hd_1920_1080_24fps.mp4';
import video4 from '@/videos/3195703-uhd_3840_2160_25fps.mp4';

const videos = [video1, video2, video3, video4];

interface VideoBackgroundProps {
  className?: string;
  children?: React.ReactNode;
}

export default function VideoBackground({ className = '', children }: VideoBackgroundProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  
  const {
    currentVideoIndex,
    isVideoLoaded,
    hasError,
    handleVideoEnd,
    handleVideoError,
    handleVideoLoaded,
    startRotation,
    cleanup
  } = useVideoRotation({ videos });

  // Efeito para iniciar a rotação automática
  useEffect(() => {
    startRotation();
    return cleanup;
  }, [startRotation, cleanup]);

  // Efeito para reproduzir o vídeo quando carregado
  useEffect(() => {
    if (videoRef.current && isVideoLoaded && !hasError) {
      videoRef.current.play().catch((error) => {
        console.warn('Erro ao reproduzir vídeo:', error);
      });
    }
  }, [isVideoLoaded, hasError, currentVideoIndex]);

  return (
    <div className={`relative ${className}`}>
      {/* Fallback para imagem quando há erro ou vídeo não carregou */}
      {hasError && (
        <div className="absolute inset-0 z-0">
          <img
            src={heroImage}
            alt="Hero background fallback"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/50 to-black/70" />
        </div>
      )}

      {/* Vídeo de fundo */}
      {!hasError && (
        <div className="absolute inset-0 z-0">
          <video
            ref={videoRef}
            className="w-full h-full object-cover"
            muted
            loop={false}
            playsInline
            onEnded={handleVideoEnd}
            onError={handleVideoError}
            onLoadedData={handleVideoLoaded}
            onCanPlay={handleVideoLoaded}
            preload="metadata"
            aria-label={`Vídeo de fundo ${currentVideoIndex + 1} de ${videos.length}`}
            tabIndex={-1}
            style={{
              transform: 'scale(1.1)', // Pequeno zoom para cobrir melhor a tela
              filter: 'brightness(0.8) contrast(1.1)' // Ajuste sutil de brilho e contraste
            }}
          >
            <source src={videos[currentVideoIndex]} type="video/mp4" />
            Seu navegador não suporta vídeos HTML5.
          </video>
          
          {/* Overlay escuro para melhorar legibilidade do texto */}
          <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/50 to-black/70" />
          
          {/* Indicador de carregamento */}
          {!isVideoLoaded && !hasError && (
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-12 h-12 border-4 border-accent border-t-transparent rounded-full animate-spin" />
            </div>
          )}

          {/* Indicador discreto do vídeo atual */}
          <div className="absolute top-4 right-4 z-10">
            <div className="flex space-x-1">
              {videos.map((_, index) => (
                <div
                  key={index}
                  className={`w-2 h-2 rounded-full transition-all duration-300 ${
                    index === currentVideoIndex 
                      ? 'bg-accent scale-125' 
                      : 'bg-white/30 hover:bg-white/50'
                  }`}
                />
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Conteúdo sobreposto */}
      {children && (
        <div className="relative z-10">
          {children}
        </div>
      )}
    </div>
  );
}
