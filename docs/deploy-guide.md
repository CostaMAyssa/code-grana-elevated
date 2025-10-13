# Guia de Deploy em Produção

Este guia contém as instruções para realizar o deploy completo do sistema de pagamentos em produção.

## 1. Deploy das Edge Functions

Para fazer o deploy das Edge Functions no Supabase, execute os seguintes comandos:

```bash
# Fazer login no Supabase
supabase login

# Deploy das funções
supabase functions deploy asaas-create-payment --no-verify-jwt
supabase functions deploy asaas-webhook --no-verify-jwt
```

> **Nota**: Certifique-se de que o Docker esteja em execução e que o projeto Supabase esteja ativo antes de executar estes comandos.

Você pode verificar o status das suas funções no Dashboard do Supabase:
[https://supabase.com/dashboard/project/ccfumesbuqjpxfuhupxp/functions](https://supabase.com/dashboard/project/ccfumesbuqjpxfuhupxp/functions)

### Atualização da CLI do Supabase

Recomendamos manter a CLI do Supabase sempre atualizada para ter acesso a novos recursos e correções de bugs:

```bash
# Para atualizar a CLI via npm
npm update supabase --save-dev

# Ou se estiver usando bun
bunx supabase update
```

Para mais informações sobre atualização da CLI, consulte a [documentação oficial](https://supabase.com/docs/guides/cli/getting-started#updating-the-supabase-cli).

## 2. Configuração de Secrets no Supabase

Configure as seguintes variáveis de ambiente no Supabase:

```bash
# Configurar secrets
supabase secrets set ASAAS_ACCESS_TOKEN=seu_token_aqui
supabase secrets set ASAAS_WEBHOOK_SECRET=seu_secret_aqui
supabase secrets set SUPABASE_SERVICE_ROLE_KEY=sua_chave_aqui
```

Alternativamente, você pode configurar estas variáveis pelo Dashboard do Supabase:
1. Acesse o Dashboard do Supabase
2. Navegue até "Settings" > "API"
3. Role até a seção "Project API keys"
4. Copie a "service_role key" para usar como SUPABASE_SERVICE_ROLE_KEY
5. Navegue até "Settings" > "Functions"
6. Adicione as variáveis de ambiente mencionadas acima

## 3. Configuração do Webhook no Asaas

1. Acesse o painel do Asaas
2. Navegue até "Configurações" > "Integrações" > "API"
3. Configure o webhook com a URL da sua função:
   ```
   https://ccfumesbuqjpxfuhupxp.supabase.co/functions/v1/asaas-webhook
   ```
4. Selecione os eventos a serem monitorados:
   - `PAYMENT_RECEIVED`
   - `PAYMENT_OVERDUE`
   - `PAYMENT_REFUNDED`
   - `PAYMENT_DELETED`

## 4. Testes em Ambiente Sandbox

Para testar o sistema completo:

1. Acesse o ambiente sandbox do Asaas
2. Crie um pagamento de teste através do seu site
3. Use o QR Code PIX gerado para simular um pagamento
4. Verifique se o webhook está recebendo os eventos corretamente
5. Confirme que o status do pagamento é atualizado no banco de dados

## 5. Monitoramento e Logs

Para monitorar as funções em produção:

```bash
# Visualizar logs das funções
supabase functions logs asaas-create-payment
supabase functions logs asaas-webhook
```

## 6. Troubleshooting

Se encontrar problemas durante o deploy:

1. Verifique se o Docker está em execução
2. Confirme que o projeto Supabase está ativo
3. Verifique as credenciais e permissões
4. Consulte os logs para identificar erros específicos

---

## Resumo do Sistema

O sistema de pagamentos implementado oferece:

- ✅ Integração completa com Asaas
- ✅ Geração de QR Code PIX
- ✅ Atualização automática de status via webhook
- ✅ Interface de usuário intuitiva
- ✅ Fluxo de checkout otimizado

Para qualquer dúvida adicional, consulte a documentação completa do projeto.