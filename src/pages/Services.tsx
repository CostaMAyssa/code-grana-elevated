import { Button } from "@/components/ui/button";
import { Check, Code, Users } from "lucide-react";
import { useCart } from "@/hooks/useCart";
import { toast } from "sonner";

const services = [
  {
    id: "implementation",
    name: "Serviço de Implementação",
    price: 500,
    description: "Implementação personalizada de soluções digitais, incluindo códigos prontos e integração completa.",
    image: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=800",
    features: [
      "Códigos fonte prontos e otimizados",
      "Integração com APIs e serviços externos",
      "Documentação completa",
      "Suporte técnico por 30 dias",
      "Customização incluída",
    ],
    icon: Code,
  },
  {
    id: "consulting",
    name: "Consultoria Especializada",
    price: 300,
    description: "Aconselhamento estratégico para projetos web por hora, com foco em arquitetura e boas práticas.",
    image: "https://images.unsplash.com/photo-1552664730-d307ca884978?w=800",
    features: [
      "Análise de arquitetura",
      "Revisão de código",
      "Planejamento de projetos",
      "Mentoria técnica",
      "Consultoria em tempo real",
    ],
    icon: Users,
    priceUnit: "/hora",
  },
];

export default function Services() {
  const { addItem } = useCart();

  const handleAddToCart = (service: typeof services[0]) => {
    addItem({
      id: service.id,
      name: service.name,
      price: service.price,
      image: service.image,
    });
    toast.success(`${service.name} adicionado ao carrinho`);
  };

  return (
    <div className="min-h-screen pt-24 pb-16 bg-secondary/30">
      <div className="container mx-auto px-4 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16 animate-fade-in">
          <h1 className="text-5xl md:text-6xl font-semibold mb-4 tracking-tight">
            Nossos Serviços
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Soluções profissionais para acelerar seus projetos digitais
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
          {services.map((service, index) => (
            <div
              key={service.id}
              className="bg-card rounded-2xl overflow-hidden shadow-card hover:shadow-card-hover transition-all duration-300 animate-fade-in"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              {/* Image */}
              <div className="relative h-64 overflow-hidden">
                <img
                  src={service.image}
                  alt={service.name}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                <div className="absolute bottom-4 left-6">
                  <service.icon className="w-12 h-12 text-white" />
                </div>
              </div>

              {/* Content */}
              <div className="p-8">
                <h2 className="text-3xl font-semibold mb-3">{service.name}</h2>
                <p className="text-muted-foreground mb-6 leading-relaxed">
                  {service.description}
                </p>

                {/* Features */}
                <ul className="space-y-3 mb-8">
                  {service.features.map((feature, idx) => (
                    <li key={idx} className="flex items-start">
                      <Check className="w-5 h-5 text-accent mr-3 mt-0.5 flex-shrink-0" />
                      <span className="text-sm">{feature}</span>
                    </li>
                  ))}
                </ul>

                {/* Price and CTA */}
                <div className="flex items-center justify-between pt-6 border-t border-border">
                  <div>
                    <span className="text-4xl font-semibold">
                      R$ {service.price}
                    </span>
                    {service.priceUnit && (
                      <span className="text-muted-foreground ml-2">
                        {service.priceUnit}
                      </span>
                    )}
                  </div>
                  <Button
                    variant="apple"
                    size="lg"
                    onClick={() => handleAddToCart(service)}
                  >
                    Adicionar ao Carrinho
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Info Section */}
        <div className="mt-20 bg-card rounded-2xl p-12 text-center shadow-card max-w-4xl mx-auto animate-fade-in">
          <h2 className="text-3xl font-semibold mb-4">
            Precisa de uma solução customizada?
          </h2>
          <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
            Entre em contato para discutirmos suas necessidades específicas e
            criarmos um projeto sob medida.
          </p>
          <Button variant="apple" size="lg" asChild>
            <a href="/contato">Falar com Especialista</a>
          </Button>
        </div>
      </div>
    </div>
  );
}
