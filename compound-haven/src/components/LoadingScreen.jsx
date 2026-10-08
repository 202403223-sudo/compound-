
import { useEffect, useState } from "react";

export default function LoadingScreen() {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setVisible(false);
    }, 1300);

    return () => clearTimeout(timer);
  }, []);

  if (!visible) return null;

  return (
    <div className="fixed inset-0 z-[200] flex items-center justify-center bg-[#44372c] text-white animate-loading">
      <div className="text-center">

        <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full border border-white/20 bg-white/10 backdrop-blur">
          <span className="serif text-4xl">M</span>
        </div>

        <h1 className="serif mt-6 text-4xl">
          Maison Verde
        </h1>

        <p className="mt-2 text-[10px] uppercase tracking-[0.35em] text-white/50">
          Residential Community
        </p>

        <div className="mx-auto mt-8 h-px w-32 overflow-hidden bg-white/10">
          <div className="loading-line h-full w-full bg-[#d2b996]" />
        </div>

      </div>
    </div>
  );
}

