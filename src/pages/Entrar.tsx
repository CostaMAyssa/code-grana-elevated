import { useState } from "react";
import { useNavigate, useLocation, Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";

export default function Entrar() {
  const navigate = useNavigate();
  const location = useLocation();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const redirectTo = (location.state as any)?.from || "/membros";

  const handleLogin = async () => {
    if (!email || !password) {
      toast.error("Informe email e senha");
      return;
    }
    setLoading(true);
    try {
      const { error } = await supabase.auth.signInWithPassword({ email, password });
      if (error) {
        const msg =
          error.status === 400
            ? "Email não confirmado. Verifique sua caixa de entrada."
            : error.status === 422
            ? "Email ou senha inválidos. Confira os dados."
            : error.message || "Falha no login";
        toast.error(msg);
        return;
      }
      toast.success("Login realizado");
      navigate(redirectTo);
    } catch (e: any) {
      toast.error("Erro ao entrar");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen pt-24 pb-16 flex items-center justify-center">
      <div className="w-full max-w-md bg-card rounded-xl p-8 shadow-card">
        <h1 className="text-2xl font-semibold mb-6" style={{ color: '#0D0D1A' }}>Entrar</h1>
        <div className="space-y-4">
          <div>
            <Label htmlFor="email">Email</Label>
            <Input id="email" type="email" placeholder="seu@email.com" value={email} onChange={(e) => setEmail(e.target.value)} />
          </div>
          <div>
            <Label htmlFor="password">Senha</Label>
            <Input id="password" type="password" placeholder="••••••••" value={password} onChange={(e) => setPassword(e.target.value)} />
          </div>
          <Button className="w-full bg-[#0D0D1A] hover:bg-[#111122] text-white" disabled={loading} onClick={handleLogin}>
            {loading ? "Entrando..." : "Entrar"}
          </Button>
          <div className="flex justify-between text-sm" style={{ color: '#6e6e73' }}>
            <Link to="/cadastrar">Criar conta</Link>
            <Link to="/recuperar-senha">Esqueci a senha</Link>
          </div>
        </div>
      </div>
    </div>
  );
}