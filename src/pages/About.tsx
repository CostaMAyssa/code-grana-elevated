import { Shield, Award, Users, Code } from "lucide-react";

export default function About() {
  return (
    <div className="min-h-screen pt-24 pb-16">
      <div className="container mx-auto px-4 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16 animate-fade-in">
          <h1 
            className="text-[clamp(2rem,4vw,3rem)] font-semibold tracking-tight mb-4"
            style={{ letterSpacing: '-0.02em', color: '#0D0D1A' }}
          >
            Sobre a CodeGrana
          </h1>
          <p 
            className="text-[1.2rem] max-w-3xl mx-auto"
            style={{ color: '#6e6e73' }}
          >
            Democratizando o desenvolvimento rápido com IA e automação no Brasil
          </p>
        </div>

        {/* Mission */}
        <div className="max-w-4xl mx-auto mb-20 animate-fade-in">
          <div className="bg-white rounded-xl p-8 md:p-12 shadow-[0_4px_12px_rgba(0,0,0,0.08)]">
            <h2 
              className="text-[1.8rem] font-semibold tracking-tight mb-6"
              style={{ letterSpacing: '-0.01em', color: '#0D0D1A' }}
            >
              Nossa Missão
            </h2>
            <p 
              className="text-[1.1rem] leading-relaxed mb-4"
              style={{ color: '#6e6e73' }}
            >
              A <span style={{ color: '#0D0D1A', fontWeight: 600 }}>CodeGrana</span> nasceu com o
              propósito de revolucionar a forma como desenvolvedores e empresas constroem
              soluções digitais no Brasil. Acreditamos que código de qualidade não deve
              ser um privilégio, mas sim uma ferramenta acessível para todos que desejam
              transformar ideias em realidade.
            </p>
            <p 
              className="text-[1.1rem] leading-relaxed"
              style={{ color: '#6e6e73' }}
            >
              Como <strong style={{ color: '#0D0D1A' }}>marketplace líder em código fonte premium</strong>, oferecemos
              soluções prontas que economizam meses de desenvolvimento, com foco especial
              em automação e inteligência artificial - as tecnologias que estão moldando
              o futuro.
            </p>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-20">
          {[
            { icon: Code, value: "50+", label: "Produtos Premium" },
            { icon: Users, value: "5000+", label: "Desenvolvedores Ativos" },
            { icon: Award, value: "98%", label: "Satisfação" },
            { icon: Shield, value: "100%", label: "Código Seguro" },
          ].map((stat, index) => (
            <div
              key={index}
              className="bg-card rounded-xl p-8 text-center shadow-card hover:shadow-card-hover transition-all duration-300 hover:-translate-y-2 animate-fade-in"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="w-16 h-16 bg-apple-blue-hover rounded-full flex items-center justify-center mx-auto mb-4">
                <stat.icon className="w-8 h-8 text-apple-blue-hover-foreground" />
              </div>
              <div className="text-4xl font-bold text-apple-blue-hover mb-2">{stat.value}</div>
              <div className="text-muted-foreground">{stat.label}</div>
            </div>
          ))}
        </div>

        {/* Values */}
        <div className="mb-20 animate-fade-in">
          <h2 
            className="text-[clamp(1.8rem,3vw,2.5rem)] font-semibold tracking-tight text-center mb-12"
            style={{ letterSpacing: '-0.02em', color: '#0D0D1A' }}
          >
            Nossos Valores
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                title: "Qualidade",
                description:
                  "Cada linha de código passa por rigorosa revisão para garantir padrões enterprise.",
              },
              {
                title: "Inovação",
                description:
                  "Sempre à frente, integrando as tecnologias mais recentes de IA e automação.",
              },
              {
                title: "Comunidade",
                description:
                  "Crescemos juntos. Nossa força está na colaboração e no suporte mútuo.",
              },
            ].map((value, index) => (
              <div
                key={index}
                className="bg-muted rounded-xl p-8"
                style={{ animationDelay: `${index * 0.15}s` }}
              >
                <h3 className="text-2xl font-bold mb-4">{value.title}</h3>
                <p className="text-muted-foreground">{value.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Trust Badges */}
        <div className="bg-[#f8f9fb] rounded-xl p-8 md:p-12 text-center animate-fade-in">
          <h2 
            className="text-[clamp(1.8rem,3vw,2.5rem)] font-semibold tracking-tight mb-8"
            style={{ letterSpacing: '-0.02em', color: '#0D0D1A' }}
          >
            Compromisso com Você
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="flex flex-col items-center">
              <Shield className="w-12 h-12 text-apple-blue-hover mb-4" />
              <h3 className="font-semibold mb-2">Pagamentos Seguros</h3>
              <p className="text-sm text-muted-foreground">
                Transações protegidas via Asaas
              </p>
            </div>
            <div className="flex flex-col items-center">
              <Award className="w-12 h-12 text-apple-blue-hover mb-4" />
              <h3 className="font-semibold mb-2">Licenças Oficiais</h3>
              <p className="text-sm text-muted-foreground">
                Documentação completa e legal
              </p>
            </div>
            <div className="flex flex-col items-center">
              <Users className="w-12 h-12 text-apple-blue-hover mb-4" />
              <h3 className="font-semibold mb-2">Suporte 24/7</h3>
              <p className="text-sm text-muted-foreground">
                Comunidade ativa no Discord
              </p>
            </div>
          </div>
          <div className="mt-8 text-sm text-muted-foreground">
            <p>CNPJ: 55.805.670/0001-77</p>
          </div>
        </div>
      </div>
    </div>
  );
}
