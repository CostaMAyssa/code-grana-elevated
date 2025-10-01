# VideoBackground Component

## Visão Geral
O componente `VideoBackground` substitui a imagem estática do hero section por vídeos dinâmicos que rotacionam automaticamente, criando uma experiência visual mais envolvente e moderna.

## Funcionalidades

### 🎥 Reprodução de Vídeos
- **4 vídeos de alta qualidade** da pasta `src/videos/`
- **Rotação automática** a cada 45 segundos
- **Reprodução contínua** sem interrupções
- **Fallback para imagem** em caso de erro

### 🎨 Melhorias Visuais
- **Overlay gradiente** para melhor legibilidade do texto
- **Zoom sutil** (1.1x) para melhor cobertura da tela
- **Filtros de brilho e contraste** para otimizar a aparência
- **Indicador visual** mostrando qual vídeo está ativo

### ⚡ Performance
- **Carregamento otimizado** com `preload="metadata"`
- **Hook personalizado** para gerenciamento de estado
- **Cleanup automático** de intervalos e recursos
- **Tratamento de erros** robusto

### ♿ Acessibilidade
- **Aria-labels** descritivos
- **TabIndex negativo** para não interferir na navegação
- **Fallback para navegadores** sem suporte a vídeo

## Estrutura de Arquivos

```
src/
├── components/
│   └── VideoBackground.tsx    # Componente principal
├── hooks/
│   └── useVideoRotation.ts    # Hook para gerenciamento de vídeos
├── videos/                    # Pasta com os vídeos
│   ├── 1350205-hd_1920_1080_30fps.mp4
│   ├── 1957733-hd_1920_1080_30fps.mp4
│   ├── 3006961-hd_1920_1080_24fps.mp4
│   └── 3195703-uhd_3840_2160_25fps.mp4
└── pages/
    └── Home.tsx              # Página que usa o componente
```

## Uso

```tsx
import VideoBackground from '@/components/VideoBackground';

<VideoBackground className="h-screen flex items-center justify-center">
  <div className="text-center">
    <h1>Seu conteúdo aqui</h1>
  </div>
</VideoBackground>
```

## Configurações

### Intervalo de Rotação
Por padrão, os vídeos trocam a cada 45 segundos. Para alterar:

```tsx
const { startRotation } = useVideoRotation({ 
  videos, 
  rotationInterval: 60000 // 60 segundos
});
```

### Vídeos Personalizados
Para adicionar novos vídeos, importe-os e adicione ao array:

```tsx
import novoVideo from '@/videos/novo-video.mp4';
const videos = [video1, video2, video3, video4, novoVideo];
```

## Considerações Técnicas

### Otimização
- Os vídeos são carregados sob demanda
- Apenas um vídeo fica em memória por vez
- Cleanup automático previne vazamentos de memória

### Compatibilidade
- Funciona em todos os navegadores modernos
- Fallback para imagem em navegadores antigos
- Suporte a dispositivos móveis com `playsInline`

### Responsividade
- Adapta-se a diferentes resoluções de tela
- Mantém proporção e qualidade em todos os dispositivos
- Otimizado para performance em mobile
