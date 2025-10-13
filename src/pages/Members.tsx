import { Button } from "@/components/ui/button";
import { MembershipTiers } from "@/components/members/MembershipTiers";
import { MyProducts } from "@/components/members/MyProducts";
import { TutorialVideos } from "@/components/members/TutorialVideos";

export default function Members() {
  return (
    <div className="min-h-screen pt-24 pb-16">
      <div className="container mx-auto px-4 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16 animate-fade-in">
          <h1 
            className="text-[clamp(2rem,4vw,3rem)] font-semibold tracking-tight mb-4"
            style={{ letterSpacing: '-0.02em', color: '#0D0D1A' }}
          >
            Junte-se à Comunidade CodeGrana
          </h1>
          <p 
            className="text-[1.2rem] mb-2"
            style={{ color: '#6e6e73' }}
          >
            Leve sua automação para outro nível
          </p>
          <p 
            className="text-[1rem] max-w-2xl mx-auto"
            style={{ color: '#6e6e73' }}
          >
            Acesse conteúdo exclusivo, suporte premium e descubra uma comunidade
            apaixonada por desenvolvimento
          </p>
        </div>

        {/* Meus Produtos - Shows user's purchased products */}
        <MyProducts />

        {/* Pricing Cards */}
        <MembershipTiers />

        {/* Video Tutorials Section */}
        <TutorialVideos />

        {/* Discord CTA */}
        <div className="bg-[#f8f9fb] rounded-xl p-8 md:p-12 text-center animate-fade-in">
          <h2 
            className="text-[clamp(1.8rem,3vw,2.5rem)] font-semibold tracking-tight mb-4"
            style={{ letterSpacing: '-0.02em', color: '#0D0D1A' }}
          >
            Pronto para começar?
          </h2>
          <p 
            className="text-[1.2rem] mb-8"
            style={{ color: '#6e6e73' }}
          >
            Escolha seu plano e ganhe acesso imediato à comunidade
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              variant="default" 
              size="lg" 
              className="bg-[#0D0D1A] hover:bg-[#111122] text-white"
              style={{ letterSpacing: '0.03em' }}
              asChild
            >
              <a href="https://discord.gg/codegrana" target="_blank" rel="noopener noreferrer">
                Entrar no Discord
              </a>
            </Button>
            <Button 
              variant="outline" 
              size="lg"
            >
              Ver FAQ
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
