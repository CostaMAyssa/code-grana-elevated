import { useState } from "react";
import { Menu, X, ShoppingBag, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useCart } from "@/hooks/useCart";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { items } = useCart();
  const itemCount = items.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-background/80 apple-blur border-b border-border">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <a href="/" className="text-xl font-semibold tracking-tight">
            CodeGrana
          </a>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-8">
            <a href="/" className="text-sm hover:opacity-70 transition-opacity">
              Home
            </a>
            
            <DropdownMenu>
              <DropdownMenuTrigger className="flex items-center text-sm hover:opacity-70 transition-opacity">
                Serviços <ChevronDown className="ml-1 h-4 w-4" />
              </DropdownMenuTrigger>
              <DropdownMenuContent className="bg-background/95 apple-blur">
                <DropdownMenuItem asChild>
                  <a href="/produtos">Implementação</a>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <a href="/produtos">Consultorias</a>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

            <a href="/codigos" className="text-sm hover:opacity-70 transition-opacity">
              Área de Códigos
            </a>
            <a href="/contato" className="text-sm hover:opacity-70 transition-opacity">
              Contato
            </a>
            
            <Button variant="ghost" size="icon" className="relative" asChild>
              <a href="/carrinho">
                <ShoppingBag className="h-5 w-5" />
                {itemCount > 0 && (
                  <span className="absolute -top-1 -right-1 bg-accent text-accent-foreground text-xs rounded-full w-5 h-5 flex items-center justify-center font-semibold">
                    {itemCount}
                  </span>
                )}
              </a>
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden"
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isOpen && (
          <div className="md:hidden py-4 space-y-4 animate-fade-in">
            <a href="/" className="block text-sm hover:opacity-70 transition-opacity">
              Home
            </a>
            <a href="/produtos" className="block text-sm hover:opacity-70 transition-opacity">
              Serviços
            </a>
            <a href="/codigos" className="block text-sm hover:opacity-70 transition-opacity">
              Área de Códigos
            </a>
            <a href="/contato" className="block text-sm hover:opacity-70 transition-opacity">
              Contato
            </a>
            <a href="/carrinho" className="block text-sm hover:opacity-70 transition-opacity">
              Carrinho ({itemCount})
            </a>
          </div>
        )}
      </div>
    </nav>
  );
};
