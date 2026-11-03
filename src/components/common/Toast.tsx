import React from 'react';
import { useApp } from '../../context/AppContext';
import { CheckCircle2, AlertCircle, Info, X } from 'lucide-react';

export const ToastContainer: React.FC = () => {
  const { toasts, removeToast } = useApp();

  if (toasts.length === 0) return null;

  return (
    <div className="fixed top-5 right-5 z-50 flex flex-col gap-2 max-w-sm w-full pointer-events-none">
      {toasts.map((toast) => {
        let bgStyle = 'bg-white border-neutral-200 text-[#202923]';
        let icon = <CheckCircle2 className="w-5 h-5 text-[#1B6044] shrink-0" />;

        if (toast.type === 'error') {
          bgStyle = 'bg-white border-red-200 text-red-950';
          icon = <AlertCircle className="w-5 h-5 text-red-600 shrink-0" />;
        } else if (toast.type === 'info') {
          bgStyle = 'bg-white border-neutral-200 text-[#202923]';
          icon = <Info className="w-5 h-5 text-[#78B98B] shrink-0" />;
        }

        return (
          <div
            key={toast.id}
            className={`pointer-events-auto flex items-start gap-3 p-4 rounded-xl border shadow-lg transition-all duration-200 ${bgStyle}`}
          >
            {icon}
            <div className="flex-1 text-sm font-medium leading-snug">{toast.message}</div>
            <button
              onClick={() => removeToast(toast.id)}
              className="text-[#6B786F] hover:text-[#202923] transition-colors p-0.5 rounded"
              aria-label="Tutup notifikasi"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        );
      })}
    </div>
  );
};
