import { useParams, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ShoppingCart, ArrowLeft, Check } from "lucide-react";
import { toast } from "sonner";
import { useCart } from "@/contexts/CartContext";
import productN8N from "@/assets/product-n8n.jpg";
import productERP from "@/assets/product-erp.jpg";
import productDelivery from "@/assets/product-delivery.jpg";
import productTemplates from "@/assets/product-templates.jpg";
import productBot from "@/assets/product-bot.jpg";

interface ProductDetail {
  id: string;
  name: string;
  price: number;
  description: string;
  image: string;
  category: string;
  features: string[];
  videoUrl: string;
  detailedDescription: string;
  benefits: string[];
  includes: string[];
}

const productsData: ProductDetail[] = [
  {
    id: "1",
    name: "Kit Fluxos N8N Avançado",
    price: 297,
    description: "Automação IA com licenças oficiais. Economize meses de desenvolvimento.",
    image: productN8N,
    category: "automacao",
    features: ["50+ fluxos prontos", "Integração com OpenAI", "Documentação completa"],
    videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
    detailedDescription: "Kit completo com mais de 50 fluxos N8N prontos para uso, incluindo integrações com OpenAI, webhooks, automações de email, processamento de dados e muito mais. Ideal para quem quer acelerar a implementação de automações com IA.",
    benefits: [
      "Economize semanas de desenvolvimento",
      "Fluxos testados e otimizados",
      "Atualizações gratuitas por 1 ano",
      "Suporte via Discord"
    ],
    includes: [
      "50+ workflows N8N prontos",
      "Documentação completa em português",
      "Exemplos de uso práticos",
      "Licenças oficiais incluídas"
    ]
  },
  {
    id: "2",
    name: "ERP PHP com IA",
    price: 497,
    description: "PDV no navegador com 10+ módulos integrados e inteligência artificial.",
    image: productERP,
    category: "erp",
    features: ["10+ módulos", "PDV integrado", "Relatórios com IA"],
    videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
    detailedDescription: "Sistema ERP completo desenvolvido em PHP com mais de 10 módulos integrados. Inclui PDV no navegador, gestão de estoque, financeiro, RH, relatórios com IA e muito mais. Perfeito para pequenas e médias empresas.",
    benefits: [
      "Sistema completo pronto para usar",
      "Interface moderna e responsiva",
      "Relatórios gerados por IA",
      "Código aberto para customização"
    ],
    includes: [
      "10+ módulos integrados",
      "PDV web completo",
      "App mobile para vendedores",
      "Dashboard executivo com IA",
      "Código fonte completo"
    ]
  },
  {
    id: "3",
    name: "FastAutomation Delivery",
    price: 397,
    description: "Sistema de entrega com IA para otimização de rotas em tempo real.",
    image: productDelivery,
    category: "automacao",
    features: ["Rotas otimizadas", "App mobile", "Dashboard admin"],
    videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
    detailedDescription: "Plataforma completa para gestão de entregas com inteligência artificial. Otimização de rotas em tempo real, rastreamento de entregadores, notificações automáticas e dashboard administrativo completo.",
    benefits: [
      "Reduza custos com otimização de rotas",
      "Aumente a satisfação dos clientes",
      "Rastreamento em tempo real",
      "Integração com WhatsApp"
    ],
    includes: [
      "Sistema web administrativo",
      "App mobile para entregadores",
      "API de integração",
      "Otimização de rotas com IA",
      "Notificações automáticas"
    ]
  },
  {
    id: "4",
    name: "Templates React/Tailwind para Apps IA",
    price: 197,
    description: "Landings prontas e modernas para suas aplicações de IA.",
    image: productTemplates,
    category: "templates",
    features: ["10+ templates", "Totalmente responsivo", "Dark mode"],
    videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
    detailedDescription: "Coleção com mais de 10 templates modernos desenvolvidos com React e Tailwind CSS. Perfeitos para landing pages de aplicações de IA, SaaS e produtos digitais. Código limpo e totalmente customizável.",
    benefits: [
      "Lance seu produto em dias, não meses",
      "Design profissional e moderno",
      "Totalmente responsivo",
      "SEO otimizado"
    ],
    includes: [
      "10+ templates completos",
      "Componentes reutilizáveis",
      "Dark mode incluso",
      "Código TypeScript",
      "Documentação de uso"
    ]
  },
  {
    id: "5",
    name: "Bot Discord Customizável",
    price: 97,
    description: "Script para automação completa de servidores Discord.",
    image: productBot,
    category: "automacao",
    features: ["Moderação automática", "Comandos custom", "Dashboard web"],
    videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
    detailedDescription: "Bot Discord completo e totalmente customizável. Inclui moderação automática, comandos personalizados, dashboard web para configuração, sistema de níveis, economia virtual e muito mais.",
    benefits: [
      "Automatize a moderação do servidor",
      "Engaje sua comunidade",
      "Dashboard intuitivo",
      "Fácil de hospedar"
    ],
    includes: [
      "Bot Discord completo",
      "Dashboard web de gerenciamento",
      "Sistema de moderação automática",
      "Comandos personalizáveis",
      "Documentação completa"
    ]
  },
];

