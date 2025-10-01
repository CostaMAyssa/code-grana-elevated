import { Link } from "react-router-dom";
import { Facebook, Instagram, Youtube, Linkedin, ArrowUp } from "lucide-react";
import { Button } from "@/components/ui/button";

export const Footer = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="bg-primary text-primary-foreground">
      <div className="container mx-auto px-4 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          {/* Brand */}
          <div>
            <h3 className="text-2xl font-bold mb-4">
              Code<span className="text-accent">Grana</span>
            </h3>
            <p className="text-sm text-muted-foreground mb-4">
              Marketplace líder em código fonte premium no Brasil
            </p>
            <p className="text-xs text-muted-foreground">
              CNPJ: 55.805.670/0001-77
            </p>
          </div>

          {/* Links */}
          <div>
            <h4 className="font-semibold mb-4">Links Rápidos</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link to="/" className="hover:text-accent transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/produtos" className="hover:text-accent transition-colors">
                  Serviços
                </Link>
              </li>
              <li>
                <Link to="/codigos" className="hover:text-accent transition-colors">
                  Área de Códigos
                </Link>
              </li>
              <li>
                <Link to="/sobre" className="hover:text-accent transition-colors">
                  Sobre
                </Link>
              </li>
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h4 className="font-semibold mb-4">Legal</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <a href="#" className="hover:text-accent transition-colors">
                  Termos de Uso
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-accent transition-colors">
                  Política de Privacidade
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-accent transition-colors">
                  Política de Reembolso
                </a>
              </li>
              <li>
                <Link to="/contato" className="hover:text-accent transition-colors">
                  Contato
                </Link>
              </li>
            </ul>
          </div>

          {/* Social */}
          <div>
            <h4 className="font-semibold mb-4">Redes Sociais</h4>
            <div className="flex space-x-4">
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-accent transition-colors"
                aria-label="Facebook"
              >
                <Facebook className="w-5 h-5" />
              </a>
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-accent transition-colors"
                aria-label="Instagram"
              >
                <Instagram className="w-5 h-5" />
              </a>
              <a
                href="https://youtube.com"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-accent transition-colors"
                aria-label="YouTube"
              >
                <Youtube className="w-5 h-5" />
              </a>
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-accent transition-colors"
                aria-label="LinkedIn"
              >
                <Linkedin className="w-5 h-5" />
              </a>
            </div>
          </div>
        </div>

        <div className="border-t border-border pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-sm text-muted-foreground mb-4 md:mb-0">
            © {new Date().getFullYear()} CodeGrana. Todos os direitos reservados.
          </p>
          <Button
            variant="apple"
            size="sm"
            onClick={scrollToTop}
            className="flex items-center gap-2"
          >
            <ArrowUp className="w-4 h-4" />
            Voltar ao Topo
          </Button>
        </div>
      </div>
    </footer>
  );
};
