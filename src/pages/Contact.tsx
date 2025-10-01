import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { MessageSquare, Mail, Phone, Clock } from "lucide-react";
import { toast } from "sonner";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

export default function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success("Mensagem enviada com sucesso! Responderemos em breve.");
    setFormData({ name: "", email: "", message: "" });
  };

  const faqs = [
    {
      question: "Como recebo o código após a compra?",
      answer:
        "Após a confirmação do pagamento, você receberá um email e SMS com o link para download imediato. O acesso fica disponível 24/7 na sua conta.",
    },
    {
      question: "Posso usar os códigos em projetos comerciais?",
      answer:
        "Sim! Todos os nossos produtos incluem licença comercial. Você pode usar em quantos projetos quiser, sem royalties adicionais.",
    },
    {
      question: "Qual a diferença entre os planos de membership?",
      answer:
        "Bronze oferece acesso básico, Prata adiciona suporte prioritário e descontos maiores, enquanto Ouro inclui customizações personalizadas e consultoria 1:1.",
    },
    {
      question: "Vocês oferecem reembolso?",
      answer:
        "Sim, temos garantia de 7 dias. Se o produto não atender suas expectativas, reembolsamos integralmente.",
    },
    {
      question: "O suporte técnico está incluído?",
      answer:
        "Sim! Todos os clientes têm acesso ao suporte via Discord. Membros Prata e Ouro recebem atendimento prioritário.",
    },
  ];

  return (
    <div className="min-h-screen pt-24 pb-16">
      <div className="container mx-auto px-4 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16 animate-fade-in">
          <h1 className="text-4xl md:text-6xl font-bold mb-4">
            Fale Conosco
          </h1>
          <p className="text-xl text-accent font-medium">
            Estamos aqui para ajudar você
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-20">
          {/* Contact Form */}
          <div className="animate-fade-in">
            <div className="bg-card rounded-xl p-8 shadow-card">
              <h2 className="text-2xl font-bold mb-6">Envie uma Mensagem</h2>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label className="block text-sm font-medium mb-2">
                    Nome Completo
                  </label>
                  <Input
                    type="text"
                    placeholder="Seu nome"
                    value={formData.name}
                    onChange={(e) =>
                      setFormData({ ...formData, name: e.target.value })
                    }
                    required
                    className="w-full"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">
                    Email
                  </label>
                  <Input
                    type="email"
                    placeholder="seu@email.com"
                    value={formData.email}
                    onChange={(e) =>
                      setFormData({ ...formData, email: e.target.value })
                    }
                    required
                    className="w-full"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">
                    Mensagem
                  </label>
                  <Textarea
                    placeholder="Como podemos ajudar?"
                    value={formData.message}
                    onChange={(e) =>
                      setFormData({ ...formData, message: e.target.value })
                    }
                    required
                    className="w-full min-h-[150px]"
                  />
                </div>

                <Button type="submit" variant="apple" size="lg" className="w-full">
                  Enviar Mensagem
                </Button>
              </form>
            </div>
          </div>

          {/* Contact Info */}
          <div className="space-y-6 animate-fade-in" style={{ animationDelay: "0.2s" }}>
            <div className="bg-card rounded-xl p-8 shadow-card">
              <h2 className="text-2xl font-bold mb-6">Outros Canais</h2>
              <div className="space-y-6">
                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-accent rounded-lg flex items-center justify-center flex-shrink-0">
                    <MessageSquare className="w-6 h-6 text-accent-foreground" />
                  </div>
                  <div>
                    <h3 className="font-semibold mb-1">WhatsApp / Telegram</h3>
                    <p className="text-muted-foreground text-sm mb-2">
                      Atendimento direto para dúvidas rápidas
                    </p>
                    <a
                      href="https://wa.me/5548998463846"
                      className="text-accent hover:underline"
                    >
                      (48) 99846-3846
                    </a>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-accent rounded-lg flex items-center justify-center flex-shrink-0">
                    <Mail className="w-6 h-6 text-accent-foreground" />
                  </div>
                  <div>
                    <h3 className="font-semibold mb-1">Email</h3>
                    <p className="text-muted-foreground text-sm mb-2">
                      Para questões mais detalhadas
                    </p>
                    <a
                      href="mailto:contato@codegrana.com.br"
                      className="text-accent hover:underline"
                    >
                      contato@codegrana.com.br
                    </a>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-accent rounded-lg flex items-center justify-center flex-shrink-0">
                    <Clock className="w-6 h-6 text-accent-foreground" />
                  </div>
                  <div>
                    <h3 className="font-semibold mb-1">Horário de Atendimento</h3>
                    <p className="text-muted-foreground text-sm">
                      Segunda a Sábado
                      <br />
                      10:00 - 22:00 (Horário de Brasília)
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-primary text-primary-foreground rounded-xl p-8 shadow-card">
              <h3 className="text-xl font-bold mb-4">Discord Community</h3>
              <p className="text-muted-foreground mb-6">
                Junte-se a mais de 5.000 desenvolvedores na nossa comunidade
              </p>
              <Button variant="apple" size="lg" className="w-full" asChild>
                <a
                  href="https://discord.gg/codegrana"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Entrar no Discord
                </a>
              </Button>
            </div>
          </div>
        </div>

        {/* FAQ Section */}
        <div className="max-w-3xl mx-auto animate-fade-in">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
            Perguntas Frequentes
          </h2>
          <Accordion type="single" collapsible className="space-y-4">
            {faqs.map((faq, index) => (
              <AccordionItem
                key={index}
                value={`item-${index}`}
                className="bg-card rounded-lg px-6 shadow-card"
              >
                <AccordionTrigger className="text-left font-semibold hover:text-accent">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </div>
    </div>
  );
}
