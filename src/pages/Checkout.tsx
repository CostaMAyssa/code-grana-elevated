import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useCart } from "@/hooks/useCart";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";

export default function Checkout() {
  const { items, total, clearCart } = useCart();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    // Simular processamento de pagamento
    setTimeout(() => {
      toast.success("Pedido realizado com sucesso! Verifique seu email.");
      clearCart();
      setLoading(false);
      navigate("/codigos");
    }, 2000);
  };

  if (items.length === 0) {
    navigate("/carrinho");
    return null;
  }

  return (
    <div className="min-h-screen pt-24 pb-16 bg-secondary/30">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="max-w-5xl mx-auto">
          {/* Header */}
          <div className="mb-12 animate-fade-in">
            <h1 className="text-4xl md:text-5xl font-semibold mb-2 tracking-tight">
              Finalizar Compra
            </h1>
            <p className="text-muted-foreground">
              Complete seus dados para processar o pedido
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Checkout Form */}
            <div className="lg:col-span-2">
              <form onSubmit={handleSubmit} className="space-y-8 animate-fade-in">
                {/* Contact Information */}
                <div className="bg-card rounded-2xl p-8 shadow-card">
                  <h2 className="text-2xl font-semibold mb-6">
                    Informações de Contato
                  </h2>
                  <div className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="firstName">Nome</Label>
                        <Input
                          id="firstName"
                          required
                          className="mt-2"
                          placeholder="João"
                        />
                      </div>
                      <div>
                        <Label htmlFor="lastName">Sobrenome</Label>
                        <Input
                          id="lastName"
                          required
                          className="mt-2"
                          placeholder="Silva"
                        />
                      </div>
                    </div>
                    <div>
                      <Label htmlFor="email">Email</Label>
                      <Input
                        id="email"
                        type="email"
                        required
                        className="mt-2"
                        placeholder="joao@exemplo.com"
                      />
                    </div>
                    <div>
                      <Label htmlFor="phone">Telefone</Label>
                      <Input
                        id="phone"
                        type="tel"
                        required
                        className="mt-2"
                        placeholder="(48) 99999-9999"
                      />
                    </div>
                  </div>
                </div>

                {/* Payment Information */}
                <div className="bg-card rounded-2xl p-8 shadow-card">
                  <h2 className="text-2xl font-semibold mb-6">
                    Informações de Pagamento
                  </h2>
                  <div className="space-y-4">
                    <div>
                      <Label htmlFor="cardNumber">Número do Cartão</Label>
                      <Input
                        id="cardNumber"
                        required
                        className="mt-2"
                        placeholder="1234 5678 9012 3456"
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="expiry">Validade</Label>
                        <Input
                          id="expiry"
                          required
                          className="mt-2"
                          placeholder="MM/AA"
                        />
                      </div>
                      <div>
                        <Label htmlFor="cvv">CVV</Label>
                        <Input
                          id="cvv"
                          required
                          className="mt-2"
                          placeholder="123"
                        />
                      </div>
                    </div>
                    <div>
                      <Label htmlFor="cardName">Nome no Cartão</Label>
                      <Input
                        id="cardName"
                        required
                        className="mt-2"
                        placeholder="João Silva"
                      />
                    </div>
                  </div>
                </div>

                <Button
                  type="submit"
                  variant="apple"
                  size="lg"
                  className="w-full"
                  disabled={loading}
                >
                  {loading ? "Processando..." : `Pagar R$ ${total.toFixed(2)}`}
                </Button>
              </form>
            </div>

            {/* Order Summary */}
            <div className="lg:col-span-1">
              <div className="bg-card rounded-2xl p-8 shadow-card sticky top-24 animate-fade-in">
                <h2 className="text-2xl font-semibold mb-6">Seu Pedido</h2>
                
                <div className="space-y-4 mb-6">
                  {items.map((item) => (
                    <div key={item.id} className="flex justify-between text-sm">
                      <span className="text-muted-foreground">
                        {item.name} × {item.quantity}
                      </span>
                      <span className="font-medium">
                        R$ {(item.price * item.quantity).toFixed(2)}
                      </span>
                    </div>
                  ))}
                  
                  <div className="pt-4 border-t border-border">
                    <div className="flex justify-between text-2xl font-semibold">
                      <span>Total</span>
                      <span>R$ {total.toFixed(2)}</span>
                    </div>
                  </div>
                </div>

                <div className="pt-6 border-t border-border">
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <svg
                      className="w-5 h-5"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                      />
                    </svg>
                    <span>Pagamento seguro e criptografado</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
