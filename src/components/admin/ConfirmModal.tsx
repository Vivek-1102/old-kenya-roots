import { motion, AnimatePresence } from 'framer-motion';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { AlertTriangle } from 'lucide-react';

interface ConfirmModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  title: string;
  description: string;
  confirmText?: string;
  cancelText?: string;
  variant?: 'default' | 'destructive';
}

export function ConfirmModal({
  isOpen,
  onClose,
  onConfirm,
  title,
  description,
  confirmText = 'Confirm',
  cancelText = 'Cancel',
  variant = 'default',
}: ConfirmModalProps) {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent>
        <motion.div
          initial={{ scale: 0.95, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.2 }}
        >
          <DialogHeader>
            <div className="flex items-center gap-3">
              {variant === 'destructive' && (
                <div className="p-2 rounded-full bg-destructive/10">
                  <AlertTriangle className="h-5 w-5 text-destructive" />
                </div>
              )}
              <DialogTitle>{title}</DialogTitle>
            </div>
            <DialogDescription>{description}</DialogDescription>
          </DialogHeader>
          <DialogFooter className="gap-2">
            <Button variant="outline" onClick={onClose}>
              {cancelText}
            </Button>
            <Button
              variant={variant}
              onClick={() => {
                onConfirm();
                onClose();
              }}
            >
              {confirmText}
            </Button>
          </DialogFooter>
        </motion.div>
      </DialogContent>
    </Dialog>
  );
}
