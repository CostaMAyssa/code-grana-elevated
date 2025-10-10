import { serve } from 'https://deno.land/std@0.168.0/http/server.ts';
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2';
import { validateWebhookSignature } from './asaas-client.ts';

const supabase = createClient(
  Deno.env.get('SUPABASE_URL')!,
  Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!
);

const WEBHOOK_SECRET = Deno.env.get('ASAAS_WEBHOOK_SECRET')!;

interface AsaasWebhookPayload {
  event: string;
  payment?: {
    id: string;
    status: string;
    value: number;
    billingType: string;
    customer: string;
    invoiceUrl?: string;
    qrcode?: string;
    qrcodeImage?: string;
  };
  data?: any;
}

serve(async (req) => {
  // Configurar CORS
  if (req.method === 'OPTIONS') {
    return new Response('ok', {
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type, x-signature',
        'Access-Control-Allow-Methods': 'POST, OPTIONS',
      },
    });
  }

  if (req.method !== 'POST') {
    return new Response('Method not allowed', { 
      status: 405,
      headers: { 'Access-Control-Allow-Origin': '*' }
    });
  }

  try {
    const payload: AsaasWebhookPayload = await req.json();
    const signature = req.headers.get('x-signature') || '';

    console.log('Webhook recebido:', payload.event, payload.payment?.id);

    // Validar assinatura do webhook
    if (!validateWebhookSignature(payload, signature, WEBHOOK_SECRET)) {
      console.error('Assinatura do webhook inválida');
      return new Response('Invalid signature', { 
        status: 400,
        headers: { 'Access-Control-Allow-Origin': '*' }
      });
    }

    const { event, payment } = payload;

    if (!payment) {
      console.log('Webhook sem dados de pagamento');
      return new Response('OK', { 
        status: 200,
        headers: { 'Access-Control-Allow-Origin': '*' }
      });
    }

    // Processar diferentes tipos de eventos
    switch (event) {
      case 'PAYMENT_RECEIVED':
        await handlePaymentReceived(payment);
        break;
      
      case 'PAYMENT_OVERDUE':
        await handlePaymentOverdue(payment);
        break;
      
      case 'PAYMENT_REFUNDED':
        await handlePaymentRefunded(payment);
        break;
      
      case 'PAYMENT_DELETED':
        await handlePaymentDeleted(payment);
        break;
      
      default:
        console.log('Evento não processado:', event);
    }

    return new Response('OK', { 
      status: 200,
      headers: { 'Access-Control-Allow-Origin': '*' }
    });

  } catch (error) {
    console.error('Erro no webhook:', error);
    return new Response('Webhook error', { 
      status: 500,
      headers: { 'Access-Control-Allow-Origin': '*' }
    });
  }
});

/**
 * Processa pagamento confirmado
 */
async function handlePaymentReceived(payment: any) {
  try {
    console.log('Processando pagamento confirmado:', payment.id);

    // Atualizar status do pagamento
    const { error: paymentError } = await supabase
      .from('payments')
      .update({ 
        status: 'confirmed', 
        processed_at: new Date().toISOString() 
      })
      .eq('asaas_id', payment.id);

    if (paymentError) {
      console.error('Erro ao atualizar pagamento:', paymentError);
      return;
    }

    // Atualizar status do pedido
    const { error: orderError } = await supabase
      .from('orders')
      .update({ status: 'paid' })
      .eq('asaas_payment_id', payment.id);

    if (orderError) {
      console.error('Erro ao atualizar pedido:', orderError);
      return;
    }

    // Buscar dados do pedido e produto
    const { data: order, error: orderFetchError } = await supabase
      .from('orders')
      .select(`
        id,
        user_id,
        product_id,
        quantity,
        total,
        profiles!orders_user_id_fkey(email, full_name),
        products!orders_product_id_fkey(name, file_url, description)
      `)
      .eq('asaas_payment_id', payment.id)
      .single();

    if (orderFetchError || !order) {
      console.error('Erro ao buscar pedido:', orderFetchError);
      return;
    }

    console.log('Pedido encontrado:', order.id);

    // Enviar e-mail de confirmação (se configurado)
    await sendConfirmationEmail(order);

    console.log('Pagamento processado com sucesso:', payment.id);

  } catch (error) {
    console.error('Erro ao processar pagamento confirmado:', error);
  }
}

/**
 * Processa pagamento vencido
 */
async function handlePaymentOverdue(payment: any) {
  try {
    console.log('Processando pagamento vencido:', payment.id);

    const { error: paymentError } = await supabase
      .from('payments')
      .update({ status: 'overdue' })
      .eq('asaas_id', payment.id);

    if (paymentError) {
      console.error('Erro ao atualizar pagamento vencido:', paymentError);
    }

  } catch (error) {
    console.error('Erro ao processar pagamento vencido:', error);
  }
}

