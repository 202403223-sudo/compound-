
import { createContext, useContext, useEffect, useState } from "react";
import {
  CheckCircle2,
  X,
  AlertCircle,
  Info,
} from "lucide-react";

const ToastContext = createContext(null);

export function ToastProvider({ children }) {
  const [toast, setToast] = useState(null);

  const showToast = (message, type = "success") => {
    setToast({
      id: Date.now(),
      message,
      type,
    });
  };

  const closeToast = () => {
    setToast(null);
  };

  useEffect(() => {
    if (!toast) return;

    const timer = setTimeout(() => {
      setToast(null);
    }, 3500);

    return () => clearTimeout(timer);
  }, [toast]);

  return (
    <ToastContext.Provider value={{ showToast }}>
      {children}

      {toast && (
        <div className="fixed right-5 top-24 z-[100] w-[calc(100%-40px)] max-w-sm animate-toast">
          <div className="flex items-start gap-3 rounded-2xl border border-[#e5dacc] bg-white p-4 shadow-2xl">

            <div
              className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-full ${
                toast.type === "success"
                  ? "bg-green-50 text-green-700"
                  : toast.type === "error"
                    ? "bg-red-50 text-red-700"
                    : "bg-blue-50 text-blue-700"
              }`}
            >
              {toast.type === "success" ? (
                <CheckCircle2 size={19} />
              ) : toast.type === "error" ? (
                <AlertCircle size={19} />
              ) : (
                <Info size={19} />
              )}
            </div>

            <div className="min-w-0 flex-1">
              <p className="text-sm font-semibold text-[#44372c]">
                {toast.type === "success"
                  ? "Success"
                  : toast.type === "error"
                    ? "Something went wrong"
                    : "Notice"}
              </p>

              <p className="mt-1 text-xs leading-5 text-[#7c7167]">
                {toast.message}
              </p>
            </div>

            <button
              type="button"
              onClick={closeToast}
              className="text-[#9a8b7c] transition hover:text-[#44372c]"
            >
              <X size={17} />
            </button>

          </div>
        </div>
      )}
    </ToastContext.Provider>
  );
}

export function useToast() {
  return useContext(ToastContext);
}
