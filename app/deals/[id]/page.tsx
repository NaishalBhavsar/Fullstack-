'use client';
import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';

interface Deal {
  _id: string;
  title: string;
  description: string;
  partner: string;
  discount: string;
  eligibility: string;
  isLocked: boolean;
}

export default function DealDetails({ params }: { params: { id: string } }) {
  const [deal, setDeal] = useState<Deal | null>(null);
