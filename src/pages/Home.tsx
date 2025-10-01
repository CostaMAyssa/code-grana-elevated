import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Zap, Shield, Gift, FileCheck, ArrowRight } from "lucide-react";
import heroImage from "@/assets/hero-video-poster.jpg";

export default function Home() {
  return (
    <div className="min-h-screen">
      {/* Hero Section com vídeo de fundo */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        {/* Hero Background */}
        <div className="absolute inset-0 z-0 bg-background" />
        <div className="absolute inset-0 z-0 bg-gray-200/40" />

        {/* Hero Content */}
        <div className="relative z-10 text-center px-4 max-w-5xl mx-auto animate-fade-in-up">
          <h1 className="text-5xl md:text-7xl font-bold text-contrast-dark mb-6 leading-tight">
            Marketplace líder em código fonte
            <br />
            <span className="text-apple-blue-hover">premium no Brasil</span>
          </h1>
          <p className="text-xl md:text-2xl text-contrast mb-8 font-medium">
            Acelere seus projetos com automação e IA
          </p>
              <Link to="/produtos" className="bg-black text-white px-8 py-4 rounded-full text-lg font-semibold inline-flex items-center hover:bg-gray-800 hover:scale-105 hover:shadow-lg transition-all duration-300 shadow-md">
                Explore Nossos Produtos
                <ArrowRight className="ml-3 w-5 h-5" />
              </Link>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
          <div className="w-6 h-10 border-2 border-apple-blue-hover rounded-full flex justify-center">
            <div className="w-1 h-3 bg-apple-blue-hover rounded-full mt-2 animate-pulse" />
          </div>
        </div>
      </section>

      {/* Benefícios Section */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              Por que escolher a <span className="text-apple-blue-hover">CodeGrana</span>?
            </h2>
            <p className="text-xl text-contrast">
              Desenvolvimento profissional ao seu alcance
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                icon: Zap,
                title: "Economia de Tempo",
                description: "Reduza meses de desenvolvimento para dias com nossos códigos prontos",
              },
              {
                icon: Shield,
                title: "Suporte Premium",
                description: "Assistência técnica especializada via Discord e WhatsApp",
              },
              {
                icon: Gift,
                title: "Atualizações Grátis",
                description: "Membros recebem updates exclusivos e novos recursos",
              },
              {
                icon: FileCheck,
                title: "Licenças Oficiais",
                description: "Todos os produtos com documentação completa e legal",
              },
            ].map((benefit, index) => (
              <div
                key={index}
                className="bg-card p-8 rounded-xl shadow-card-dark hover:shadow-card-hover-dark transition-all duration-300 hover:-translate-y-2 animate-fade-in"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="w-16 h-16 bg-black rounded-lg flex items-center justify-center mb-6">
                  <benefit.icon className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-bold mb-3">{benefit.title}</h3>
                <p className="text-contrast">{benefit.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gray-100 text-contrast-dark">
        <div className="container mx-auto px-4 lg:px-8 text-center">
          <h2 className="text-4xl md:text-5xl font-bold mb-6 text-contrast-dark">
            Junte-se à nossa comunidade no Discord
          </h2>
          <p className="text-xl mb-8 text-contrast">
            Conecte-se com desenvolvedores, receba suporte e acesse conteúdo exclusivo
          </p>
          <a
            href="https://discord.gg/codegrana"
            target="_blank"
            rel="noopener noreferrer"
            className="bg-black text-white px-10 py-5 rounded-full text-xl font-semibold inline-flex items-center hover:bg-gray-800 hover:scale-105 hover:shadow-lg transition-all duration-300 shadow-md"
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
      <section className="py-20 bg-muted">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              O que nossos <span className="text-apple-blue-hover">clientes</span> dizem
            </h2>
            <p className="text-xl text-contrast">
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
                className="bg-card p-8 rounded-xl shadow-card-dark animate-fade-in"
                style={{ animationDelay: `${index * 0.15}s` }}
              >
                <div className="mb-6">
                  <div className="flex text-black mb-2">
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
                  <p className="text-foreground mb-4 italic">"{testimonial.text}"</p>
                </div>
                <div>
                  <p className="font-bold">{testimonial.name}</p>
                  <p className="text-sm text-apple-gray">{testimonial.role}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
