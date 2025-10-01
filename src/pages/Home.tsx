import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Zap, Shield, Gift, FileCheck, ArrowRight } from "lucide-react";
import heroImage from "@/assets/hero-video-poster.jpg";

export default function Home() {
  return (
    <div className="min-h-screen">
      {/* Hero Section com vídeo de fundo */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        {/* Video Background (usando imagem como poster) */}
        <div className="absolute inset-0 z-0">
          <img
            src={heroImage}
            alt="Hero background"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/50 to-black/70" />
        </div>

        {/* Hero Content */}
        <div className="relative z-10 text-center px-4 max-w-5xl mx-auto animate-fade-in-up">
          <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 leading-tight">
            Marketplace líder em código fonte
            <br />
            <span className="text-accent">premium no Brasil</span>
          </h1>
          <p className="text-xl md:text-2xl text-accent mb-8 font-medium">
            Acelere seus projetos com automação e IA
          </p>
          <Button variant="apple" size="lg" asChild className="text-lg">
            <Link to="/produtos">
              Explore Nossos Produtos
              <ArrowRight className="ml-2 w-5 h-5" />
            </Link>
          </Button>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
          <div className="w-6 h-10 border-2 border-accent rounded-full flex justify-center">
            <div className="w-1 h-3 bg-accent rounded-full mt-2 animate-pulse" />
          </div>
        </div>
      </section>

      {/* Benefícios Section */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              Por que escolher a CodeGrana?
            </h2>
            <p className="text-xl text-muted-foreground">
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
                className="bg-card p-8 rounded-xl shadow-card hover:shadow-card-hover transition-all duration-300 hover:-translate-y-2 animate-fade-in"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="w-16 h-16 bg-accent rounded-lg flex items-center justify-center mb-6">
                  <benefit.icon className="w-8 h-8 text-accent-foreground" />
                </div>
                <h3 className="text-xl font-bold mb-3">{benefit.title}</h3>
                <p className="text-muted-foreground">{benefit.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-primary text-primary-foreground">
        <div className="container mx-auto px-4 lg:px-8 text-center">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Junte-se à nossa comunidade no Discord
          </h2>
          <p className="text-xl mb-8 text-muted-foreground">
            Conecte-se com desenvolvedores, receba suporte e acesse conteúdo exclusivo
          </p>
          <Button variant="apple" size="lg" asChild>
            <a
              href="https://discord.gg/codegrana"
              target="_blank"
              rel="noopener noreferrer"
              className="text-lg"
            >
              Entrar no Discord
              <ArrowRight className="ml-2 w-5 h-5" />
            </a>
          </Button>
        </div>
      </section>

      {/* Depoimentos Section */}
      <section className="py-20 bg-muted">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              O que nossos clientes dizem
            </h2>
            <p className="text-xl text-muted-foreground">
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
                className="bg-card p-8 rounded-xl shadow-card animate-fade-in"
                style={{ animationDelay: `${index * 0.15}s` }}
              >
                <div className="mb-6">
                  <div className="flex text-accent mb-2">
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
                  <p className="text-sm text-muted-foreground">{testimonial.role}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
