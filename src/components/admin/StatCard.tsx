import { motion } from 'framer-motion';
import { LucideIcon } from 'lucide-react';
import { Card } from '@/components/ui/card';

interface StatCardProps {
  title: string;
  value: string | number;
  icon: LucideIcon;
  trend?: string;
  trendUp?: boolean;
}

export function StatCard({ title, value, icon: Icon, trend, trendUp }: StatCardProps) {
  return (
    <motion.div
      initial={{ scale: 0.95, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      whileHover={{ scale: 1.02 }}
      transition={{ duration: 0.2 }}
    >
      <Card className="p-6 hover:shadow-lg transition-shadow">
        <div className="flex items-start justify-between">
          <div>
            <p className="text-sm text-muted-foreground font-medium">{title}</p>
            <h3 className="text-3xl font-bold mt-2">{value}</h3>
            {trend && (
              <p className={`text-sm mt-2 ${trendUp ? 'text-green-600' : 'text-red-600'}`}>
                {trend}
              </p>
            )}
          </div>
          <div className="p-3 rounded-full bg-primary/10">
            <Icon className="h-6 w-6 text-primary" />
          </div>
        </div>
      </Card>
    </motion.div>
  );
}
