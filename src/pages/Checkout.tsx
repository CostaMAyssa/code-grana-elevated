import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { CreditCard, QrCode, FileText, ArrowLeft, ShoppingCart } from "lucide-react";
import { useCart } from "@/contexts/CartContext";
import { toast } from "sonner";
import { z } from "zod";

const cardSchema = z.object({
  cardNumber: z.string().min(16, "Número do cartão inválido").max(19),
  cardName: z.string().min(3, "Nome inválido").max(100),
  expiry: z.string().regex(/^\d{2}\/\d{2}$/, "Formato MM/AA"),
  cvv: z.string().min(3, "CVV inválido").max(4),
});

const pixSchema = z.object({
  email: z.string().email("Email inválido").max(255),
  name: z.string().min(3, "Nome inválido").max(100),
});

const boletoSchema = z.object({
  cpf: z.string().regex(/^\d{11}$/, "CPF deve ter 11 dígitos"),
  name: z.string().min(3, "Nome inválido").max(100),
});

type PaymentMethod = "card" | "pix" | "boleto";

export default function Checkout() {
  const navigate = useNavigate();
  const { cartItems, total } = useCart();
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>("card");
  const [isProcessing, setIsProcessing] = useState(false);

  // Card form
  const [cardNumber, setCardNumber] = useState("");
  const [cardName, setCardName] = useState("");
  const [expiry, setExpiry] = useState("");
  const [cvv, setCvv] = useState("");

  // PIX form
  const [pixEmail, setPixEmail] = useState("");
  const [pixName, setPixName] = useState("");

  // Boleto form
  const [boletoCpf, setBoletoCpf] = useState("");
  const [boletoName, setBoletoName] = useState("");

  if (cartItems.length === 0) {
    return (
      <div className="min-h-screen pt-24 pb-16 flex items-center justify-center">
        <div className="text-center">
          <ShoppingCart className="w-16 h-16 mx-auto mb-4" style={{ color: '#6e6e73' }} />
          <h2 
            className="text-[1.8rem] font-semibold tracking-tight mb-4"
            style={{ letterSpacing: '-0.01em', color: '#0D0D1A' }}
          >
            Seu carrinho está vazio
          </h2>
          <Button
            variant="default"
            className="bg-[#0D0D1A] hover:bg-[#111122] text-white"
            style={{ letterSpacing: '0.03em' }}
            onClick={() => navigate("/produtos")}
          >
            Ver Produtos
          </Button>
        </div>
      </div>
    );
  }

  const handlePayment = async () => {
    setIsProcessing(true);

    try {
      if (paymentMethod === "card") {
        const result = cardSchema.safeParse({ cardNumber, cardName, expiry, cvv });
        if (!result.success) {
          toast.error(result.error.errors[0].message);
          setIsProcessing(false);
          return;
        }
      } else if (paymentMethod === "pix") {
        const result = pixSchema.safeParse({ email: pixEmail, name: pixName });
        if (!result.success) {
          toast.error(result.error.errors[0].message);
          setIsProcessing(false);
          return;
        }
      } else if (paymentMethod === "boleto") {
        const result = boletoSchema.safeParse({ cpf: boletoCpf, name: boletoName });
        if (!result.success) {
          toast.error(result.error.errors[0].message);
          setIsProcessing(false);
          return;
        }
      }

      // Simular processamento
      await new Promise((resolve) => setTimeout(resolve, 2000));

      toast.success("Pagamento processado com sucesso!");
      navigate("/");
    } catch (error) {
      toast.error("Erro ao processar pagamento");
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="min-h-screen pt-24 pb-16" style={{ background: 'radial-gradient(circle at 50% 40%, #ffffff 0%, #f7f8fa 60%, #f3f4f6 100%)' }}>
      <div className="container mx-auto px-4 lg:px-8 max-w-6xl">
        <Button
          variant="ghost"
          onClick={() => navigate(-1)}
          className="mb-8"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Voltar
        </Button>

        <h1 
          className="text-[clamp(2rem,4vw,3rem)] font-semibold tracking-tight mb-8"
          style={{ letterSpacing: '-0.02em', color: '#0D0D1A' }}
        >
          Finalizar Compra
        </h1>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Resumo do Pedido */}
          <div className="bg-white rounded-xl p-6 shadow-[0_4px_12px_rgba(0,0,0,0.08)] h-fit">
            <h2 
              className="text-[1.4rem] font-semibold tracking-tight mb-6"
              style={{ letterSpacing: '-0.01em', color: '#0D0D1A' }}
            >
              Resumo do Pedido
            </h2>
            <div className="space-y-4 mb-6">
              {cartItems.map((item) => (
                <div key={item.id} className="flex items-center gap-4">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-16 h-16 object-cover rounded"
                  />
                  <div className="flex-1">
                    <h4 
                      className="font-semibold text-[1rem]"
                      style={{ color: '#0D0D1A' }}
                    >
                      {item.name}
                    </h4>
                    <p 
                      className="text-[0.9rem]"
                      style={{ color: '#6e6e73' }}
                    >
                      R$ {item.price.toFixed(2)}
                    </p>
                  </div>
                </div>
              ))}
            </div>
            <div className="border-t border-gray-200 pt-4">
              <div className="flex justify-between items-center">
                <span 
                  className="text-[1.2rem] font-semibold"
                  style={{ color: '#0D0D1A' }}
                >
                  Total
                </span>
                <span 
                  className="text-[2rem] font-semibold"
                  style={{ color: '#0D0D1A' }}
                >
                  R$ {total.toFixed(2)}
                </span>
              </div>
            </div>
          </div>

          {/* Métodos de Pagamento */}
          <div className="bg-white rounded-xl p-6 shadow-[0_4px_12px_rgba(0,0,0,0.08)]">
            <h2 
              className="text-[1.4rem] font-semibold tracking-tight mb-6"
              style={{ letterSpacing: '-0.01em', color: '#0D0D1A' }}
            >
              Método de Pagamento
            </h2>

            {/* Seleção de Método */}
            <div className="grid grid-cols-3 gap-3 mb-8">
              <button
                onClick={() => setPaymentMethod("card")}
                className={`p-4 rounded-lg border-2 transition-all ${
                  paymentMethod === "card"
                    ? "border-[#0D0D1A] bg-[#f8f9fb]"
                    : "border-gray-200 hover:border-gray-300"
                }`}
              >
                <CreditCard className="w-6 h-6 mx-auto mb-2" style={{ color: '#0D0D1A' }} />
                <p className="text-sm font-medium" style={{ color: '#0D0D1A' }}>Cartão</p>
              </button>
              <button
                onClick={() => setPaymentMethod("pix")}
                className={`p-4 rounded-lg border-2 transition-all ${
                  paymentMethod === "pix"
                    ? "border-[#0D0D1A] bg-[#f8f9fb]"
                    : "border-gray-200 hover:border-gray-300"
                }`}
              >
                <QrCode className="w-6 h-6 mx-auto mb-2" style={{ color: '#0D0D1A' }} />
                <p className="text-sm font-medium" style={{ color: '#0D0D1A' }}>PIX</p>
              </button>
              <button
                onClick={() => setPaymentMethod("boleto")}
                className={`p-4 rounded-lg border-2 transition-all ${
                  paymentMethod === "boleto"
                    ? "border-[#0D0D1A] bg-[#f8f9fb]"
                    : "border-gray-200 hover:border-gray-300"
                }`}
              >
                <FileText className="w-6 h-6 mx-auto mb-2" style={{ color: '#0D0D1A' }} />
                <p className="text-sm font-medium" style={{ color: '#0D0D1A' }}>Boleto</p>
              </button>
            </div>

            {/* Formulários */}
            {paymentMethod === "card" && (
              <div className="space-y-4">
                <div>
                  <Label htmlFor="cardNumber">Número do Cartão</Label>
                  <Input
                    id="cardNumber"
                    placeholder="0000 0000 0000 0000"
                    value={cardNumber}
                    onChange={(e) => setCardNumber(e.target.value.replace(/\s/g, ""))}
                    maxLength={19}
                  />
                </div>
                <div>
                  <Label htmlFor="cardName">Nome no Cartão</Label>
                  <Input
                    id="cardName"
                    placeholder="NOME COMPLETO"
                    value={cardName}
                    onChange={(e) => setCardName(e.target.value)}
                    maxLength={100}
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="expiry">Validade</Label>
                    <Input
                      id="expiry"
                      placeholder="MM/AA"
                      value={expiry}
                      onChange={(e) => setExpiry(e.target.value)}
                      maxLength={5}
                    />
                  </div>
                  <div>
                    <Label htmlFor="cvv">CVV</Label>
                    <Input
                      id="cvv"
                      placeholder="123"
                      value={cvv}
                      onChange={(e) => setCvv(e.target.value)}
                      maxLength={4}
                    />
                  </div>
                </div>
              </div>
            )}

            {paymentMethod === "pix" && (
              <div className="space-y-4">
                <div className="bg-[#f8f9fb] rounded-lg p-6 text-center mb-4">
                  <QrCode className="w-32 h-32 mx-auto mb-4" style={{ color: '#0D0D1A' }} />
                  <p className="text-sm" style={{ color: '#6e6e73' }}>
                    Após confirmar, você receberá o QR Code PIX
                  </p>
                </div>
                <div>
                  <Label htmlFor="pixName">Nome Completo</Label>
                  <Input
                    id="pixName"
                    placeholder="Seu nome"
                    value={pixName}
                    onChange={(e) => setPixName(e.target.value)}
                    maxLength={100}
                  />
                </div>
                <div>
                  <Label htmlFor="pixEmail">Email</Label>
                  <Input
                    id="pixEmail"
                    type="email"
                    placeholder="seu@email.com"
                    value={pixEmail}
                    onChange={(e) => setPixEmail(e.target.value)}
                    maxLength={255}
                  />
                </div>
              </div>
            )}

            {paymentMethod === "boleto" && (
              <div className="space-y-4">
                <div className="bg-[#f8f9fb] rounded-lg p-6 text-center mb-4">
                  <FileText className="w-32 h-32 mx-auto mb-4" style={{ color: '#0D0D1A' }} />
                  <p className="text-sm" style={{ color: '#6e6e73' }}>
                    O boleto será gerado após a confirmação
                  </p>
                </div>
                <div>
                  <Label htmlFor="boletoName">Nome Completo</Label>
                  <Input
                    id="boletoName"
                    placeholder="Seu nome"
                    value={boletoName}
                    onChange={(e) => setBoletoName(e.target.value)}
                    maxLength={100}
                  />
                </div>
                <div>
                  <Label htmlFor="boletoCpf">CPF</Label>
                  <Input
                    id="boletoCpf"
                    placeholder="00000000000"
                    value={boletoCpf}
                    onChange={(e) => setBoletoCpf(e.target.value.replace(/\D/g, ""))}
                    maxLength={11}
                  />
                </div>
              </div>
            )}

            <Button
              variant="default"
              size="lg"
              className="w-full mt-6 bg-[#0D0D1A] hover:bg-[#111122] text-white"
              style={{ letterSpacing: '0.03em' }}
              onClick={handlePayment}
              disabled={isProcessing}
            >
              {isProcessing ? "Processando..." : "Confirmar Pagamento"}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
