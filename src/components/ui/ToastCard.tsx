import { toast, Toast } from 'react-hot-toast';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle2, XCircle } from 'lucide-react';

interface ToastCardProps {
  t: Toast;
  title: string;
  message?: string;
  type?: 'success' | 'error';
}

export default function ToastCard({ t, title, message, type = 'success' }: ToastCardProps) {
  return (
    <AnimatePresence>
      {t.visible && (
        <motion.div
          initial={{ opacity: 0, y: 50, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 20, scale: 0.9 }}
          transition={{ type: 'spring', stiffness: 400, damping: 25 }}
          className={`
            max-w-md w-full bg-navy-900 border pointer-events-auto flex ring-1 ring-black/5 rounded-2xl shadow-2xl p-4 relative overflow-hidden
            ${type === 'success' ? 'border-teal-500/30' : 'border-red-500/30'}
          `}
        >
          {/* Glowing Background Effect */}
          <div className={`absolute -inset-1 blur-2xl opacity-20 ${type === 'success' ? 'bg-teal-500' : 'bg-red-500'} pointer-events-none -z-10`} />

          <div className="flex-1 w-0 p-2">
            <div className="flex items-start">
              <div className="flex-shrink-0 pt-0.5">
                {type === 'success' ? (
                  <CheckCircle2 className="h-8 w-8 text-teal-400" />
                ) : (
                  <XCircle className="h-8 w-8 text-red-400" />
                )}
              </div>
              <div className="ml-4 flex-1">
                <p className="text-base font-bold text-white mb-1">
                  {title}
                </p>
                {message && (
                  <p className="mt-1 text-sm text-slate-300">
                    {message}
                  </p>
                )}
              </div>
            </div>
          </div>
          <div className="flex border-l border-white/10 ml-2">
            <button
              onClick={() => toast.dismiss(t.id)}
              className="w-full border border-transparent rounded-none rounded-r-lg p-3 flex items-center justify-center text-sm font-medium text-slate-400 hover:text-white focus:outline-none transition-colors"
            >
              Close
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
