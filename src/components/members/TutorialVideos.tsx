export function TutorialVideos() {
  const tutorials = [
    "Configurando Fluxos N8N do Zero",
    "Integrando IA no seu ERP",
    "Automação Avançada com Discord Bots",
    "Deploy de Apps React em Produção",
    "Otimização de Performance com IA",
  ];

  return (
    <div className="bg-[#f8f9fb] rounded-xl p-8 md:p-12 mb-16 animate-fade-in">
      <h2 
        className="text-[clamp(1.8rem,3vw,2.5rem)] font-semibold tracking-tight mb-8 text-center"
        style={{ letterSpacing: '-0.02em', color: '#0D0D1A' }}
      >
        Tutoriais Exclusivos para Membros
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {tutorials.map((title, index) => (
          <div
            key={index}
            className="bg-card rounded-lg p-6 shadow-card hover:shadow-card-hover transition-all duration-300 cursor-pointer group"
          >
            <div className="aspect-video bg-gradient-to-br from-primary to-accent rounded-lg mb-4 flex items-center justify-center group-hover:scale-105 transition-transform">
              <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center backdrop-blur-sm">
                <svg
                  className="w-8 h-8 text-white"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path d="M6.3 2.841A1.5 1.5 0 004 4.11V15.89a1.5 1.5 0 002.3 1.269l9.344-5.89a1.5 1.5 0 000-2.538L6.3 2.84z" />
                </svg>
              </div>
            </div>
            <h3 className="font-semibold">{title}</h3>
          </div>
        ))}
      </div>
    </div>
  );
}
