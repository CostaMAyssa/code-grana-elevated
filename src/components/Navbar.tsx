import { Link, useLocation } from "react-router-dom";
import { useState } from "react";
import { Menu, X, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  const isActive = (path: string) => location.pathname === path;

  return (
    <nav className="fixed top-0 w-full bg-white text-black z-50 shadow-sm">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2">
            <span className="text-2xl font-bold">
              Code<span className="text-apple-blue-hover">Grana</span>
            </span>
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-8">
            <Link
              to="/"
              className={`transition-colors hover:text-apple-blue-hover ${
                isActive("/") ? "text-apple-blue-hover" : "text-black"
              }`}
            >
              Home
            </Link>

            <DropdownMenu>
              <DropdownMenuTrigger className="flex items-center space-x-1 transition-colors hover:text-apple-blue-hover text-black">
                <span>Produtos</span>
                <ChevronDown className="w-4 h-4" />
              </DropdownMenuTrigger>
              <DropdownMenuContent className="bg-card border-border">
                <DropdownMenuItem asChild>
                  <Link to="/produtos?categoria=automacao" className="cursor-pointer">
                    Automação IA
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link to="/produtos?categoria=templates" className="cursor-pointer">
                    Templates Web
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link to="/produtos?categoria=erp" className="cursor-pointer">
                    Kits ERP
                  </Link>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

            <Link
              to="/membros"
              className={`transition-colors hover:text-apple-blue-hover ${
                isActive("/membros") ? "text-apple-blue-hover" : "text-black"
              }`}
            >
              Membros
            </Link>

            <Link
              to="/sobre"
              className={`transition-colors hover:text-apple-blue-hover ${
                isActive("/sobre") ? "text-apple-blue-hover" : "text-black"
              }`}
            >
              Sobre
            </Link>

            <Link
              to="/contato"
              className={`transition-colors hover:text-apple-blue-hover ${
                isActive("/contato") ? "text-apple-blue-hover" : "text-black"
              }`}
            >
              Contato
            </Link>

            <a
              href="https://wa.me/5511999999999"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-black text-white px-6 py-2 rounded-full text-sm font-semibold hover:bg-gray-800 hover:scale-105 hover:shadow-lg transition-all duration-300 shadow-md"
            >
              WhatsApp
            </a>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden"
            onClick={() => setIsOpen(!isOpen)}
            aria-label="Toggle menu"
          >
            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isOpen && (
          <div className="md:hidden py-4 animate-fade-in">
            <div className="flex flex-col space-y-4">
              <Link to="/" className="hover:text-apple-blue-hover transition-colors text-black" onClick={() => setIsOpen(false)}>
                Home
              </Link>
              <Link to="/produtos" className="hover:text-apple-blue-hover transition-colors text-black" onClick={() => setIsOpen(false)}>
                Produtos
              </Link>
              <Link to="/membros" className="hover:text-apple-blue-hover transition-colors text-black" onClick={() => setIsOpen(false)}>
                Membros
              </Link>
              <Link to="/sobre" className="hover:text-apple-blue-hover transition-colors text-black" onClick={() => setIsOpen(false)}>
                Sobre
              </Link>
              <Link to="/contato" className="hover:text-apple-blue-hover transition-colors text-black" onClick={() => setIsOpen(false)}>
                Contato
              </Link>
            <a
              href="https://discord.gg/codegrana"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-black text-white px-6 py-2 rounded-full text-sm font-semibold w-full text-center hover:bg-gray-800 hover:scale-105 hover:shadow-lg transition-all duration-300 shadow-md"
              onClick={() => setIsOpen(false)}
            >
              Discord
            </a>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};
