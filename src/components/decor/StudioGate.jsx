import { Button } from "@/components/ui/button";
import { useAuth } from "@/lib/AuthContext";
import { useStudio } from "@/components/decor/StudioProvider";

export default function StudioGate() {
  const { isLoadingAuth, closeStudio } = useStudio();
  const { user, navigateToLogin } = useAuth();

  return (
    <div className="fixed inset-0 z-[90] flex items-center justify-center bg-foreground/25 px-6 backdrop-blur-sm">
      <div className="w-full max-w-sm rounded-lg border border-border bg-card p-6 text-center shadow-2xl">
        <p className="font-display text-xl text-foreground">Atelier Dekorasi</p>
        <p className="mt-2 text-[0.85rem] leading-relaxed text-foreground/70">
          {isLoadingAuth
            ? "Memeriksa sesi…"
            : user
              ? "Akun ini belum memiliki akses admin untuk mengatur dekorasi."
              : "Masuk sebagai admin untuk menambah dan mengatur dekorasi undangan."}
        </p>
        <div className="mt-5 flex flex-col gap-2">
          {!isLoadingAuth && !user && (
            <Button onClick={() => navigateToLogin()}>Masuk</Button>
          )}
          {!isLoadingAuth && user && (
            <Button onClick={() => navigateToLogin()} variant="outline">
              Masuk dengan akun lain
            </Button>
          )}
          <Button variant="ghost" onClick={closeStudio}>
            Tutup
          </Button>
        </div>
      </div>
    </div>
  );
}