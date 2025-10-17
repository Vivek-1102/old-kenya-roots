import { useState } from 'react';
import { motion } from 'framer-motion';
import { Check, X } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { ConfirmModal } from '@/components/admin/ConfirmModal';
import { mockPendingActions } from '@/lib/mockData';
import { toast } from 'sonner';

export default function PendingWithdrawals() {
  const [pendingWithdrawals, setPendingWithdrawals] = useState(
    mockPendingActions.filter(a => a.type === 'withdraw')
  );
  const [confirmModal, setConfirmModal] = useState<{
    isOpen: boolean;
    action: 'approve' | 'reject' | null;
    id: string | null;
  }>({ isOpen: false, action: null, id: null });

  const handleAction = (id: string, action: 'approve' | 'reject') => {
    setConfirmModal({ isOpen: true, action, id });
  };

  const confirmAction = () => {
    if (!confirmModal.id) return;

    setPendingWithdrawals(prev => prev.filter(w => w.id !== confirmModal.id));
    
    if (confirmModal.action === 'approve') {
      toast.success('Withdrawal approved successfully');
    } else {
      toast.error('Withdrawal rejected');
    }
  };

  return (
    <div className="space-y-6">
      <motion.div
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
      >
        <h1 className="text-3xl font-bold">Pending Withdrawals</h1>
        <p className="text-muted-foreground mt-1">Review and process withdrawal requests</p>
      </motion.div>

      <Card className="p-6">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>User</TableHead>
              <TableHead>Amount</TableHead>
              <TableHead>Method</TableHead>
              <TableHead>Date</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {pendingWithdrawals.length === 0 ? (
              <TableRow>
                <TableCell colSpan={6} className="text-center py-8 text-muted-foreground">
                  No pending withdrawals
                </TableCell>
              </TableRow>
            ) : (
              pendingWithdrawals.map((withdrawal) => (
                <TableRow key={withdrawal.id}>
                  <TableCell className="font-medium">{withdrawal.userName}</TableCell>
                  <TableCell>KSh {withdrawal.amount.toLocaleString()}</TableCell>
                  <TableCell>M-Pesa</TableCell>
                  <TableCell>{new Date(withdrawal.date).toLocaleString()}</TableCell>
                  <TableCell>
                    <span className="px-2 py-1 rounded-full text-xs bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200">
                      Pending
                    </span>
                  </TableCell>
                  <TableCell>
                    <div className="flex gap-2">
                      <Button
                        size="sm"
                        onClick={() => handleAction(withdrawal.id, 'approve')}
                      >
                        <Check className="h-4 w-4 mr-1" />
                        Approve
                      </Button>
                      <Button
                        size="sm"
                        variant="destructive"
                        onClick={() => handleAction(withdrawal.id, 'reject')}
                      >
                        <X className="h-4 w-4 mr-1" />
                        Reject
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </Card>

      <ConfirmModal
        isOpen={confirmModal.isOpen}
        onClose={() => setConfirmModal({ isOpen: false, action: null, id: null })}
        onConfirm={confirmAction}
        title={confirmModal.action === 'approve' ? 'Approve Withdrawal' : 'Reject Withdrawal'}
        description={
          confirmModal.action === 'approve'
            ? 'Are you sure you want to approve this withdrawal?'
            : 'Are you sure you want to reject this withdrawal? This action cannot be undone.'
        }
        confirmText={confirmModal.action === 'approve' ? 'Approve' : 'Reject'}
        variant={confirmModal.action === 'reject' ? 'destructive' : 'default'}
      />
    </div>
  );
}
