import { useState } from "react";
import { Button } from "@/components/ui/button";
import { ShoppingCart, Play, Filter } from "lucide-react";
import { toast } from "sonner";
import productN8N from "@/assets/product-n8n.jpg";
import productERP from "@/assets/product-erp.jpg";
import productDelivery from "@/assets/product-delivery.jpg";
import productTemplates from "@/assets/product-templates.jpg";
import productBot from "@/assets/product-bot.jpg";

interface Product {
  id: string;
  name: string;
  price: number;
  description: string;
  image: string;
  category: string;
  features: string[];
}

const products: Product[] = [
  {
    id: "1",
    name: "Kit Fluxos N8N Avançado",
    price: 297,
    description: "Automação IA com licenças oficiais. Economize meses de desenvolvimento.",
    image: productN8N,
    category: "automacao",
    features: ["50+ fluxos prontos", "Integração com OpenAI", "Documentação completa"],
  },
  {
    id: "2",
    name: "ERP PHP com IA",
    price: 497,
    description: "PDV no navegador com 10+ módulos integrados e inteligência artificial.",
    image: productERP,
    category: "erp",
    features: ["10+ módulos", "PDV integrado", "Relatórios com IA"],
  },
  {
    id: "3",
    name: "FastAutomation Delivery",
    price: 397,
    description: "Sistema de entrega com IA para otimização de rotas em tempo real.",
    image: productDelivery,
    category: "automacao",
    features: ["Rotas otimizadas", "App mobile", "Dashboard admin"],
  },
  {
    id: "4",
    name: "Templates React/Tailwind para Apps IA",
    price: 197,
    description: "Landings prontas e modernas para suas aplicações de IA.",
    image: productTemplates,
    category: "templates",
    features: ["10+ templates", "Totalmente responsivo", "Dark mode"],
  },
  {
    id: "5",
    name: "Bot Discord Customizável",
    price: 97,
    description: "Script para automação completa de servidores Discord.",
    image: productBot,
    category: "automacao",
    features: ["Moderação automática", "Comandos custom", "Dashboard web"],
  },
];

export default function Products() {
  const [selectedCategory, setSelectedCategory] = useState<string>("all");

  const filteredProducts =
    selectedCategory === "all"
      ? products
      : products.filter((p) => p.category === selectedCategory);

  const addToCart = (product: Product) => {
    toast.success(`${product.name} adicionado ao carrinho!`);
  };

  return (
    <div className="min-h-screen pt-24 pb-16">
      <div className="container mx-auto px-4 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12 animate-fade-in">
          <h1 className="text-4xl md:text-6xl font-bold mb-4">
            Confira Nossos Produtos
          </h1>
          <p className="text-xl text-accent font-medium">
            Soluções prontas para automação e IA
          </p>
        </div>

        {/* Filters */}
        <div className="flex flex-wrap gap-3 mb-12 justify-center animate-fade-in">
          <Button
            variant={selectedCategory === "all" ? "golden" : "outline"}
            onClick={() => setSelectedCategory("all")}
          >
            <Filter className="w-4 h-4 mr-2" />
            Todos
          </Button>
          <Button
            variant={selectedCategory === "automacao" ? "golden" : "outline"}
            onClick={() => setSelectedCategory("automacao")}
          >
            Automação IA
          </Button>
          <Button
            variant={selectedCategory === "templates" ? "golden" : "outline"}
            onClick={() => setSelectedCategory("templates")}
          >
            Templates Web
          </Button>
          <Button
            variant={selectedCategory === "erp" ? "golden" : "outline"}
            onClick={() => setSelectedCategory("erp")}
          >
            Kits ERP
          </Button>
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProducts.map((product, index) => (
            <div
              key={product.id}
              className="bg-card rounded-xl overflow-hidden shadow-card hover:shadow-card-hover transition-all duration-300 hover:-translate-y-2 animate-fade-in"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="relative h-64 overflow-hidden group">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-apple-gray/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                  <Button variant="golden" size="sm">
                    <Play className="w-4 h-4 mr-2" />
                    Ver Demo
                  </Button>
                </div>
              </div>

              <div className="p-6">
                <h3 className="text-xl font-bold mb-2">{product.name}</h3>
                <p className="text-muted-foreground mb-4">{product.description}</p>

                <ul className="space-y-2 mb-6">
                  {product.features.map((feature, idx) => (
                    <li key={idx} className="flex items-center text-sm">
                      <span className="w-1.5 h-1.5 bg-accent rounded-full mr-2" />
                      {feature}
                    </li>
                  ))}
                </ul>

                <div className="flex items-center justify-between">
                  <span className="text-3xl font-bold text-accent">
                    R$ {product.price}
                  </span>
                  <Button
                    variant="golden"
                    onClick={() => addToCart(product)}
                  >
                    <ShoppingCart className="w-4 h-4 mr-2" />
                    Adicionar
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Upsell Section */}
        <div className="mt-16 bg-primary text-primary-foreground rounded-xl p-8 md:p-12 text-center animate-fade-in">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Quer acesso a todos os produtos?
          </h2>
          <p className="text-xl mb-6 text-muted-foreground">
            Torne-se um membro e economize até 40% em produtos premium
          </p>
          <Button variant="golden" size="lg" asChild>
            <a href="/membros">Ver Planos de Membership</a>
          </Button>
        </div>
      </div>
    </div>
  );
}
