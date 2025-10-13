import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";

export default function RecuperarSenha() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  const handleReset = async () => {
    if (!email) {
      toast.error("Informe seu email");
      return;
    }
    setLoading(true);
    try {
      const { error } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: `${window.location.origin}/entrar`,
      });
      if (error) {
        toast.error(error.message || "Falha ao enviar email");
        return;
      }
      toast.success("Email de recuperação enviado");
    } catch (e: any) {
      toast.error("Erro ao enviar recuperação");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen pt-24 pb-16 flex items-center justify-center">
      <div className="w-full max-w-md bg-card rounded-xl p-8 shadow-card">
        <h1 className="text-2xl font-semibold mb-6" style={{ color: '#0D0D1A' }}>Recuperar senha</h1>
        <div className="space-y-4">
          <div>
            <Label htmlFor="email">Email</Label>
            <Input id="email" type="email" placeholder="seu@email.com" value={email} onChange={(e) => setEmail(e.target.value)} />
          </div>
          <Button className="w-full bg-[#0D0D1A] hover:bg-[#111122] text-white" disabled={loading} onClick={handleReset}>
            {loading ? "Enviando..." : "Enviar link"}
          </Button>
        </div>
      </div>
    </div>
  );
}