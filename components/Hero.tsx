'use client';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Box } from '@react-three/drei';
import { motion } from 'framer-motion';
import Link from 'next/link';

export default function Hero() {
  return (
    <div className="h-screen flex items-center justify-center bg-gradient-to-r from-blue-500 to-purple-600">
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        className="text-center text-white"
      >
        <h1 className="text-5xl font-bold mb-4">Unlock Startup Deals</h1>
        <p className="text-xl mb-8">Exclusive benefits on premium SaaS tools.</p>
        <Canvas className="w-32 h-32 mx-auto mb-8">
          <OrbitControls enableZoom={false} />
          <Box args={[1, 1, 1]} rotation={[0.5, 0.5, 0]}>
            <meshStandardMaterial color="orange" />
          </Box>
          <ambientLight intensity={0.5} />
          <directionalLight position={[0, 0, 5]} />
        </Canvas>
        <motion.div whileHover={{ scale: 1.1 }}>
          <Link href="/deals" className="bg-white text-blue-600 px-6 py-3 rounded-lg font-semibold">
            Explore Deals
          </Link>
        </motion.div>
      </motion.div>
    </div>
  );
}
