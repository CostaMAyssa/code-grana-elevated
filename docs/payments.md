

## Análise do Estado Atual e Próximos Passos

### ✅ Progresso Atual
Você já tem uma base sólida para o marketplace premium da CodeGrana, com os seguintes pontos implementados:

1. **Estrutura de Banco de Dados (Supabase Postgres)**:
   - Tabelas bem definidas:
     - `users`: Armazena dados do cliente (email, name, cpf_cnpj).
     - `products`: Contém produtos digitais (nome, preço, file_url, categoria).
     - `orders`: Registra pedidos com `asaas_payment_id` e status (pending, paid, etc.).
     - `payments`: Armazena informações de pagamento (asaas_id, billing_type, status, payment_url, qr_code_url, processed_at).
   - **Row Level Security (RLS)**: Ativada para garantir que usuários só acessem seus próprios pedidos.
   - **Triggers**: Configurados para `updated_at` automático, aumentando a manutenibilidade.

2. **Frontend (React/Tailwind)**:
   - Design minimalista no estilo Apple Store, com paleta preto (#000000), branco (#FFFFFF), dourado (#D4AF37), cinza claro (#F5F5F7), cinza escuro (#1D1D1F), e azul (#0071E3).
   - **Hero Section**: Implementada com gradiente radial ou vídeo futurista, tipografia Inter/SF Pro, e animações fade-up.
   - **Página de Produtos**: Grid responsivo com cards (300x400px, sombra suave, hover scale 1.05), contendo produtos e serviços (ex.: Kit Fluxos N8N R$297, Serviço de Implementação R$500).
   - **Carrinho**: Ícone flutuante (canto inferior direito) com pop-up funcional (tabela de itens, botões "Escolher Mais" e "Ir para Pagamentos").
   - **Página de Detalhes**: Acessada ao clicar na imagem do card, com vídeo YouTube, descrição, e botão de compra.
   - **Área de Códigos**: Dashboard com seções para Meus Códigos, Histórico de Compras, Calendly, e Recursos Exclusivos.
   - **Menu**: Fixo, com links para Home, Serviços (dropdown: Implementação, Consultorias), Área de Códigos, Carrinho, Contato. Link Discord removido.
   - Persistência do carrinho via `localStorage`.

3. **Backend (Parcial)**:
   - Estrutura inicial para Edge Functions planejada, com o código compartilhado (`asaas-client.ts`) para:
     - Criar clientes (`createCustomer`).
     - Criar pagamentos (`createPayment` para Pix, boleto, cartão).
     - Validar webhooks (`validateWebhookSignature`).
   - Variáveis de ambiente configuradas (ex.: `ASAAS_ACCESS_TOKEN`).

4. **SEO e Marketing**:
   - Meta tags otimizadas com keywords como "código fonte automação IA Brasil".
   - Programa de indicações ("Indique um amigo, ganhe 20% desconto").
   - Pop-up de convite ao Discord após 10s.

### ❌ Problemas Identificados
A análise destaca lacunas críticas na integração com a API Asaas:

1. **Frontend Simulado**:
   - O checkout usa simulação (`setTimeout`) em vez de chamadas reais à API Asaas.
   - Não há integração para exibir links de pagamento (Pix, boleto) ou formulários de cartão.
   - Falta polling ou Supabase Realtime para atualizar o status do pagamento.

2. **Ausência de Edge Functions Implementadas**:
   - Não há funções Supabase deployadas para `asaas-create-payment` ou `asaas-webhook`.
   - Webhooks do Asaas não estão configurados para atualizar o status no banco.

3. **Integração Asaas Incompleta**:
   - Não há chamadas reais para `/v3/customers` ou `/v3/payments`.
   - Falta tratamento de erros (ex.: pagamento recusado, CPF inválido).
   - Webhooks não processam eventos como `PAYMENT_RECEIVED`.

4. **Falta de Logs e Testes**:
   - Sem logs de auditoria para monitorar falhas.
   - Ausência de testes automatizados para chamadas API.

### 🔧 Plano para Completar a Implementação
Vou detalhar como resolver cada problema, integrando a API Asaas com Edge Functions no Supabase, ajustando o frontend, e garantindo um fluxo funcional para pagamentos e downloads.

#### 1. Implementar Edge Functions no Supabase
Crie duas funções serverless para lidar com pagamentos e webhooks, usando o código fornecido (`asaas-client.ts`) como base.

**Edge Function 1: `asaas-create-payment`**
- **Objetivo**: Criar cliente e pagamento na Asaas, salvar no banco, retornar link/QR Code.
- **Código** (em `supabase/functions/asaas-create-payment/index.ts`):
  ```typescript
  import { serve } from 'https://deno.land/std@0.168.0/http/server.ts';
  import { createClient } from '@supabase/supabase-js';
  import { createCustomer, createPayment } from '../utils/asaas-client.ts';

  const supabase = createClient(Deno.env.get('SUPABASE_URL')!, Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!);

  serve(async (req) => {
    if (req.method !== 'POST') return new Response('Method not allowed', { status: 405 });

    try {
      const { userEmail, productId, quantity, billingType } = await req.json();
      const { data: product } = await supabase.from('products').select('*').eq('id', productId).single();
      const total = product.price * quantity;

      // Buscar ou criar cliente
      const { data: user } = await supabase.from('users').select('cpf_cnpj').eq('email', userEmail).single();
      let customerId;
      if (user?.cpf_cnpj) {
        const existing = await fetchCustomerByEmail(userEmail); // Implemente busca na Asaas
        customerId = existing?.id || (await createCustomer({ name: userEmail.split('@')[0], cpfCnpj: user.cpf_cnpj, email: userEmail })).id;
      } else {
        return new Response('CPF/CNPJ required', { status: 400 });
      }

      // Criar pagamento
      const asaasPayment = await createPayment(customerId, total, billingType, `Compra: ${product.name}`);
      
      // Salvar no BD
      const { data: order } = await supabase.from('orders').insert({
        user_id: userEmail,
        product_id: productId,
        quantity,
        total,
        asaas_payment_id: asaasPayment.id,
        status: 'pending'
      }).select().single();

      await supabase.from('payments').insert({
        order_id: order.id,
        asaas_id: asaasPayment.id,
        value: total,
        type: billingType,
        status: 'pending',
        payment_url: asaasPayment.invoiceUrl,
        qr_code_url: asaasPayment.qrcode
      });

      return new Response(JSON.stringify({ paymentUrl: asaasPayment.invoiceUrl, qrCode: asaasPayment.qrcode }), {
        headers: { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' }
      });
    } catch (error) {
      console.error(error);
      return new Response('Error creating payment', { status: 500 });
    }
  });

  async function fetchCustomerByEmail(email: string) {
    // Implemente GET /customers com filtro por email na Asaas
    // Exemplo: axios.get(`${ASAAS_BASE_URL}/customers?email=${email}`, { headers: { access_token: ACCESS_TOKEN } })
    return null; // Substitua por lógica real
  }
  ```
- **Deploy**: `supabase functions deploy asaas-create-payment --no-verify-jwt`.

**Edge Function 2: `asaas-webhook`**
- **Objetivo**: Processar eventos Asaas (ex.: `PAYMENT_RECEIVED`), atualizar banco, enviar e-mail com link de download.
- **Código** (em `supabase/functions/asaas-webhook/index.ts`):
  ```typescript
  import { serve } from 'https://deno.land/std@0.168.0/http/server.ts';
  import { createClient } from '@supabase/supabase-js';
  import { validateWebhookSignature } from '../utils/asaas-client.ts';

  const supabase = createClient(Deno.env.get('SUPABASE_URL')!, Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!);
  const WEBHOOK_SECRET = Deno.env.get('ASAAS_WEBHOOK_SECRET')!;

  serve(async (req) => {
    if (req.method === 'OPTIONS') return new Response('ok', { headers: { 'Access-Control-Allow-Origin': '*' } });

    try {
      const payload = await req.json();
      const signature = req.headers.get('x-signature') || '';

      if (!validateWebhookSignature(payload, signature, WEBHOOK_SECRET)) {
        return new Response('Invalid signature', { status: 400 });
      }

      const { event, data } = payload;
      if (event === 'PAYMENT_RECEIVED') {
        // Atualizar BD
        await supabase.from('payments').update({ status: 'confirmed', processed_at: new Date().toISOString() })
          .eq('asaas_id', data.id);
        await supabase.from('orders').update({ status: 'paid' }).eq('asaas_payment_id', data.id);

        // Gerar signed URL
        const { data: order } = await supabase.from('orders').select('product_id').eq('asaas_payment_id', data.id).single();
        const { data: product } = await supabase.from('products').select('file_url').eq('id', order.product_id).single();
        const { signedUrl } = await supabase.storage.from('products').createSignedUrl(product.file_url, 3600); // 1h

        // Enviar e-mail
        await fetch('https://api.resend.com/emails', {
          method: 'POST',
          headers: { 'Authorization': `Bearer ${Deno.env.get('RESEND_API_KEY')}`, 'Content-Type': 'application/json' },
          body: JSON.stringify({
            from: 'codegrana@exemplo.com',
            to: data.email,
            subject: `Download: ${product.name}`,
            html: `<p>Seu ${product.name} está disponível: <a href="${signedUrl}">Baixar</a></p>`
          })
        });
      }

      return new Response('OK', { status: 200 });
    } catch (error) {
      console.error(error);
      return new Response('Webhook error', { status: 500 });
    }
  });
  ```
- **Deploy**: `supabase functions deploy asaas-webhook --no-verify-jwt`.
- **Webhook Config**: No dashboard Asaas, configure o webhook para: `https://seu-projeto.supabase.co/functions/v1/asaas-webhook`.

**Variáveis de Ambiente** (em `supabase/.env`):
```
ASAAS_ACCESS_TOKEN=seu_token_sandbox
ASAAS_WEBHOOK_SECRET=seu_secret
SUPABASE_URL=sua_url
SUPABASE_SERVICE_ROLE_KEY=sua_key
RESEND_API_KEY=sua_key
```

#### 2. Atualizar o Frontend
Substitua a simulação no checkout por chamadas reais à Edge Function e adicione verificação de status.

**Checkout Component** (`src/components/Checkout.tsx`):
```tsx
import { useState, useEffect } from 'react';
import { createClient } from '@supabase/supabase-js';

const supabase = createClient('sua_url', 'sua_anon_key');

export default function Checkout({ productId, quantity = 1 }) {
  const [loading, setLoading] = useState(false);
  const [paymentUrl, setPaymentUrl] = useState('');
  const [qrCode, setQrCode] = useState('');

  const handleCheckout = async () => {
    setLoading(true);
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return alert('Faça login');

    try {
      const response = await fetch('https://seu-projeto.supabase.co/functions/v1/asaas-create-payment', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${user.access_token}` },
        body: JSON.stringify({ userEmail: user.email, productId, quantity, billingType: 'PIX' })
      });

      const { paymentUrl, qrCode } = await response.json();
      setPaymentUrl(paymentUrl);
      setQrCode(qrCode);
    } catch (error) {
      console.error('Checkout error:', error);
      alert('Erro ao processar pagamento');
    }
    setLoading(false);
  };

  // Polling para status
  useEffect(() => {
    if (!paymentUrl) return;
    const interval = setInterval(async () => {
      const { data: payment } = await supabase.from('payments').select('status').eq('payment_url', paymentUrl).single();
      if (payment?.status === 'confirmed') {
        alert('Pagamento confirmado! Verifique seu e-mail.');
        clearInterval(interval);
      }
    }, 5000);
    return () => clearInterval(interval);
  }, [paymentUrl]);

  return (
    <div className="p-4 bg-white rounded-lg shadow-md">
      <button
        onClick={handleCheckout}
        disabled={loading}
        className="bg-[#D4AF37] text-black px-4 py-2 rounded-full hover:scale-105 transition"
      >
        {loading ? 'Processando...' : 'Pagar Agora'}
      </button>
      {paymentUrl && (
        <div className="mt-4">
          <a href={paymentUrl} target="_blank" className="text-[#0071E3] underline">Pagar via Pix</a>
          {qrCode && <img src={`data:image/png;base64,${qrCode}`} alt="QR Code" className="mt-2 max-w-xs" />}
        </div>
      )}
    </div>
  );
}
```

**Carrinho Pop-up**:
- Atualize para chamar `handleCheckout` ao clicar em "Ir para Pagamentos".
- Adicione checkbox para upsell ("Adicione membership Bronze por +R$49") com `billingType: CREDIT_CARD` e recorrência.

**Área de Códigos**:
- Liste pedidos com status `paid` (query `orders` com RLS).
- Botões de download usam signed URLs do Supabase Storage.

#### 3. Configurações Asaas
- **Sandbox**: Crie uma conta em https://sandbox.asaas.com para testes.
- **Credenciais**: Gere `access_token` no dashboard Asaas (Configurações > Integrações).
- **Webhook**: Configure a URL `https://seu-projeto.supabase.co/functions/v1/asaas-webhook` e copie o `WEBHOOK_SECRET`.
- **Testes**: Use CPFs fictícios (ex.: 123.456.789-00) e Pix simulado no sandbox.

