"use client";

import React, { useState } from 'react';
import { cn } from '@/lib/utils';
import { ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';
import { 
  RocketLaunch, 
  ShieldCheck, 
  CursorClick,
  TrendUp,
  Lightning,
  Crown
} from '@phosphor-icons/react';

// Define the type for a single benefit item
export interface Benefit {
  id: string | number;
  title: string;
  headline: string;
  description: string;
  highlight: string;
  accent: string;
  icon?: React.ReactNode;
  onClick?: () => void;
}

// Define the props for the BenefitsList component
export interface BenefitsListProps {
  title?: string;
  subtitle?: string;
  benefits: Benefit[];
  className?: string;
}

export const BenefitsList = ({
  benefits,
  className,
}: BenefitsListProps) => {
  const [hoveredItem, setHoveredItem] = useState<string | number | null>(null);

  return (
    <div className={cn("w-full bg-transparent text-white py-16 md:py-24 relative", className)}>
      {/* Grid Background */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(41,151,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(41,151,255,0.03)_1px,transparent_1px)] bg-[size:40px_40px] opacity-50 pointer-events-none" />
      
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header Section */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12 md:mb-16"
        >
          <motion.div 
            initial={{ scale: 0.8, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="inline-flex items-center justify-center w-14 h-14 rounded-full bg-gradient-to-br from-[#2997ff]/80 to-[#2997ff] mb-6 text-white shadow-lg shadow-[#2997ff]/20"
          >
            <Crown className="w-7 h-7" weight="fill" />
          </motion.div>
          <h2 className="text-3xl md:text-5xl font-bold mb-2 tracking-tight text-white">
            Was eine starke <span className="text-[#2997ff]">Website</span> wirklich bringt
          </h2>
        </motion.div>

        {/* Benefits List */}
        <div className="space-y-4">
          {benefits.map((benefit, index) => (
            <motion.div
              key={benefit.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
              className="relative group"
              onMouseEnter={() => setHoveredItem(benefit.id)}
              onMouseLeave={() => setHoveredItem(null)}
              onClick={benefit.onClick}
            >
              <motion.div
                className={cn(
                  "relative overflow-hidden rounded-2xl border transition-all duration-500 ease-out cursor-pointer",
                  hoveredItem === benefit.id
                    ? 'border-[#2997ff] shadow-lg shadow-[#2997ff]/20 bg-[#2997ff]/5'
                    : 'border-white/10 bg-white/[0.02] hover:border-white/20'
                )}
                animate={{
                  height: hoveredItem === benefit.id ? 140 : 100,
                }}
                transition={{ duration: 0.4, ease: [0.4, 0, 0.2, 1] }}
              >
                {/* Animated background glow */}
                <motion.div 
                  className="absolute inset-0 bg-gradient-to-r from-[#2997ff]/10 to-transparent"
                  initial={{ opacity: 0, x: -100 }}
                  animate={{ 
                    opacity: hoveredItem === benefit.id ? 1 : 0,
                    x: hoveredItem === benefit.id ? 0 : -100
                  }}
                  transition={{ duration: 0.5 }}
                />

                {/* Corner brackets that appear on hover */}
                {hoveredItem === benefit.id && (
                  <>
                    <motion.div 
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      className="absolute top-4 left-4 w-6 h-6"
                    >
                      <motion.div 
                        className="absolute top-0 left-0 w-5 h-[2px] bg-[#2997ff]"
                        initial={{ width: 0 }}
                        animate={{ width: 20 }}
                        transition={{ duration: 0.3, delay: 0.1 }}
                      />
                      <motion.div 
                        className="absolute top-0 left-0 w-[2px] h-5 bg-[#2997ff]"
                        initial={{ height: 0 }}
                        animate={{ height: 20 }}
                        transition={{ duration: 0.3, delay: 0.1 }}
                      />
                    </motion.div>
                    <motion.div 
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      className="absolute bottom-4 right-4 w-6 h-6"
                    >
                      <motion.div 
                        className="absolute bottom-0 right-0 w-5 h-[2px] bg-[#2997ff]"
                        initial={{ width: 0 }}
                        animate={{ width: 20 }}
                        transition={{ duration: 0.3, delay: 0.1 }}
                      />
                      <motion.div 
                        className="absolute bottom-0 right-0 w-[2px] h-5 bg-[#2997ff]"
                        initial={{ height: 0 }}
                        animate={{ height: 20 }}
                        transition={{ duration: 0.3, delay: 0.1 }}
                      />
                    </motion.div>
                  </>
                )}

                {/* Content */}
                <div className="flex items-center justify-between h-full px-6 md:px-8">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-1">
                      <motion.div 
                        className={cn(
                          "transition-all duration-300",
                          hoveredItem === benefit.id ? 'text-[#2997ff] scale-110' : 'text-white/40'
                        )}
                        animate={{
                          rotate: hoveredItem === benefit.id ? [0, -10, 10, 0] : 0,
                        }}
                        transition={{ duration: 0.5 }}
                      >
                        {benefit.icon}
                      </motion.div>
                      <h3
                        className={cn(
                          "font-bold transition-all duration-300",
                          hoveredItem === benefit.id ? 'text-2xl md:text-3xl text-white' : 'text-xl md:text-2xl text-white/90'
                        )}
                      >
                        {benefit.headline}
                      </h3>
                    </div>
                    
                    {/* Expandable description on hover */}
                    <motion.div 
                      className="overflow-hidden"
                      initial={false}
                      animate={{
                        height: hoveredItem === benefit.id ? 'auto' : 0,
                        opacity: hoveredItem === benefit.id ? 1 : 0,
                      }}
                      transition={{ duration: 0.3 }}
                    >
                      <p className="text-sm md:text-base text-white/70 mt-2">
                        {benefit.description}
                      </p>
                    </motion.div>
                  </div>

                  {/* Right side: Badge and Arrow */}
                  <div className="flex items-center gap-4">
                    {/* Highlight Badge */}
                    <motion.span 
                      className={cn(
                        "hidden sm:inline-flex items-center px-3 py-1 rounded-full text-xs font-medium transition-all duration-300",
                        hoveredItem === benefit.id 
                          ? 'bg-[#2997ff]/20 text-[#2997ff] border border-[#2997ff]/30' 
                          : 'bg-white/5 text-white/50 border border-white/10'
                      )}
                      animate={{
                        scale: hoveredItem === benefit.id ? 1.05 : 1,
                      }}
                    >
                      {benefit.highlight}
                    </motion.span>
                    
                    {/* Arrow appears on hover */}
                    <motion.div 
                      className="text-[#2997ff]"
                      initial={false}
                      animate={{
                        opacity: hoveredItem === benefit.id ? 1 : 0,
                        x: hoveredItem === benefit.id ? 0 : -10,
                      }}
                      transition={{ duration: 0.3 }}
                    >
                      <ArrowRight className="w-6 h-6" />
                    </motion.div>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

// Default benefits data for Liminalo with Phosphor Icons
export const defaultBenefits: Benefit[] = [
  {
    id: 'growth',
    title: 'Mehr Anfragen',
    headline: 'Qualifizierte Leads',
    description: 'Ein klarer Auftritt zieht die richtigen Kunden an. Kein Chaos, nur Ergebnisse.',
    highlight: '+42% mehr Leads',
    accent: '#2997ff',
    icon: <RocketLaunch className="w-6 h-6" weight="duotone" />,
  },
  {
    id: 'trust',
    title: 'Mehr Vertrauen',
    headline: 'Sofortiger Eindruck',
    description: 'Professionelles Design schafft Vertrauen in Sekunden. Nicht in Stunden.',
    highlight: 'starker Eindruck',
    accent: '#6d5efc',
    icon: <ShieldCheck className="w-6 h-6" weight="duotone" />,
  },
  {
    id: 'impact',
    title: 'Mehr Wirkung',
    headline: 'Höhere Conversion',
    description: 'Design, Botschaft und Technik greifen perfekt zusammen. Maximaler Impact.',
    highlight: 'bessere Conversion',
    accent: '#16d5c0',
    icon: <CursorClick className="w-6 h-6" weight="duotone" />,
  },
];
