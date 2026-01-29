import { motion } from 'framer-motion';
import Link from 'next/link';

interface Deal {
  _id: string;
  title: string;
  isLocked: boolean;
}

export default function DealCard({ deal }: { deal: Deal }) {
  return (
    <motion.div
      whileHover={{ scale: 1.05 }}
      className={`p-4 border rounded-lg ${deal.isLocked ? 'bg-gray-100' : 'bg-white'}`}
    >
      <h3 className="font-bold">{deal.title}</h3>
      {deal.isLocked && <p className="text-red-500">Locked - Verification Required</p>}
      <Link href={`/deals/${deal._id}`} className="text-blue-600">View Details</Link>
    </motion.div>
  );
}
