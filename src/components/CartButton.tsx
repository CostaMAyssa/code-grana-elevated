import { ShoppingCart, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { toast } from "sonner";
import { useCart } from "@/contexts/CartContext";
import { useNavigate } from "react-router-dom";

export const CartButton = () => {
  const { cartItems, isOpen, removeItem, openCart, closeCart, total } = useCart();
  const navigate = useNavigate();

  const handleRemoveItem = (id: string) => {
    removeItem(id);
    toast.success("Item removido do carrinho");
  };

  const handleCheckout = () => {
    toast.success("Redirecionando para pagamento...");
    closeCart();
    // Aqui você pode adicionar a navegação para página de pagamento
  };

  const handleContinueShopping = () => {
    closeCart();
    navigate("/produtos");
  };

  return (
    <Sheet open={isOpen} onOpenChange={closeCart}>
      <SheetTrigger asChild>
        <Button
          variant="default"
          size="icon"
          className="fixed bottom-6 right-6 w-14 h-14 rounded-full bg-[#0D0D1A] hover:bg-[#111122] text-white shadow-lg z-40"
          onClick={openCart}
        >
          <ShoppingCart className="w-6 h-6" />
          {cartItems.length > 0 && (
            <span 
              className="absolute -top-2 -right-2 w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold"
              style={{ backgroundColor: '#0D0D1A', color: 'white' }}
            >
              {cartItems.length}
            </span>
          )}
        </Button>
      </SheetTrigger>
      <SheetContent className="w-full sm:max-w-lg">
        <SheetHeader>
          <SheetTitle 
            className="text-[1.8rem] font-semibold tracking-tight"
            style={{ letterSpacing: '-0.01em', color: '#0D0D1A' }}
          >
            Seu Carrinho
          </SheetTitle>
        </SheetHeader>
        <div className="mt-8 flex flex-col h-full">
          {cartItems.length === 0 ? (
            <div className="flex-1 flex items-center justify-center">
              <div className="text-center">
                <ShoppingCart className="w-16 h-16 mx-auto mb-4 text-muted-foreground" />
                <p className="text-muted-foreground">Seu carrinho está vazio</p>
              </div>
            </div>
          ) : (
            <>
              <div className="flex-1 overflow-auto space-y-4">
                {cartItems.map((item) => (
                  <div
                    key={item.id}
                    className="flex items-center gap-4 p-4 bg-card rounded-lg shadow-card"
                  >
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-20 h-20 object-cover rounded"
                    />
                    <div className="flex-1">
                      <h4 
                        className="font-semibold text-[1.1rem]"
                        style={{ color: '#0D0D1A' }}
                      >
                        {item.name}
                      </h4>
                      <p 
                        className="font-semibold text-[1rem]"
                        style={{ color: '#6e6e73' }}
                      >
                        R$ {item.price.toFixed(2)}
                      </p>
                    </div>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => handleRemoveItem(item.id)}
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                ))}
              </div>
              <div className="border-t border-border pt-4 mt-4 space-y-4">
                <div className="flex justify-between items-center">
                  <span 
                    className="text-[1.2rem] font-semibold"
                    style={{ color: '#0D0D1A' }}
                  >
                    Total:
                  </span>
                  <span 
                    className="text-[2rem] font-semibold"
                    style={{ color: '#0D0D1A' }}
                  >
                    R$ {total.toFixed(2)}
                  </span>
                </div>
                <div className="space-y-3">
                  <Button 
                    variant="default" 
                    size="lg" 
                    className="w-full bg-[#0D0D1A] hover:bg-[#111122] text-white"
                    style={{ letterSpacing: '0.03em' }}
                    onClick={handleCheckout}
                  >
                    Ir para Pagamento
                  </Button>
                  <Button 
                    variant="outline" 
                    size="lg" 
                    className="w-full"
                    onClick={handleContinueShopping}
                  >
                    Continuar Comprando
                  </Button>
                </div>
              </div>
            </>
          )}
        </div>
      </SheetContent>
    </Sheet>
  );
};
