import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { CreditCard, QrCode, FileText, ArrowLeft, ShoppingCart, CheckCircle, ExternalLink } from "lucide-react";
import { useCart } from "@/contexts/CartContext";
import { toast } from "sonner";
import { z } from "zod";
import { supabase } from "@/integrations/supabase/client";

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

// Usando o cliente Supabase configurado

interface PaymentResponse {
  success: boolean;
  paymentUrl?: string;
  qrCode?: string;
  qrCodeImage?: string;
  error?: string;
  orderId?: string;
  paymentId?: string;
}

export default function Checkout() {
  const navigate = useNavigate();
  const { cartItems, total, clearCart } = useCart();
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>("pix");
  const [isProcessing, setIsProcessing] = useState(false);
  const [paymentData, setPaymentData] = useState<PaymentResponse | null>(null);
  const [user, setUser] = useState<any>(null);

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

  // Dados do cliente
  const [customerData, setCustomerData] = useState({
    name: "",
    cpfCnpj: "",
    phone: "",
    address: "",
    city: "",
    state: "",
    postalCode: "",
  });

  // Carregar dados do usuário
  useEffect(() => {
    const loadUser = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (user) {
        setUser(user);
        setPixEmail(user.email || "");
        setPixName(user.user_metadata?.full_name || "");
        
        // Buscar dados do perfil
        const { data: profile } = await supabase
          .from('profiles')
          .select('*')
          .eq('id', user.id)
          .single();
        
        if (profile) {
          setCustomerData({
            name: profile.full_name || user.user_metadata?.full_name || "",
            cpfCnpj: profile.cpf_cnpj || "",
            phone: profile.phone || "",
            address: profile.address || "",
            city: profile.city || "",
            state: profile.state || "",
            postalCode: profile.postal_code || "",
          });
        }
      }
    };
    
    loadUser();
  }, []);

  // Polling para verificar status do pagamento
  useEffect(() => {
    if (!paymentData?.paymentId) return;

    const interval = setInterval(async () => {
      try {
        const { data: payment } = await supabase
          .from('payments')
          .select('status')
          .eq('asaas_id', paymentData.paymentId)
          .single();

        if (payment?.status === 'confirmed') {
          toast.success("Pagamento confirmado! Verifique seu e-mail para o link de download.");
          clearCart();
          clearInterval(interval);
          navigate("/members");
        }
      } catch (error) {
        console.error('Erro ao verificar status:', error);
      }
    }, 5000);

    return () => clearInterval(interval);
  }, [paymentData?.paymentId, clearCart, navigate]);

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
    if (!user) {
      toast.error("Faça login para continuar");
      navigate("/login");
      return;
    }

    setIsProcessing(true);

    try {
      // Validar dados do formulário
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

      // Validar CPF/CNPJ
      if (!customerData.cpfCnpj) {
        toast.error("CPF/CNPJ é obrigatório para pagamentos");
        setIsProcessing(false);
        return;
      }

      // Processar cada item do carrinho
      for (const item of cartItems) {
        const response = await fetch(`https://ccfumesbuqjpxfuhupxp.supabase.co/functions/v1/asaas-create-payment`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${user.access_token}`,
          },
          body: JSON.stringify({
            userEmail: user.email,
            productId: item.id,
            quantity: item.quantity,
            billingType: paymentMethod === "card" ? "CREDIT_CARD" : paymentMethod === "pix" ? "PIX" : "BOLETO",
            customerData: {
              name: customerData.name || (paymentMethod === "pix" ? pixName : boletoName),
              cpfCnpj: customerData.cpfCnpj,
              phone: customerData.phone,
              address: customerData.address,
              city: customerData.city,
              state: customerData.state,
              postalCode: customerData.postalCode,
            }
          }),
        });

        const result: PaymentResponse = await response.json();

        if (!result.success) {
          toast.error(result.error || "Erro ao processar pagamento");
          setIsProcessing(false);
          return;
        }

        // Salvar dados do primeiro pagamento para exibição
        if (!paymentData) {
          setPaymentData(result);
        }
      }

      toast.success("Pagamento criado com sucesso! Siga as instruções abaixo.");
      
    } catch (error) {
      console.error('Erro no pagamento:', error);
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

        {/* Seção de Pagamento Criado */}
        {paymentData && (
          <div className="mb-8 bg-green-50 border border-green-200 rounded-xl p-6">
            <div className="flex items-center gap-3 mb-4">
              <CheckCircle className="w-6 h-6 text-green-600" />
              <h3 className="text-lg font-semibold text-green-800">
                Pagamento Criado com Sucesso!
              </h3>
            </div>
            
            <div className="space-y-4">
              {paymentData.paymentUrl && (
                <div>
                  <p className="text-sm text-green-700 mb-2">
                    Clique no botão abaixo para finalizar o pagamento:
                  </p>
                  <a
                    href={paymentData.paymentUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg transition-colors"
                  >
                    <ExternalLink className="w-4 h-4" />
                    Pagar Agora
                  </a>
                </div>
              )}
              
              {paymentData.qrCodeImage && (
                <div>
                  <p className="text-sm text-green-700 mb-2">
                    Ou escaneie o QR Code com seu app de pagamento:
                  </p>
                  <img
                    src={paymentData.qrCodeImage}
                    alt="QR Code para pagamento"
                    className="max-w-xs mx-auto border rounded-lg"
                  />
                </div>
              )}
              
              <p className="text-xs text-green-600">
                Após o pagamento, você receberá um e-mail com o link de download.
                O status será atualizado automaticamente.
              </p>
            </div>
          </div>
        )}

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

            {/* Dados do Cliente */}
            <div className="space-y-4 mb-6">
              <h3 className="text-lg font-semibold" style={{ color: '#0D0D1A' }}>
                Dados para Faturamento
              </h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="customerName">Nome Completo *</Label>
                  <Input
                    id="customerName"
                    placeholder="Seu nome completo"
                    value={customerData.name}
                    onChange={(e) => setCustomerData(prev => ({ ...prev, name: e.target.value }))}
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="customerCpfCnpj">CPF/CNPJ *</Label>
                  <Input
                    id="customerCpfCnpj"
                    placeholder="000.000.000-00 ou 00.000.000/0000-00"
                    value={customerData.cpfCnpj}
                    onChange={(e) => setCustomerData(prev => ({ ...prev, cpfCnpj: e.target.value }))}
                    required
                  />
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="customerPhone">Telefone</Label>
                  <Input
                    id="customerPhone"
                    placeholder="(11) 99999-9999"
                    value={customerData.phone}
                    onChange={(e) => setCustomerData(prev => ({ ...prev, phone: e.target.value }))}
                  />
                </div>
                <div>
                  <Label htmlFor="customerPostalCode">CEP</Label>
                  <Input
                    id="customerPostalCode"
                    placeholder="00000-000"
                    value={customerData.postalCode}
                    onChange={(e) => setCustomerData(prev => ({ ...prev, postalCode: e.target.value }))}
                  />
                </div>
              </div>
              
              <div>
                <Label htmlFor="customerAddress">Endereço</Label>
                <Input
                  id="customerAddress"
                  placeholder="Rua, número, complemento"
                  value={customerData.address}
                  onChange={(e) => setCustomerData(prev => ({ ...prev, address: e.target.value }))}
                />
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="customerCity">Cidade</Label>
                  <Input
                    id="customerCity"
                    placeholder="Sua cidade"
                    value={customerData.city}
                    onChange={(e) => setCustomerData(prev => ({ ...prev, city: e.target.value }))}
                  />
                </div>
                <div>
                  <Label htmlFor="customerState">Estado</Label>
                  <Input
                    id="customerState"
                    placeholder="SP"
                    value={customerData.state}
                    onChange={(e) => setCustomerData(prev => ({ ...prev, state: e.target.value }))}
                  />
                </div>
              </div>
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
