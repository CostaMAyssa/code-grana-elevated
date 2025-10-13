import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Download, Lock } from "lucide-react";
import { toast } from "sonner";

interface PurchasedProduct {
  id: string;
  name: string;
  image_url: string;
  file_url: string | null;
  order_status: string;
  payment_status: string;
}

export function MyProducts() {
  const [products, setProducts] = useState<PurchasedProduct[]>([]);
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    const loadUserProducts = async () => {
      try {
        const { data: { user } } = await supabase.auth.getUser();
        setUser(user);
        
        if (!user) {
          setLoading(false);
          return;
        }

        // Buscar produtos comprados com pagamentos confirmados
        const { data, error } = await supabase
          .from('orders')
          .select(`
            id,
            status,
            product_id,
            products (
              id,
              name,
              image_url,
              file_url
            ),
            payments (
              status
            )
          `)
          .eq('user_id', user.id)
          .eq('payments.status', 'CONFIRMED');

        if (error) throw error;

        // Mapear produtos
        const purchasedProducts = data
          ?.filter(order => order.products && order.payments?.some((p: any) => p.status === 'CONFIRMED'))
          .map(order => ({
            id: order.products.id,
            name: order.products.name,
            image_url: order.products.image_url,
            file_url: order.products.file_url,
            order_status: order.status,
            payment_status: 'CONFIRMED'
          })) || [];

        setProducts(purchasedProducts);
      } catch (error: any) {
        console.error('Erro ao carregar produtos:', error);
        toast.error('Erro ao carregar seus produtos');
      } finally {
        setLoading(false);
      }
    };

    loadUserProducts();
  }, []);

  if (loading) {
    return (
      <div className="bg-[#f8f9fb] rounded-xl p-8 md:p-12 mb-16 animate-fade-in">
        <h2 
          className="text-[clamp(1.8rem,3vw,2.5rem)] font-semibold tracking-tight mb-8 text-center"
          style={{ letterSpacing: '-0.02em', color: '#0D0D1A' }}
        >
          Meus Produtos
        </h2>
        <p className="text-center" style={{ color: '#6e6e73' }}>Carregando...</p>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="bg-[#f8f9fb] rounded-xl p-8 md:p-12 mb-16 animate-fade-in">
        <h2 
          className="text-[clamp(1.8rem,3vw,2.5rem)] font-semibold tracking-tight mb-4 text-center"
          style={{ letterSpacing: '-0.02em', color: '#0D0D1A' }}
        >
          Meus Produtos
        </h2>
        <div className="text-center">
          <Lock className="w-16 h-16 mx-auto mb-4" style={{ color: '#6e6e73' }} />
          <p className="mb-4" style={{ color: '#6e6e73' }}>
            Faça login para ver seus produtos
          </p>
        </div>
      </div>
    );
  }

  if (products.length === 0) {
    return (
      <div className="bg-[#f8f9fb] rounded-xl p-8 md:p-12 mb-16 animate-fade-in">
        <h2 
          className="text-[clamp(1.8rem,3vw,2.5rem)] font-semibold tracking-tight mb-4 text-center"
          style={{ letterSpacing: '-0.02em', color: '#0D0D1A' }}
        >
          Meus Produtos
        </h2>
        <p className="text-center" style={{ color: '#6e6e73' }}>
          Você ainda não possui produtos. Explore nossa loja!
        </p>
        <div className="flex justify-center mt-6">
          <Button 
            variant="default"
            className="bg-[#0D0D1A] hover:bg-[#111122] text-white"
            style={{ letterSpacing: '0.03em' }}
            asChild
          >
            <a href="/produtos">Ver Produtos</a>
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-[#f8f9fb] rounded-xl p-8 md:p-12 mb-16 animate-fade-in">
      <h2 
        className="text-[clamp(1.8rem,3vw,2.5rem)] font-semibold tracking-tight mb-8 text-center"
        style={{ letterSpacing: '-0.02em', color: '#0D0D1A' }}
      >
        Meus Produtos
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {products.map((product) => (
          <div
            key={product.id}
            className="bg-card rounded-lg p-6 shadow-card hover:shadow-card-hover transition-all duration-300"
          >
            <div className="aspect-video rounded-lg mb-4 overflow-hidden">
              <img 
                src={product.image_url} 
                alt={product.name}
                className="w-full h-full object-cover"
              />
            </div>
            <h3 className="font-semibold mb-4" style={{ color: '#0D0D1A' }}>
              {product.name}
            </h3>
            <Button
              className="w-full bg-[#0D0D1A] hover:bg-[#111122] text-white"
              style={{ letterSpacing: '0.03em' }}
              onClick={() => {
                if (product.file_url) {
                  window.open(product.file_url, '_blank');
                } else {
                  toast.info('Link de download será enviado em breve');
                }
              }}
            >
              <Download className="w-4 h-4 mr-2" />
              Baixar
            </Button>
          </div>
        ))}
      </div>
    </div>
  );
}
