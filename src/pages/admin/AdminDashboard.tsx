import { motion } from 'framer-motion';
import { ShoppingCart, Wallet, Package, FolderKanban } from 'lucide-react';
import { StatCard } from '@/components/admin/StatCard';
import { mockPendingActions, mockAssets, mockBaskets } from '@/lib/mockData';
import { Card } from '@/components/ui/card';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';

export default function AdminDashboard() {
  const pendingBuys = mockPendingActions.filter(a => a.type === 'buy').length;
  const pendingWithdrawals = mockPendingActions.filter(a => a.type === 'withdraw').length;

  const recentActions = mockPendingActions.slice(0, 5);

  return (
    <div className="space-y-6">
      <motion.div
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
      >
        <h1 className="text-3xl font-bold">Dashboard Overview</h1>
        <p className="text-muted-foreground mt-1">Monitor platform activity and performance</p>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard
          title="Pending Buys"
          value={pendingBuys}
          icon={ShoppingCart}
          trend="+2 today"
          trendUp={true}
        />
        <StatCard
          title="Pending Withdrawals"
          value={pendingWithdrawals}
          icon={Wallet}
          trend="+1 today"
          trendUp={true}
        />
        <StatCard
          title="Total Assets"
          value={mockAssets.length}
          icon={Package}
        />
        <StatCard
          title="Active Baskets"
          value={mockBaskets.length}
          icon={FolderKanban}
        />
      </div>

      <Card className="p-6">
        <h2 className="text-xl font-semibold mb-4">Recent Activity</h2>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>User</TableHead>
              <TableHead>Type</TableHead>
              <TableHead>Asset</TableHead>
              <TableHead>Amount</TableHead>
              <TableHead>Date</TableHead>
              <TableHead>Status</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {recentActions.map((action) => (
              <TableRow key={action.id}>
                <TableCell className="font-medium">{action.userName}</TableCell>
                <TableCell className="capitalize">{action.type}</TableCell>
                <TableCell>{action.asset || '-'}</TableCell>
                <TableCell>KSh {action.amount.toLocaleString()}</TableCell>
                <TableCell>{new Date(action.date).toLocaleDateString()}</TableCell>
                <TableCell>
                  <span className="px-2 py-1 rounded-full text-xs bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200">
                    Pending
                  </span>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Card>
    </div>
  );
}
