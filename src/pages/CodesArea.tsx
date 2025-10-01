import { Button } from "@/components/ui/button";
import { Download, Calendar, Video, MessageSquare, User } from "lucide-react";

const purchasedCodes = [
  {
    id: "1",
    name: "Serviço de Implementação",
    purchaseDate: "15/03/2025",
    status: "Entregue",
    downloadUrl: "#",
  },
];

const purchaseHistory = [
  {
    id: "1",
    service: "Serviço de Implementação",
    date: "15/03/2025",
    amount: "R$ 500,00",
    status: "Pago",
  },
  {
    id: "2",
    service: "Consultoria Especializada",
    date: "10/03/2025",
    amount: "R$ 300,00",
    status: "Entregue",
  },
];

export default function CodesArea() {
  return (
    <div className="min-h-screen pt-24 pb-16 bg-secondary/30">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="mb-12 animate-fade-in">
            <h1 className="text-4xl md:text-5xl font-semibold mb-4 tracking-tight">
              Bem-vindo à sua Área de Códigos
            </h1>
            <p className="text-xl text-muted-foreground">
              Acesse seus códigos, histórico e recursos exclusivos
            </p>
          </div>

          {/* Meus Códigos */}
          <div className="mb-12 animate-fade-in">
            <h2 className="text-3xl font-semibold mb-6">Meus Códigos</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {purchasedCodes.map((code) => (
                <div
                  key={code.id}
                  className="bg-card rounded-2xl p-8 shadow-card hover:shadow-card-hover transition-shadow"
                >
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <h3 className="text-xl font-semibold mb-2">{code.name}</h3>
                      <p className="text-sm text-muted-foreground">
                        Comprado em {code.purchaseDate}
                      </p>
                    </div>
                    <span className="px-3 py-1 bg-accent/10 text-accent text-sm rounded-full">
                      {code.status}
                    </span>
                  </div>
                  <Button variant="apple" className="w-full" asChild>
                    <a href={code.downloadUrl}>
                      <Download className="w-4 h-4 mr-2" />
                      Baixar Código
                    </a>
                  </Button>
                </div>
              ))}
              
              <div className="bg-card rounded-2xl p-8 shadow-card border-2 border-dashed border-border flex flex-col items-center justify-center text-center">
                <p className="text-muted-foreground mb-4">
                  Nenhum código disponível ainda
                </p>
                <Button variant="outline" asChild>
                  <a href="/produtos">Explorar Serviços</a>
                </Button>
              </div>
            </div>
          </div>

          {/* Histórico de Compras */}
          <div className="mb-12 animate-fade-in">
            <h2 className="text-3xl font-semibold mb-6">Histórico de Compras</h2>
            <div className="bg-card rounded-2xl overflow-hidden shadow-card">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-secondary">
                    <tr>
                      <th className="px-6 py-4 text-left text-sm font-semibold">
                        Serviço
                      </th>
                      <th className="px-6 py-4 text-left text-sm font-semibold">
                        Data
                      </th>
                      <th className="px-6 py-4 text-left text-sm font-semibold">
                        Valor
                      </th>
                      <th className="px-6 py-4 text-left text-sm font-semibold">
                        Status
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-border">
                    {purchaseHistory.map((purchase) => (
                      <tr key={purchase.id} className="hover:bg-secondary/50 transition-colors">
                        <td className="px-6 py-4">{purchase.service}</td>
                        <td className="px-6 py-4 text-muted-foreground">
                          {purchase.date}
                        </td>
                        <td className="px-6 py-4 font-semibold">{purchase.amount}</td>
                        <td className="px-6 py-4">
                          <span className="px-3 py-1 bg-accent/10 text-accent text-sm rounded-full">
                            {purchase.status}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 animate-fade-in">
            <div className="bg-card rounded-2xl p-6 shadow-card hover:shadow-card-hover transition-all cursor-pointer">
              <Calendar className="w-8 h-8 mb-4 text-accent" />
              <h3 className="font-semibold mb-2">Agendar Consultoria</h3>
              <p className="text-sm text-muted-foreground">
                Reserve um horário
              </p>
            </div>

            <div className="bg-card rounded-2xl p-6 shadow-card hover:shadow-card-hover transition-all cursor-pointer">
              <Video className="w-8 h-8 mb-4 text-accent" />
              <h3 className="font-semibold mb-2">Tutoriais</h3>
              <p className="text-sm text-muted-foreground">
                Vídeos exclusivos
              </p>
            </div>

            <div className="bg-card rounded-2xl p-6 shadow-card hover:shadow-card-hover transition-all cursor-pointer">
              <MessageSquare className="w-8 h-8 mb-4 text-accent" />
              <h3 className="font-semibold mb-2">Suporte</h3>
              <p className="text-sm text-muted-foreground">
                Fale conosco
              </p>
            </div>

            <a href="/perfil" className="bg-card rounded-2xl p-6 shadow-card hover:shadow-card-hover transition-all cursor-pointer block">
              <User className="w-8 h-8 mb-4 text-accent" />
              <h3 className="font-semibold mb-2">Meu Perfil</h3>
              <p className="text-sm text-muted-foreground">
                Editar dados
              </p>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