#### 4. Adicionar Logs e Testes
- **Logs**: Adicione `console.log` ou integre com Supabase Logs para rastrear erros (ex.: falha na validação do webhook).
- **Testes**:
  - Crie testes unitários com Deno (`deno test`).
  - Teste chamadas Asaas com Postman no sandbox.
  - Simule eventos de webhook com `curl` ou ngrok.

#### 5. Escalabilidade e Manutenibilidade
- **Escalabilidade**: Edge Functions são serverless, escalando automaticamente. Supabase Storage suporta arquivos grandes (ZIPs de códigos).
- **Manutenibilidade**:
  - Mantenha `asaas-client.ts` modular para reutilização.
  - Use TypeScript para tipos fortes (ex.: interfaces para payloads Asaas).
  - Documente endpoints no Supabase Dashboard.

#### 6. Fluxo Completo
1. Usuário adiciona produto ao carrinho (`localStorage`).
2. No checkout, frontend chama `asaas-create-payment` → Cria cliente/pagamento na Asaas → Salva order/payment no BD.
3. Usuário paga via link Pix/QR Code.
4. Webhook `asaas-webhook` recebe `PAYMENT_RECEIVED` → Atualiza BD → Envia e-mail com signed URL.
5. Usuário acessa Área de Códigos → Baixa arquivo via signed URL.

---

## Resumo: Você Está no Caminho Certo!
- **O que já está pronto**: Banco de dados robusto, frontend com design Apple Store, carrinho simulado, e código base para Asaas (`asaas-client.ts`).
- **O que falta**: Implementar Edge Functions (`asaas-create-payment`, `asaas-webhook`), substituir simulações no frontend, configurar webhooks no Asaas, e adicionar logs/testes.
- **Próximos Passos**:
  1. Deploy das Edge Functions com Supabase CLI.
  2. Testar no sandbox Asaas (Pix simulado, boleto fictício).
  3. Integrar Resend/SendGrid para e-mails.
  4. Adicionar polling/Realtime no frontend para status.
  5. Monitorar logs no Supabase Dashboard.

