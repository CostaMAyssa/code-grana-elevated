import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";

export default function Cadastrar() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSignup = async () => {
    if (!email || !password) {
      toast.error("Informe email e senha");
      return;
    }
    setLoading(true);
    try {
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: { name },
        },
      });
      if (error) {
        toast.error(error.message || "Falha no cadastro");
        return;
      }
      // Se confirmação de email estiver desativada, haverá sessão
      if (data.session) {
        toast.success("Conta criada. Você pode entrar agora.");
        navigate("/entrar");
      } else {
        toast.message("Verifique seu email para confirmar o cadastro.");
      }
    } catch (e: any) {
      toast.error("Erro ao cadastrar");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen pt-24 pb-16 flex items-center justify-center">
      <div className="w-full max-w-md bg-card rounded-xl p-8 shadow-card">
        <h1 className="text-2xl font-semibold mb-6" style={{ color: '#0D0D1A' }}>Criar conta</h1>
        <div className="space-y-4">
          <div>
            <Label htmlFor="name">Nome</Label>
            <Input id="name" type="text" placeholder="Seu nome" value={name} onChange={(e) => setName(e.target.value)} />
          </div>
          <div>
            <Label htmlFor="email">Email</Label>
            <Input id="email" type="email" placeholder="seu@email.com" value={email} onChange={(e) => setEmail(e.target.value)} />
          </div>
          <div>
            <Label htmlFor="password">Senha</Label>
            <Input id="password" type="password" placeholder="••••••••" value={password} onChange={(e) => setPassword(e.target.value)} />
          </div>
          <Button className="w-full bg-[#0D0D1A] hover:bg-[#111122] text-white" disabled={loading} onClick={handleSignup}>
            {loading ? "Cadastrando..." : "Cadastrar"}
          </Button>
          <Button
            variant="outline"
            className="w-full"
            disabled={loading || !email}
            onClick={async () => {
              try {
                const { error: resendError } = await supabase.auth.resend({ type: 'signup', email });
                if (resendError) {
                  toast.error(resendError.message || 'Falha ao reenviar confirmação');
                  return;
                }
                toast.success('Email de confirmação reenviado');
              } catch (e: any) {
                toast.error('Erro ao reenviar confirmação');
              }
            }}
          >
            Reenviar confirmação
          </Button>
          <div className="flex justify-between text-sm" style={{ color: '#6e6e73' }}>
            <Link to="/entrar">Já tenho conta</Link>
          </div>
        </div>
      </div>
    </div>
  );
}