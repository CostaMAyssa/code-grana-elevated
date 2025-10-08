import { Button } from "@/components/ui/button";
import { Check, Crown, Star, Zap } from "lucide-react";

interface MembershipTier {
  name: string;
  price: number;
  icon: typeof Crown;
  features: string[];
  color: string;
  popular?: boolean;
}

const tiers: MembershipTier[] = [
  {
    name: "Bronze",
    price: 49.9,
    icon: Zap,
    color: "from-orange-600 to-amber-700",
    features: [
      "Acesso básico ao Discord",
      "Canal de suporte geral",
      "Downloads de produtos",
      "Atualizações mensais",
      "Desconto de 10% em produtos",
    ],
  },
  {
    name: "Prata",
    price: 99.9,
    icon: Star,
    color: "from-slate-400 to-gray-500",
    popular: true,
    features: [
      "Tudo do Bronze +",
      "Suporte prioritário 24h",
      "Canais exclusivos",
      "Desconto de 20% em produtos",
      "Early access a novos produtos",
      "Webinars mensais",
    ],
  },
  {
    name: "Ouro",
    price: 149.9,
    icon: Crown,
    color: "from-yellow-500 to-amber-600",
    features: [
      "Tudo do Prata +",
      "Customizações personalizadas",
      "Consultoria 1:1 mensal",
      "Desconto de 40% em produtos",
      "Acesso vitalício a updates",
      "Código fonte de projetos exclusivos",
      "Badge especial no Discord",
    ],
  },
];

export default function Members() {
  return (
    <div className="min-h-screen pt-24 pb-16">
      <div className="container mx-auto px-4 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16 animate-fade-in">
          <h1 
            className="text-[clamp(2rem,4vw,3rem)] font-semibold tracking-tight mb-4"
            style={{ letterSpacing: '-0.02em', color: '#0D0D1A' }}
          >
            Junte-se à Comunidade CodeGrana
          </h1>
          <p 
            className="text-[1.2rem] mb-2"
            style={{ color: '#6e6e73' }}
          >
            Leve sua automação para outro nível
          </p>
          <p 
            className="text-[1rem] max-w-2xl mx-auto"
            style={{ color: '#6e6e73' }}
          >
            Acesse conteúdo exclusivo, suporte premium e descubra uma comunidade
            apaixonada por desenvolvimento
          </p>
        </div>

        {/* Pricing Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          {tiers.map((tier, index) => (
            <div
              key={tier.name}
              className={`relative bg-card rounded-xl shadow-card hover:shadow-card-hover transition-all duration-300 hover:-translate-y-2 animate-fade-in ${
                tier.popular ? "ring-2 ring-accent scale-105" : ""
              }`}
              style={{ animationDelay: `${index * 0.15}s` }}
            >
              {tier.popular && (
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                  <span className="bg-apple-blue-hover text-apple-blue-hover-foreground px-4 py-1 rounded-full text-sm font-bold">
                    MAIS POPULAR
                  </span>
                </div>
              )}

              <div className="p-8">
                {/* Icon with gradient */}
                <div
                  className={`w-16 h-16 bg-gradient-to-br ${tier.color} rounded-xl flex items-center justify-center mb-6`}
                >
                  <tier.icon className="w-8 h-8 text-white" />
                </div>

                {/* Tier name and price */}
                <h3 
                  className="text-[1.6rem] font-semibold tracking-tight mb-2"
                  style={{ letterSpacing: '-0.01em', color: '#0D0D1A' }}
                >
                  {tier.name}
                </h3>
                <div className="mb-6">
                  <span 
                    className="text-[2.5rem] font-semibold"
                    style={{ color: '#0D0D1A' }}
                  >
                    R$ {tier.price.toFixed(2)}
                  </span>
                  <span style={{ color: '#6e6e73' }}>/mês</span>
                </div>

                {/* Features list */}
                <ul className="space-y-3 mb-8">
                  {tier.features.map((feature, idx) => (
                    <li key={idx} className="flex items-start">
                      <Check className="w-5 h-5 text-apple-blue-hover mr-3 mt-0.5 flex-shrink-0" />
                      <span className="text-sm">{feature}</span>
                    </li>
                  ))}
                </ul>

                {/* CTA Button */}
                <Button
                  variant="default"
                  size="lg"
                  className="w-full bg-[#0D0D1A] hover:bg-[#111122] text-white"
                  style={{ letterSpacing: '0.03em' }}
                  asChild
                >
                  <a href="#checkout">Assine Agora</a>
                </Button>
              </div>
            </div>
          ))}
        </div>

        {/* Video Tutorials Section */}
        <div className="bg-[#f8f9fb] rounded-xl p-8 md:p-12 mb-16 animate-fade-in">
          <h2 
            className="text-[clamp(1.8rem,3vw,2.5rem)] font-semibold tracking-tight mb-8 text-center"
            style={{ letterSpacing: '-0.02em', color: '#0D0D1A' }}
          >
            Tutoriais Exclusivos para Membros
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              "Configurando Fluxos N8N do Zero",
              "Integrando IA no seu ERP",
              "Automação Avançada com Discord Bots",
              "Deploy de Apps React em Produção",
              "Otimização de Performance com IA",
            ].map((title, index) => (
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

        {/* Discord CTA */}
        <div className="bg-[#f8f9fb] rounded-xl p-8 md:p-12 text-center animate-fade-in">
          <h2 
            className="text-[clamp(1.8rem,3vw,2.5rem)] font-semibold tracking-tight mb-4"
            style={{ letterSpacing: '-0.02em', color: '#0D0D1A' }}
          >
            Pronto para começar?
          </h2>
          <p 
            className="text-[1.2rem] mb-8"
            style={{ color: '#6e6e73' }}
          >
            Escolha seu plano e ganhe acesso imediato à comunidade
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              variant="default" 
              size="lg" 
              className="bg-[#0D0D1A] hover:bg-[#111122] text-white"
              style={{ letterSpacing: '0.03em' }}
              asChild
            >
              <a href="https://discord.gg/codegrana" target="_blank" rel="noopener noreferrer">
                Entrar no Discord
              </a>
            </Button>
            <Button 
              variant="outline" 
              size="lg"
            >
              Ver FAQ
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
