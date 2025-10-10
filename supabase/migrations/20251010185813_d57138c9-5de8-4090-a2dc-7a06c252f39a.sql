-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Create products table
CREATE TABLE IF NOT EXISTS public.products (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL,
  price DECIMAL(10,2) NOT NULL,
  description TEXT,
  file_url TEXT,
  category TEXT NOT NULL,
  image_url TEXT,
  youtube_video_id TEXT,
  features JSONB DEFAULT '[]'::jsonb,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable RLS on products (public read)
ALTER TABLE public.products ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Anyone can view products" ON public.products;
CREATE POLICY "Anyone can view products"
  ON public.products FOR SELECT
  USING (true);

-- Create orders table
CREATE TABLE IF NOT EXISTS public.orders (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  product_id UUID NOT NULL REFERENCES public.products(id),
  quantity INTEGER DEFAULT 1 CHECK (quantity > 0),
  total DECIMAL(10,2) NOT NULL,
  status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'paid', 'cancelled', 'refunded')),
  asaas_payment_id TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable RLS on orders
ALTER TABLE public.orders ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Users can view own orders" ON public.orders;
CREATE POLICY "Users can view own orders"
  ON public.orders FOR SELECT
  USING (auth.uid() = user_id);

DROP POLICY IF EXISTS "Users can create own orders" ON public.orders;
CREATE POLICY "Users can create own orders"
  ON public.orders FOR INSERT
  WITH CHECK (auth.uid() = user_id);

-- Create payments table
CREATE TABLE IF NOT EXISTS public.payments (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  order_id UUID NOT NULL REFERENCES public.orders(id) ON DELETE CASCADE,
  asaas_id TEXT UNIQUE NOT NULL,
  status TEXT NOT NULL CHECK (status IN ('pending', 'confirmed', 'received', 'overdue', 'refunded')),
  value DECIMAL(10,2) NOT NULL,
  billing_type TEXT NOT NULL CHECK (billing_type IN ('PIX', 'BOLETO', 'CREDIT_CARD')),
  payment_url TEXT,
  qr_code_url TEXT,
  processed_at TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable RLS on payments
ALTER TABLE public.payments ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Users can view own payments" ON public.payments;
CREATE POLICY "Users can view own payments"
  ON public.payments FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM public.orders
      WHERE orders.id = payments.order_id
      AND orders.user_id = auth.uid()
    )
  );

-- Create trigger function for updated_at
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Add triggers for updated_at
DROP TRIGGER IF EXISTS update_products_updated_at ON public.products;
CREATE TRIGGER update_products_updated_at
  BEFORE UPDATE ON public.products
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

DROP TRIGGER IF EXISTS update_orders_updated_at ON public.orders;
CREATE TRIGGER update_orders_updated_at
  BEFORE UPDATE ON public.orders
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

DROP TRIGGER IF EXISTS update_payments_updated_at ON public.payments;
CREATE TRIGGER update_payments_updated_at
  BEFORE UPDATE ON public.payments
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

-- Insert initial products (only if not exist)
INSERT INTO public.products (name, price, description, category, image_url, youtube_video_id, features)
SELECT * FROM (VALUES
  ('Kit Fluxos N8N Avançado', 297.00, 'Automação IA com licenças oficiais. Economize meses de desenvolvimento.', 'automacao', '/src/assets/product-n8n.jpg', 'dQw4w9WgXcQ', '["50+ fluxos prontos", "Integração com OpenAI", "Documentação completa"]'::jsonb),
  ('ERP PHP com IA', 497.00, 'PDV no navegador com 10+ módulos integrados e inteligência artificial.', 'erp', '/src/assets/product-erp.jpg', 'dQw4w9WgXcQ', '["10+ módulos", "PDV integrado", "Relatórios com IA"]'::jsonb),
  ('FastAutomation Delivery', 397.00, 'Sistema de entrega com IA para otimização de rotas em tempo real.', 'automacao', '/src/assets/product-delivery.jpg', 'dQw4w9WgXcQ', '["Rotas otimizadas", "App mobile", "Dashboard admin"]'::jsonb),
  ('Templates React/Tailwind para Apps IA', 197.00, 'Landings prontas e modernas para suas aplicações de IA.', 'templates', '/src/assets/product-templates.jpg', 'dQw4w9WgXcQ', '["10+ templates", "Totalmente responsivo", "Dark mode"]'::jsonb),
  ('Bot Discord Customizável', 97.00, 'Script para automação completa de servidores Discord.', 'automacao', '/src/assets/product-bot.jpg', 'dQw4w9WgXcQ', '["Moderação automática", "Comandos custom", "Dashboard web"]'::jsonb)
) AS v(name, price, description, category, image_url, youtube_video_id, features)
WHERE NOT EXISTS (SELECT 1 FROM public.products LIMIT 1);