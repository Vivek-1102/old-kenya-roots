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

export default function PendingBuys() {
  const [pendingBuys, setPendingBuys] = useState(
    mockPendingActions.filter(a => a.type === 'buy')
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

    setPendingBuys(prev => prev.filter(buy => buy.id !== confirmModal.id));
    
    if (confirmModal.action === 'approve') {
      toast.success('Buy order approved successfully');
    } else {
      toast.error('Buy order rejected');
    }
  };

  return (
    <div className="space-y-6">
      <motion.div
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
      >
        <h1 className="text-3xl font-bold">Pending Buy Orders</h1>
        <p className="text-muted-foreground mt-1">Review and approve user purchase requests</p>
      </motion.div>

      <Card className="p-6">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>User</TableHead>
              <TableHead>Asset</TableHead>
              <TableHead>Amount</TableHead>
              <TableHead>Date</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {pendingBuys.length === 0 ? (
              <TableRow>
                <TableCell colSpan={6} className="text-center py-8 text-muted-foreground">
                  No pending buy orders
                </TableCell>
              </TableRow>
            ) : (
              pendingBuys.map((buy) => (
                <TableRow key={buy.id}>
                  <TableCell className="font-medium">{buy.userName}</TableCell>
                  <TableCell>{buy.asset}</TableCell>
                  <TableCell>KSh {buy.amount.toLocaleString()}</TableCell>
                  <TableCell>{new Date(buy.date).toLocaleString()}</TableCell>
                  <TableCell>
                    <span className="px-2 py-1 rounded-full text-xs bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200">
                      Pending
                    </span>
                  </TableCell>
                  <TableCell>
                    <div className="flex gap-2">
                      <Button
                        size="sm"
                        onClick={() => handleAction(buy.id, 'approve')}
                      >
                        <Check className="h-4 w-4 mr-1" />
                        Approve
                      </Button>
                      <Button
                        size="sm"
                        variant="destructive"
                        onClick={() => handleAction(buy.id, 'reject')}
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
        title={confirmModal.action === 'approve' ? 'Approve Buy Order' : 'Reject Buy Order'}
        description={
          confirmModal.action === 'approve'
            ? 'Are you sure you want to approve this buy order?'
            : 'Are you sure you want to reject this buy order? This action cannot be undone.'
        }
        confirmText={confirmModal.action === 'approve' ? 'Approve' : 'Reject'}
        variant={confirmModal.action === 'reject' ? 'destructive' : 'default'}
      />
    </div>
  );
}
