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

export function MembershipTiers() {
  return (
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
            <div
              className={`w-16 h-16 bg-gradient-to-br ${tier.color} rounded-xl flex items-center justify-center mb-6`}
            >
              <tier.icon className="w-8 h-8 text-white" />
            </div>

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

            <ul className="space-y-3 mb-8">
              {tier.features.map((feature, idx) => (
                <li key={idx} className="flex items-start">
                  <Check className="w-5 h-5 text-apple-blue-hover mr-3 mt-0.5 flex-shrink-0" />
                  <span className="text-sm">{feature}</span>
                </li>
              ))}
            </ul>

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
  );
}