/**
 * Processa pagamento estornado
 */
async function handlePaymentRefunded(payment: any) {
  try {
    console.log('Processando pagamento estornado:', payment.id);

    const { error: paymentError } = await supabase
      .from('payments')
      .update({ status: 'refunded' })
      .eq('asaas_id', payment.id);

    if (paymentError) {
      console.error('Erro ao atualizar pagamento estornado:', paymentError);
      return;
    }

    const { error: orderError } = await supabase
      .from('orders')
      .update({ status: 'refunded' })
      .eq('asaas_payment_id', payment.id);

    if (orderError) {
      console.error('Erro ao atualizar pedido estornado:', orderError);
    }

  } catch (error) {
    console.error('Erro ao processar pagamento estornado:', error);
  }
}

/**
 * Processa pagamento deletado
 */
async function handlePaymentDeleted(payment: any) {
  try {
    console.log('Processando pagamento deletado:', payment.id);

    const { error: paymentError } = await supabase
      .from('payments')
      .update({ status: 'cancelled' })
      .eq('asaas_id', payment.id);

    if (paymentError) {
      console.error('Erro ao atualizar pagamento deletado:', paymentError);
      return;
    }

    const { error: orderError } = await supabase
      .from('orders')
      .update({ status: 'cancelled' })
      .eq('asaas_payment_id', payment.id);

    if (orderError) {
      console.error('Erro ao atualizar pedido deletado:', orderError);
    }

  } catch (error) {
    console.error('Erro ao processar pagamento deletado:', error);
  }
}

/**
 * Envia e-mail de confirmação com link de download
 */
async function sendConfirmationEmail(order: any) {
  try {
    const userEmail = order.profiles?.email;
    const userName = order.profiles?.full_name || 'Cliente';
    const productName = order.products?.name;
    const productFileUrl = order.products?.file_url;

    if (!userEmail || !productName) {
      console.log('Dados insuficientes para enviar e-mail');
      return;
    }

    // Se não há arquivo para download, apenas confirma a compra
    if (!productFileUrl) {
      console.log('Produto sem arquivo para download');
      return;
    }

    // Gerar signed URL para download (válida por 24 horas)
    const { data: signedUrlData, error: urlError } = await supabase.storage
      .from('products')
      .createSignedUrl(productFileUrl, 24 * 60 * 60); // 24 horas

    if (urlError || !signedUrlData) {
      console.error('Erro ao gerar URL de download:', urlError);
      return;
    }

    const downloadUrl = signedUrlData.signedUrl;

    // Enviar e-mail usando Resend (se configurado)
    const resendApiKey = Deno.env.get('RESEND_API_KEY');
    if (resendApiKey) {
      const emailData = {
        from: 'CodeGrana <noreply@codegrana.com>',
        to: [userEmail],
        subject: `✅ Compra confirmada: ${productName}`,
        html: `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
            <h2 style="color: #D4AF37;">Compra Confirmada!</h2>
            <p>Olá ${userName},</p>
            <p>Sua compra foi processada com sucesso!</p>
            
            <div style="background: #f5f5f7; padding: 20px; border-radius: 8px; margin: 20px 0;">
              <h3 style="margin-top: 0;">Detalhes da Compra</h3>
              <p><strong>Produto:</strong> ${productName}</p>
              <p><strong>Quantidade:</strong> ${order.quantity}</p>
              <p><strong>Valor Total:</strong> R$ ${order.total.toFixed(2)}</p>
            </div>
            
            <div style="text-align: center; margin: 30px 0;">
              <a href="${downloadUrl}" 
                 style="background: #D4AF37; color: #000; padding: 15px 30px; text-decoration: none; border-radius: 25px; font-weight: bold; display: inline-block;">
                📥 Baixar Agora
              </a>
            </div>
            
            <p style="color: #666; font-size: 14px;">
              <strong>Importante:</strong> Este link é válido por 24 horas. 
              Você também pode acessar seus downloads na sua área de cliente.
            </p>
            
            <hr style="border: none; border-top: 1px solid #eee; margin: 30px 0;">
            <p style="color: #999; font-size: 12px; text-align: center;">
              CodeGrana - Códigos e Automações Premium<br>
              Se você tem alguma dúvida, entre em contato conosco.
            </p>
          </div>
        `
      };

      const response = await fetch('https://api.resend.com/emails', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${resendApiKey}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(emailData),
      });

      if (response.ok) {
        console.log('E-mail de confirmação enviado para:', userEmail);
      } else {
        console.error('Erro ao enviar e-mail:', await response.text());
      }
    } else {
      console.log('RESEND_API_KEY não configurada, e-mail não enviado');
    }

  } catch (error) {
    console.error('Erro ao enviar e-mail de confirmação:', error);
  }
}
