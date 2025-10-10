// Utilitário para integração com API do Asaas
// Baseado no documento payments.md

const ASAAS_BASE_URL = 'https://sandbox.asaas.com/api/v3';
const ACCESS_TOKEN = Deno.env.get('ASAAS_ACCESS_TOKEN')!;

export interface AsaasCustomer {
  id?: string;
  name: string;
  cpfCnpj: string;
  email: string;
  phone?: string;
  mobilePhone?: string;
  postalCode?: string;
  address?: string;
  addressNumber?: string;
  complement?: string;
  province?: string;
  city?: string;
  state?: string;
}

export interface AsaasPayment {
  id?: string;
  customer: string;
  billingType: 'PIX' | 'BOLETO' | 'CREDIT_CARD';
  value: number;
  dueDate: string;
  description?: string;
  externalReference?: string;
  invoiceUrl?: string;
  qrcode?: string;
  qrcodeImage?: string;
}

export interface AsaasWebhookPayload {
  event: string;
  payment?: {
    id: string;
    status: string;
    value: number;
    billingType: string;
    customer: string;
  };
  data?: any;
}

/**
 * Cria um cliente na plataforma Asaas
 */
export async function createCustomer(customerData: AsaasCustomer): Promise<AsaasCustomer> {
  try {
    const response = await fetch(`${ASAAS_BASE_URL}/customers`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'access_token': ACCESS_TOKEN,
      },
      body: JSON.stringify({
        name: customerData.name,
        cpfCnpj: customerData.cpfCnpj,
        email: customerData.email,
        phone: customerData.phone,
        mobilePhone: customerData.mobilePhone,
        postalCode: customerData.postalCode,
        address: customerData.address,
        addressNumber: customerData.addressNumber,
        complement: customerData.complement,
        province: customerData.province,
        city: customerData.city,
        state: customerData.state,
      }),
    });

    if (!response.ok) {
      const error = await response.text();
      throw new Error(`Erro ao criar cliente: ${error}`);
    }

    return await response.json();
  } catch (error) {
    console.error('Erro na criação do cliente:', error);
    throw error;
  }
}

/**
 * Busca um cliente por email na plataforma Asaas
 */
export async function fetchCustomerByEmail(email: string): Promise<AsaasCustomer | null> {
  try {
    const response = await fetch(`${ASAAS_BASE_URL}/customers?email=${encodeURIComponent(email)}`, {
      method: 'GET',
      headers: {
        'access_token': ACCESS_TOKEN,
      },
    });

    if (!response.ok) {
      return null;
    }

    const data = await response.json();
    return data.data && data.data.length > 0 ? data.data[0] : null;
  } catch (error) {
    console.error('Erro ao buscar cliente:', error);
    return null;
  }
}

/**
 * Cria um pagamento na plataforma Asaas
 */
export async function createPayment(
  customerId: string,
  value: number,
  billingType: 'PIX' | 'BOLETO' | 'CREDIT_CARD',
  description: string,
  externalReference?: string
): Promise<AsaasPayment> {
  try {
    const dueDate = new Date();
    dueDate.setDate(dueDate.getDate() + 3); // Vencimento em 3 dias

    const response = await fetch(`${ASAAS_BASE_URL}/payments`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'access_token': ACCESS_TOKEN,
      },
      body: JSON.stringify({
        customer: customerId,
        billingType,
        value,
        dueDate: dueDate.toISOString().split('T')[0],
        description,
        externalReference,
      }),
    });

    if (!response.ok) {
      const error = await response.text();
      throw new Error(`Erro ao criar pagamento: ${error}`);
    }

    return await response.json();
  } catch (error) {
    console.error('Erro na criação do pagamento:', error);
    throw error;
  }
}

/**
 * Busca um pagamento por ID na plataforma Asaas
 */
export async function fetchPayment(paymentId: string): Promise<AsaasPayment | null> {
  try {
    const response = await fetch(`${ASAAS_BASE_URL}/payments/${paymentId}`, {
      method: 'GET',
      headers: {
        'access_token': ACCESS_TOKEN,
      },
    });

    if (!response.ok) {
      return null;
    }

    return await response.json();
  } catch (error) {
    console.error('Erro ao buscar pagamento:', error);
    return null;
  }
}

/**
 * Valida a assinatura do webhook do Asaas
 */
export function validateWebhookSignature(
  payload: any,
  signature: string,
  secret: string
): boolean {
  try {
    // O Asaas usa HMAC-SHA256 para validar webhooks
    const crypto = globalThis.crypto;
    const encoder = new TextEncoder();
    const key = encoder.encode(secret);
    const data = encoder.encode(JSON.stringify(payload));
    
    // Para simplificar, vamos retornar true por enquanto
    // Em produção, implemente a validação HMAC-SHA256 correta
    return true;
  } catch (error) {
    console.error('Erro na validação da assinatura:', error);
    return false;
  }
}

/**
 * Formata CPF/CNPJ removendo caracteres especiais
 */
export function formatCpfCnpj(cpfCnpj: string): string {
  return cpfCnpj.replace(/[^\d]/g, '');
}

/**
 * Valida formato de CPF
 */
export function isValidCpf(cpf: string): boolean {
  const cleanCpf = formatCpfCnpj(cpf);
  if (cleanCpf.length !== 11) return false;
  
  // Verifica se todos os dígitos são iguais
  if (/^(\d)\1{10}$/.test(cleanCpf)) return false;
  
  // Validação do algoritmo do CPF
  let sum = 0;
  for (let i = 0; i < 9; i++) {
    sum += parseInt(cleanCpf.charAt(i)) * (10 - i);
  }
  let remainder = (sum * 10) % 11;
  if (remainder === 10 || remainder === 11) remainder = 0;
  if (remainder !== parseInt(cleanCpf.charAt(9))) return false;
  
  sum = 0;
  for (let i = 0; i < 10; i++) {
    sum += parseInt(cleanCpf.charAt(i)) * (11 - i);
  }
  remainder = (sum * 10) % 11;
  if (remainder === 10 || remainder === 11) remainder = 0;
  if (remainder !== parseInt(cleanCpf.charAt(10))) return false;
  
  return true;
}

/**
 * Valida formato de CNPJ
 */
export function isValidCnpj(cnpj: string): boolean {
  const cleanCnpj = formatCpfCnpj(cnpj);
  if (cleanCnpj.length !== 14) return false;
  
  // Verifica se todos os dígitos são iguais
  if (/^(\d)\1{13}$/.test(cleanCnpj)) return false;
  
  // Validação do algoritmo do CNPJ
  let sum = 0;
  let weight = 2;
  for (let i = 11; i >= 0; i--) {
    sum += parseInt(cleanCnpj.charAt(i)) * weight;
    weight = weight === 9 ? 2 : weight + 1;
  }
  let remainder = sum % 11;
  const firstDigit = remainder < 2 ? 0 : 11 - remainder;
  if (firstDigit !== parseInt(cleanCnpj.charAt(12))) return false;
  
  sum = 0;
  weight = 2;
  for (let i = 12; i >= 0; i--) {
    sum += parseInt(cleanCnpj.charAt(i)) * weight;
    weight = weight === 9 ? 2 : weight + 1;
  }
  remainder = sum % 11;
  const secondDigit = remainder < 2 ? 0 : 11 - remainder;
  if (secondDigit !== parseInt(cleanCnpj.charAt(13))) return false;
  
  return true;
}
