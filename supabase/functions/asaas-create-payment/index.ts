import { serve } from 'https://deno.land/std@0.168.0/http/server.ts';
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2';
import { 
  createCustomer, 
  fetchCustomerByEmail, 
  createPayment,
  formatCpfCnpj,
  isValidCpf,
  isValidCnpj,
  type AsaasCustomer,
  type AsaasPayment
} from './asaas-client.ts';

const supabase = createClient(
  Deno.env.get('SUPABASE_URL')!,
  Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!
);

interface CreatePaymentRequest {
  userEmail: string;
  productId: string;
  quantity: number;
  billingType: 'PIX' | 'BOLETO' | 'CREDIT_CARD';
  customerData?: {
    name: string;
    cpfCnpj: string;
    phone?: string;
    address?: string;
    city?: string;
    state?: string;
    postalCode?: string;
  };
}

interface CreatePaymentResponse {
  success: boolean;
  paymentUrl?: string;
  qrCode?: string;
  qrCodeImage?: string;
  error?: string;
  orderId?: string;
  paymentId?: string;
}

serve(async (req) => {
  // Configurar CORS
  if (req.method === 'OPTIONS') {
    return new Response('ok', {
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
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
    const { userEmail, productId, quantity, billingType, customerData }: CreatePaymentRequest = await req.json();

    // Validar dados obrigatórios
    if (!userEmail || !productId || !quantity || !billingType) {
      return new Response(JSON.stringify({
        success: false,
        error: 'Dados obrigatórios não fornecidos'
      }), {
        status: 400,
        headers: { 
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*'
        }
      });
    }

    // Buscar produto
    const { data: product, error: productError } = await supabase
      .from('products')
      .select('*')
      .eq('id', productId)
      .single();

    if (productError || !product) {
      return new Response(JSON.stringify({
        success: false,
        error: 'Produto não encontrado'
      }), {
        status: 404,
        headers: { 
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*'
        }
      });
    }

    const total = product.price * quantity;

    // Buscar dados do usuário no banco
    const { data: user, error: userError } = await supabase
      .from('profiles')
      .select('*')
      .eq('email', userEmail)
      .single();

    if (userError || !user) {
      return new Response(JSON.stringify({
        success: false,
        error: 'Usuário não encontrado. Faça login primeiro.'
      }), {
        status: 404,
        headers: { 
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*'
        }
      });
    }

    // Buscar ou criar cliente
    let customerId: string;
    
    // Primeiro, tentar buscar cliente existente
    const existingCustomer = await fetchCustomerByEmail(userEmail);
    
    if (existingCustomer) {
      customerId = existingCustomer.id!;
      console.log('Cliente existente encontrado:', customerId);
    } else {

      // Validar CPF/CNPJ se fornecido
      let cpfCnpj = customerData?.cpfCnpj || user.cpf_cnpj;
      if (!cpfCnpj) {
        return new Response(JSON.stringify({
          success: false,
          error: 'CPF/CNPJ é obrigatório para pagamentos'
        }), {
          status: 400,
          headers: { 
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*'
          }
        });
      }

      // Formatar e validar CPF/CNPJ
      const cleanCpfCnpj = formatCpfCnpj(cpfCnpj);
      const isValid = cleanCpfCnpj.length === 11 ? isValidCpf(cleanCpfCnpj) : isValidCnpj(cleanCpfCnpj);
      
      if (!isValid) {
        return new Response(JSON.stringify({
          success: false,
          error: 'CPF/CNPJ inválido'
        }), {
          status: 400,
          headers: { 
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*'
          }
        });
      }

      // Criar cliente na Asaas
      const customerDataForAsaas: AsaasCustomer = {
        name: customerData?.name || user.full_name || userEmail.split('@')[0],
        cpfCnpj: cleanCpfCnpj,
        email: userEmail,
        phone: customerData?.phone || user.phone,
        address: customerData?.address || user.address,
        city: customerData?.city || user.city,
        state: customerData?.state || user.state,
        postalCode: customerData?.postalCode || user.postal_code,
      };

      const newCustomer = await createCustomer(customerDataForAsaas);
      customerId = newCustomer.id!;
      console.log('Novo cliente criado:', customerId);
    }

    // Criar pagamento na Asaas
    const externalReference = `order_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
    const asaasPayment = await createPayment(
      customerId,
      total,
      billingType,
      `Compra: ${product.name} (${quantity}x)`,
      externalReference
    );

    console.log('Pagamento criado na Asaas:', asaasPayment.id);

    // Criar pedido no banco
    const { data: order, error: orderError } = await supabase
      .from('orders')
      .insert({
        user_id: user.id,
        product_id: productId,
        quantity,
        total,
        asaas_payment_id: asaasPayment.id,
        status: 'pending'
      })
      .select()
      .single();

    if (orderError) {
      console.error('Erro ao criar pedido:', orderError);
      return new Response(JSON.stringify({
        success: false,
        error: 'Erro ao criar pedido'
      }), {
        status: 500,
        headers: { 
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*'
        }
      });
    }

    // Criar registro de pagamento
    const { error: paymentError } = await supabase
      .from('payments')
      .insert({
        order_id: order.id,
        asaas_id: asaasPayment.id!,
        value: total,
        billing_type: billingType,
        status: 'pending',
        payment_url: asaasPayment.invoiceUrl,
        qr_code_url: asaasPayment.qrcodeImage || asaasPayment.qrcode,
      });

    if (paymentError) {
      console.error('Erro ao criar pagamento:', paymentError);
      return new Response(JSON.stringify({
        success: false,
        error: 'Erro ao criar registro de pagamento'
      }), {
        status: 500,
        headers: { 
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*'
        }
      });
    }

    const response: CreatePaymentResponse = {
      success: true,
      paymentUrl: asaasPayment.invoiceUrl,
      qrCode: asaasPayment.qrcode,
      qrCodeImage: asaasPayment.qrcodeImage,
      orderId: order.id,
      paymentId: asaasPayment.id,
    };

    return new Response(JSON.stringify(response), {
      headers: { 
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*'
      }
    });

  } catch (error) {
    console.error('Erro na criação do pagamento:', error);
    
    const response: CreatePaymentResponse = {
      success: false,
      error: error instanceof Error ? error.message : 'Erro interno do servidor'
    };

    return new Response(JSON.stringify(response), {
      status: 500,
      headers: { 
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*'
      }
    });
  }
});
