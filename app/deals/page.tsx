'use client';
import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import DealCard from '../../components/DealCard';
import Skeleton from '../../components/Skeleton';

interface Deal {
  _id: string;
  title: string;
  category: string;
  isLocked: boolean;
}

export default function DealsPage() {
  const [deals, setDeals] = useState<Deal[]>([]);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState({ category: '', isLocked: '', search: '' });

  useEffect(() => {
    fetchDeals();
  }, [filters]);

  const fetchDeals = async () => {
    const query = new URLSearchParams(filters).toString();
    const res = await fetch(`/api/deals?${query}`);
    const data = await res.json();
    setDeals(data);
    setLoading(false);
  };

  return (
    <div className="container mx-auto p-4">
      <motion.h1 initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-3xl font-bold mb-4">
        Available Deals
      </motion.h1>
      <div className="mb-4 flex gap-4">
        <input
          type="text"
          placeholder="Search"
          value={filters.search}
          onChange={(e) => setFilters({ ...filters, search: e.target.value })}
          className="border p-2"
        />
        <select value={filters.category} onChange={(e) => setFilters({ ...filters, category: e.target.value })}>
          <option value="">All Categories</option>
          <option value="cloud">Cloud</option>
          <option value="marketing">Marketing</option>
        </select>
        <select value={filters.isLocked} onChange={(e) => setFilters({ ...filters, isLocked: e.target.value })}>
          <option value="">All Access</option>
          <option value="false">Unlocked</option>
          <option value="true">Locked</option>
        </select>
      </div>
      {loading ? <Skeleton /> : (
        <motion.div layout className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {deals.map((deal) => (
            <DealCard key={deal._id} deal={deal} />
          ))}
        </motion.div>
      )}
    </div>
  );
}
