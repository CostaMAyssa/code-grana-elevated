import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Zap, Shield, Gift, FileCheck, ArrowRight } from "lucide-react";
import heroImage from "@/assets/hero-video-poster.jpg";
import cardBackgroundImage from "@/img/imgcards/pexels-pixabay-247676.jpg";
import timeBackgroundImage from "@/img/imgcards/pexels-ivan-samkov-7703268.jpg";
import installationBackgroundImage from "@/img/imgcards/pexels-divinetechygirl-1181675.jpg";
import updatesBackgroundImage from "@/img/imgcards/pexels-divinetechygirl-1181244.jpg";
import licensesBackgroundImage from "@/img/imgcards/pexels-fotios-photos-3473411.jpg";

export default function Home() {
  return (
    <div className="min-h-screen">
      {/* Hero Section - Apple-inspired minimalist design */}
      <section className="relative flex items-center justify-center overflow-hidden px-8" style={{ height: '90vh' }}>
        {/* Radial gradient background with soft glow effect */}
        <div 
          className="absolute inset-0" 
          style={{ 
            background: 'radial-gradient(circle at 50% 40%, #ffffff 0%, #f7f8fa 60%, #f3f4f6 100%)' 
          }} 
        />
        
        {/* Animated subtle glow */}
        <div 
          className="absolute hero-glow pointer-events-none"
          style={{
            top: '-50%',
            left: '-50%',
            width: '200%',
            height: '200%',
            background: 'radial-gradient(circle at 50% 50%, rgba(255,255,255,0.4), transparent 70%)',
            zIndex: 0
          }}
        />

        {/* Hero Content */}
        <div className="relative z-10 text-center max-w-[850px] mx-auto animate-fade-up">
          <h1 className="text-[clamp(2.8rem,6vw,4.5rem)] font-semibold tracking-tight leading-[1.1] mb-5" style={{ letterSpacing: '-0.02em', color: '#0D0D1A' }}>
            Marketplace líder em código fonte premium no Brasil
          </h1>
          <p className="text-[1.3rem] mt-5 mb-10" style={{ color: '#6e6e73' }}>
            Acelere seus projetos com automação e IA
          </p>
          <Link 
            to="/produtos" 
            className="inline-block bg-[#0D0D1A] text-white px-8 py-3.5 rounded-full font-medium transition-all duration-300 hover:bg-[#111122] hover:-translate-y-1 hover:shadow-[0_10px_25px_rgba(0,0,0,0.08)]"
            style={{ letterSpacing: '0.03em' }}
          >
            Explorar Produtos
          </Link>
        </div>
      </section>

      {/* Benefícios Section - Estilo Apple */}
      <section className="py-20 bg-white">
          <div className="text-center mb-16 px-8">
            <h2 className="text-[clamp(2rem,4vw,3rem)] font-semibold tracking-tight mb-4" style={{ letterSpacing: '-0.02em', color: '#0D0D1A' }}>
              Por que escolher a <span style={{ color: '#0D0D1A' }}>CodeGrana</span>?
            </h2>
            <p className="text-[1.2rem]" style={{ color: '#6e6e73' }}>
              Desenvolvimento profissional ao seu alcance
            </p>
          </div>

        {/* Grid de 4 Quadrantes */}
        <div className="grid grid-cols-2 h-[80vh] gap-0 mb-20 grid-rows-2">
          {/* Quadrante 1 - Economia de Tempo */}
          <div className="relative flex items-center justify-center overflow-hidden h-[40vh]">
            <div 
              className="absolute inset-0 bg-cover bg-center bg-no-repeat"
              style={{ backgroundImage: `url(${timeBackgroundImage})` }}
            />
            <div className="absolute inset-0 bg-white/70" />
            <div className="relative z-10 text-center px-4 max-w-sm mx-auto">
              <h3 className="text-[clamp(1.8rem,3vw,2.5rem)] font-semibold tracking-tight mb-4" style={{ letterSpacing: '-0.02em', color: '#0D0D1A' }}>
                Economia de Tempo
              </h3>
              <p className="text-[1.1rem] leading-relaxed" style={{ color: '#6e6e73' }}>
                Reduza meses de desenvolvimento para dias com nossos códigos prontos
              </p>
            </div>
          </div>

          {/* Quadrante 2 - Instalação e Configuração */}
          <div className="relative flex items-center justify-center overflow-hidden h-[40vh]">
            <div 
              className="absolute inset-0 bg-cover bg-center bg-no-repeat"
              style={{ backgroundImage: `url(${installationBackgroundImage})` }}
            />
            <div className="absolute inset-0 bg-white/70" />
            <div className="relative z-10 text-center px-4 max-w-sm mx-auto">
              <h3 className="text-[clamp(1.8rem,3vw,2.5rem)] font-semibold tracking-tight mb-4" style={{ letterSpacing: '-0.02em', color: '#0D0D1A' }}>
                Instalação e Configuração
              </h3>
              <p className="text-[1.1rem] leading-relaxed" style={{ color: '#6e6e73' }}>
                Contrate nossa equipe para instalar e configurar seus projetos
              </p>
            </div>
          </div>

          {/* Quadrante 3 - Atualizações Grátis */}
          <div className="relative flex items-center justify-center overflow-hidden h-[40vh]">
            <div 
              className="absolute inset-0 bg-cover bg-center bg-no-repeat"
              style={{ backgroundImage: `url(${updatesBackgroundImage})` }}
            />
            <div className="absolute inset-0 bg-white/70" />
            <div className="relative z-10 text-center px-4 max-w-sm mx-auto">
              <h3 className="text-[clamp(1.8rem,3vw,2.5rem)] font-semibold tracking-tight mb-4" style={{ letterSpacing: '-0.02em', color: '#0D0D1A' }}>
                Atualizações Grátis
              </h3>
              <p className="text-[1.1rem] leading-relaxed" style={{ color: '#6e6e73' }}>
                Membros recebem updates exclusivos e novos recursos
              </p>
            </div>
                </div>

          {/* Quadrante 4 - Licenças Oficiais */}
          <div className="relative flex items-center justify-center overflow-hidden h-[40vh]">
            <div 
              className="absolute inset-0 bg-cover bg-center bg-no-repeat"
              style={{ backgroundImage: `url(${licensesBackgroundImage})` }}
            />
            <div className="absolute inset-0 bg-white/70" />
            <div className="relative z-10 text-center px-4 max-w-sm mx-auto">
              <h3 className="text-[clamp(1.8rem,3vw,2.5rem)] font-semibold tracking-tight mb-4" style={{ letterSpacing: '-0.02em', color: '#0D0D1A' }}>
                Licenças Oficiais
              </h3>
              <p className="text-[1.1rem] leading-relaxed" style={{ color: '#6e6e73' }}>
                Todos os produtos com documentação completa e legal
              </p>
              </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-[#f8f9fb]">
        <div className="container mx-auto px-4 lg:px-8 text-center">
          <h2 className="text-[clamp(2rem,4vw,3rem)] font-semibold tracking-tight mb-6" style={{ letterSpacing: '-0.02em', color: '#0D0D1A' }}>
            Junte-se à nossa comunidade no Discord
          </h2>
          <p className="text-[1.2rem] mb-8" style={{ color: '#6e6e73' }}>
            Conecte-se com desenvolvedores, receba suporte e acesse conteúdo exclusivo
          </p>
          <a
            href="https://discord.gg/codegrana"
            target="_blank"
            rel="noopener noreferrer"
            className="bg-[#0D0D1A] text-white px-10 py-4 rounded-full font-medium inline-flex items-center hover:bg-[#111122] hover:-translate-y-1 hover:shadow-[0_10px_25px_rgba(0,0,0,0.08)] transition-all duration-300"
            style={{ letterSpacing: '0.03em', fontSize: '1.1rem' }}
          >
            <svg className="w-6 h-6 mr-3" fill="currentColor" viewBox="0 0 24 24">
              <path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-.617-1.25.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057 19.9 19.9 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028 14.09 14.09 0 0 0 1.226-1.994.076.076 0 0 0-.041-.106 13.107 13.107 0 0 1-1.872-.892.077.077 0 0 1-.008-.128 10.2 10.2 0 0 0 .372-.292.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127 12.299 12.299 0 0 1-1.873.892.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028 19.839 19.839 0 0 0 6.002-3.03.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.956-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.955-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.946 2.418-2.157 2.418z"/>
            </svg>
            Junte-se à Comunidade
            <ArrowRight className="ml-3 w-6 h-6" />
          </a>
        </div>
      </section>

      {/* Depoimentos Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-[clamp(2rem,4vw,3rem)] font-semibold tracking-tight mb-4" style={{ letterSpacing: '-0.02em', color: '#0D0D1A' }}>
              O que nossos <span style={{ color: '#0D0D1A' }}>clientes</span> dizem
            </h2>
            <p className="text-[1.2rem]" style={{ color: '#6e6e73' }}>
              Histórias de sucesso reais
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                name: "Carlos Silva",
                role: "Desenvolvedor Full Stack",
                text: "Economizei 3 meses de desenvolvimento com o Kit N8N. Produto excepcional!",
              },
              {
                name: "Ana Paula",
                role: "Founder de Startup",
                text: "O ERP PHP transformou nosso negócio. Suporte impecável e código limpo.",
              },
              {
                name: "Rafael Costa",
                role: "Freelancer",
                text: "Membro Ouro há 6 meses. Melhor investimento que fiz na minha carreira.",
              },
            ].map((testimonial, index) => (
              <div
                key={index}
                className="bg-white border border-gray-100 p-8 rounded-2xl hover:shadow-[0_10px_30px_rgba(0,0,0,0.08)] transition-all duration-300 animate-fade-in"
                style={{ animationDelay: `${index * 0.15}s` }}
              >
                <div className="mb-6">
                  <div className="flex mb-4" style={{ color: '#0D0D1A' }}>
                    {[...Array(5)].map((_, i) => (
                      <svg
                        key={i}
                        className="w-5 h-5 fill-current"
                        viewBox="0 0 20 20"
                      >
                        <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" />
                      </svg>
                    ))}
                  </div>
                  <p className="mb-4 italic text-[1.05rem] leading-relaxed" style={{ color: '#0D0D1A' }}>"{testimonial.text}"</p>
                </div>
                <div>
                  <p className="font-semibold tracking-tight" style={{ color: '#0D0D1A' }}>{testimonial.name}</p>
                  <p className="text-sm" style={{ color: '#6e6e73' }}>{testimonial.role}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