export default function ProductDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addItem } = useCart();

  const product = productsData.find((p) => p.id === id);

  if (!product) {
    return (
      <div className="min-h-screen pt-24 pb-16 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-3xl font-bold mb-4">Produto não encontrado</h1>
          <Button onClick={() => navigate("/produtos")}>
            Voltar para Produtos
          </Button>
        </div>
      </div>
    );
  }

  const addToCart = () => {
    addItem({
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.image,
    });
    toast.success(`${product.name} adicionado ao carrinho!`);
  };

  return (
    <div className="min-h-screen pt-24 pb-16">
      <div className="container mx-auto px-4 lg:px-8">
        {/* Back Button */}
        <Button
          variant="outline"
          className="mb-8"
          onClick={() => navigate("/produtos")}
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Voltar para Produtos
        </Button>

        {/* Product Header */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
          <div className="space-y-6 animate-fade-in">
            <img
              src={product.image}
              alt={product.name}
              className="w-full rounded-xl shadow-[0_4px_12px_rgba(0,0,0,0.08)]"
            />
            <div className="bg-[#f8f9fb] p-6 rounded-xl">
              <h3
                className="text-[1.4rem] font-semibold tracking-tight mb-4"
                style={{ letterSpacing: "-0.01em", color: "#0D0D1A" }}
              >
                O que está incluído:
              </h3>
              <ul className="space-y-3">
                {product.includes.map((item, idx) => (
                  <li key={idx} className="flex items-start">
                    <Check className="w-5 h-5 mr-3 mt-0.5 flex-shrink-0" style={{ color: "#0D0D1A" }} />
                    <span style={{ color: "#6e6e73" }}>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="animate-fade-in" style={{ animationDelay: "0.1s" }}>
            <h1
              className="text-[clamp(2rem,4vw,3rem)] font-semibold tracking-tight mb-4"
              style={{ letterSpacing: "-0.02em", color: "#0D0D1A" }}
            >
              {product.name}
            </h1>
            <p
              className="text-[1.2rem] mb-6"
              style={{ color: "#6e6e73" }}
            >
              {product.description}
            </p>

            <div className="flex items-baseline gap-4 mb-8">
              <span
                className="text-[2.5rem] font-semibold"
                style={{ color: "#0D0D1A" }}
              >
                R$ {product.price}
              </span>
              <span style={{ color: "#6e6e73" }}>pagamento único</span>
            </div>

            <Button
              size="lg"
              className="w-full bg-[#0D0D1A] hover:bg-[#111122] text-white mb-8"
              style={{ letterSpacing: "0.03em" }}
              onClick={addToCart}
            >
              <ShoppingCart className="w-5 h-5 mr-2" />
              Adicionar ao Carrinho
            </Button>

            <div className="space-y-6">
              <div>
                <h3
                  className="text-[1.4rem] font-semibold tracking-tight mb-4"
                  style={{ letterSpacing: "-0.01em", color: "#0D0D1A" }}
                >
                  Sobre este produto
                </h3>
                <p style={{ color: "#6e6e73" }}>{product.detailedDescription}</p>
              </div>

              <div>
                <h3
                  className="text-[1.4rem] font-semibold tracking-tight mb-4"
                  style={{ letterSpacing: "-0.01em", color: "#0D0D1A" }}
                >
                  Benefícios principais
                </h3>
                <ul className="space-y-3">
                  {product.benefits.map((benefit, idx) => (
                    <li key={idx} className="flex items-start">
                      <Check className="w-5 h-5 mr-3 mt-0.5 flex-shrink-0" style={{ color: "#0D0D1A" }} />
                      <span style={{ color: "#6e6e73" }}>{benefit}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>

        {/* Video Section */}
        <div className="bg-[#f8f9fb] rounded-xl p-8 md:p-12 animate-fade-in">
          <h2
            className="text-[clamp(1.8rem,3vw,2.5rem)] font-semibold tracking-tight mb-8 text-center"
            style={{ letterSpacing: "-0.02em", color: "#0D0D1A" }}
          >
            Veja o produto em ação
          </h2>
          <div className="aspect-video w-full max-w-4xl mx-auto rounded-xl overflow-hidden shadow-[0_4px_12px_rgba(0,0,0,0.08)]">
            <iframe
              width="100%"
              height="100%"
              src={product.videoUrl}
              title={product.name}
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              className="w-full h-full"
            ></iframe>
          </div>
        </div>

        {/* Features Section */}
        <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8">
          {product.features.map((feature, idx) => (
            <div
              key={idx}
              className="bg-white p-6 rounded-xl shadow-[0_4px_12px_rgba(0,0,0,0.08)] animate-fade-in"
              style={{ animationDelay: `${idx * 0.1}s` }}
            >
              <div className="w-12 h-12 bg-[#f8f9fb] rounded-lg flex items-center justify-center mb-4">
                <Check className="w-6 h-6" style={{ color: "#0D0D1A" }} />
              </div>
              <h3
                className="text-[1.2rem] font-semibold tracking-tight mb-2"
                style={{ letterSpacing: "-0.01em", color: "#0D0D1A" }}
              >
                {feature}
              </h3>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
