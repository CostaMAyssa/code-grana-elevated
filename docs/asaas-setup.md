# Configuração do Sistema de Pagamentos Asaas

## Variáveis de Ambiente Necessárias

### Supabase Edge Functions
Configure as seguintes variáveis no dashboard do Supabase (Settings > Edge Functions > Environment Variables):

```bash
# Configurações do Asaas
ASAAS_ACCESS_TOKEN=your_asaas_access_token_here
ASAAS_WEBHOOK_SECRET=your_webhook_secret_here

# Configurações do Supabase
SUPABASE_URL=your_supabase_url_here
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key_here

# Configurações de E-mail (opcional)
RESEND_API_KEY=your_resend_api_key_here
```

### Frontend (.env.local)
```bash
VITE_SUPABASE_URL=your_supabase_url_here
VITE_SUPABASE_ANON_KEY=your_anon_key_here
```

## Configuração do Asaas

### 1. Criar Conta no Asaas
1. Acesse https://sandbox.asaas.com para testes
2. Crie uma conta de desenvolvedor
3. Acesse o dashboard e vá em "Configurações > Integrações"
4. Gere seu `access_token`

### 2. Configurar Webhook
1. No dashboard do Asaas, vá em "Configurações > Webhooks"
2. Adicione a URL: `https://seu-projeto.supabase.co/functions/v1/asaas-webhook`
3. Selecione os eventos:
   - PAYMENT_RECEIVED
   - PAYMENT_OVERDUE
   - PAYMENT_REFUNDED
   - PAYMENT_DELETED
4. Copie o `webhook_secret` gerado

### 3. Deploy das Edge Functions
```bash
# Instalar Supabase CLI
npm install -g supabase

# Login no Supabase
supabase login

# Deploy das funções
supabase functions deploy asaas-create-payment --no-verify-jwt
supabase functions deploy asaas-webhook --no-verify-jwt
```

## Testando a Integração

### 1. Dados de Teste
Use os seguintes dados para testes no sandbox:

**CPF de Teste:**
- 123.456.789-00
- 111.111.111-11

**Email de Teste:**
- test@example.com

### 2. Fluxo de Teste
1. Adicione um produto ao carrinho
2. Vá para o checkout
3. Preencha os dados do cliente
4. Selecione PIX como forma de pagamento
5. Clique em "Finalizar Compra"
6. Use o QR Code ou link gerado para simular o pagamento
7. Verifique se o webhook atualiza o status

### 3. Verificação
- Verifique os logs das Edge Functions no dashboard do Supabase
- Confirme se o pedido foi criado na tabela `orders`
- Verifique se o pagamento foi registrado na tabela `payments`
- Teste o webhook com dados simulados

## Estrutura de Dados

### Tabela `orders`
- `asaas_payment_id`: ID do pagamento no Asaas
- `status`: pending, paid, cancelled, refunded

### Tabela `payments`
- `asaas_id`: ID único do pagamento no Asaas
- `billing_type`: PIX, BOLETO, CREDIT_CARD
- `status`: pending, confirmed, received, overdue, refunded
- `payment_url`: URL para pagamento
- `qr_code_url`: URL do QR Code (PIX)

## Troubleshooting

### Erro: "Invalid signature"
- Verifique se o `ASAAS_WEBHOOK_SECRET` está correto
- Confirme se a URL do webhook está configurada corretamente no Asaas

### Erro: "Customer not found"
- Verifique se o usuário está logado
- Confirme se o perfil do usuário tem CPF/CNPJ preenchido

### Erro: "Product not found"
- Verifique se o produto existe na tabela `products`
- Confirme se o ID do produto está correto

### Pagamento não confirma automaticamente
- Verifique se o webhook está funcionando
- Confirme se os logs mostram erros
- Teste manualmente o webhook com curl

## Próximos Passos

1. **Configurar E-mail**: Integrar Resend ou SendGrid para envio de e-mails
2. **Adicionar Logs**: Implementar sistema de logs mais robusto
3. **Testes Automatizados**: Criar testes para as Edge Functions
4. **Monitoramento**: Configurar alertas para falhas de pagamento
5. **Backup**: Implementar backup dos dados de pagamento
