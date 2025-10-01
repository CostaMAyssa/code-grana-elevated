import { Button } from "@/components/ui/button";
import { Trash2, ShoppingBag } from "lucide-react";
import { useCart } from "@/hooks/useCart";
import { toast } from "sonner";

export default function Cart() {
  const { items, removeItem, updateQuantity, total } = useCart();

  const handleRemove = (id: string, name: string) => {
    removeItem(id);
    toast.success(`${name} removido do carrinho`);
  };

  if (items.length === 0) {
    return (
      <div className="min-h-screen pt-24 pb-16 bg-secondary/30">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="max-w-4xl mx-auto">
            <div className="flex flex-col items-center justify-center py-20 animate-fade-in">
              <ShoppingBag className="w-24 h-24 text-muted-foreground mb-6" />
              <h1 className="text-3xl font-semibold mb-3">
                Seu carrinho está vazio
              </h1>
              <p className="text-muted-foreground mb-8">
                Explore nossos serviços e adicione itens ao carrinho
              </p>
              <Button variant="apple" size="lg" asChild>
                <a href="/produtos">Ver Serviços</a>
              </Button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-24 pb-16 bg-secondary/30">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="max-w-5xl mx-auto">
          {/* Header */}
          <div className="mb-12 animate-fade-in">
            <h1 className="text-4xl md:text-5xl font-semibold mb-2 tracking-tight">
              Carrinho de Compras
            </h1>
            <p className="text-muted-foreground">
              {items.length} {items.length === 1 ? "item" : "itens"} no carrinho
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Cart Items */}
            <div className="lg:col-span-2 space-y-4 animate-fade-in">
              {items.map((item) => (
                <div
                  key={item.id}
                  className="bg-card rounded-2xl p-6 shadow-card hover:shadow-card-hover transition-shadow"
                >
                  <div className="flex gap-6">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-32 h-32 object-cover rounded-xl"
                    />
                    <div className="flex-1">
                      <h3 className="text-xl font-semibold mb-2">
                        {item.name}
                      </h3>
                      <p className="text-2xl font-semibold text-accent mb-4">
                        R$ {item.price.toFixed(2)}
                      </p>
                      <div className="flex items-center gap-4">
                        <div className="flex items-center gap-3 bg-secondary rounded-lg p-1">
                          <button
                            onClick={() =>
                              updateQuantity(item.id, item.quantity - 1)
                            }
                            className="w-8 h-8 flex items-center justify-center hover:bg-background rounded transition-colors"
                          >
                            −
                          </button>
                          <span className="w-8 text-center font-medium">
                            {item.quantity}
                          </span>
                          <button
                            onClick={() =>
                              updateQuantity(item.id, item.quantity + 1)
                            }
                            className="w-8 h-8 flex items-center justify-center hover:bg-background rounded transition-colors"
                          >
                            +
                          </button>
                        </div>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleRemove(item.id, item.name)}
                        >
                          <Trash2 className="w-4 h-4 mr-2" />
                          Remover
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Order Summary */}
            <div className="lg:col-span-1">
              <div className="bg-card rounded-2xl p-8 shadow-card sticky top-24 animate-fade-in">
                <h2 className="text-2xl font-semibold mb-6">Resumo do Pedido</h2>
                
                <div className="space-y-4 mb-6">
                  <div className="flex justify-between text-muted-foreground">
                    <span>Subtotal</span>
                    <span>R$ {total.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-muted-foreground">
                    <span>Desconto</span>
                    <span>R$ 0,00</span>
                  </div>
                  <div className="pt-4 border-t border-border">
                    <div className="flex justify-between text-2xl font-semibold">
                      <span>Total</span>
                      <span>R$ {total.toFixed(2)}</span>
                    </div>
                  </div>
                </div>

                <Button variant="apple" size="lg" className="w-full mb-4" asChild>
                  <a href="/checkout">Finalizar Compra</a>
                </Button>
                
                <Button variant="outline" className="w-full" asChild>
                  <a href="/produtos">Continuar Comprando</a>
                </Button>

                <div className="mt-6 pt-6 border-t border-border">
                  <p className="text-sm text-muted-foreground text-center">
                    Pagamento seguro via Stripe
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
