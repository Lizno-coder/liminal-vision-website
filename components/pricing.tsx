'use client';

import React, { useMemo, useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Check } from 'lucide-react';
import { SpecialText } from "@/components/ui/special-text";
import { LiquidButton } from "@/components/ui/liquid-glass-button";
import { FlowGradientBackground } from "@/components/ui/flow-gradient";

type PageOption = {
  id: string;
  label: string;
  pages: number;
  price: number;
};

type DesignOption = {
  id: string;
  label: string;
  price: number;
};

type AddonOption = {
  id: string;
  label: string;
  price: number;
};

const pageOptions: PageOption[] = [
  { id: '1pg', label: '1 Seite', pages: 1, price: 50 },
  { id: '3pg', label: '3 Seiten', pages: 3, price: 100 },
  { id: '5pg', label: '5 Seiten', pages: 5, price: 150 },
  { id: '10pg', label: '10 Seiten', pages: 10, price: 250 },
];

const designOptions: DesignOption[] = [
  { id: 'clean', label: 'Clean', price: 0 },
  { id: 'premium', label: 'Premium', price: 50 },
  { id: 'animated', label: 'Animated', price: 150 },
];

const addonOptions: AddonOption[] = [
  { id: 'domain', label: 'Domain (1 Jahr)', price: 15 },
  { id: 'hosting', label: 'Hosting (1 Jahr)', price: 60 },
];

function formatPrice(value: number): string {
  return `${value}€`;
}

export default function Pricing(): React.JSX.Element {
  const [selectedPageId, setSelectedPageId] = useState<string>('3pg');
  const [selectedDesignId, setSelectedDesignId] = useState<string>('clean');
  const [selectedAddons, setSelectedAddons] = useState<Set<string>>(new Set(['hosting']));

  const selectedPage = useMemo(
    () => pageOptions.find((option) => option.id === selectedPageId) ?? pageOptions[0],
    [selectedPageId]
  );

  const selectedDesign = useMemo(
    () => designOptions.find((option) => option.id === selectedDesignId) ?? designOptions[0],
    [selectedDesignId]
  );

  const addonsTotal = useMemo(() => {
    return addonOptions.reduce((sum, addon) => {
      return selectedAddons.has(addon.id) ? sum + addon.price : sum;
    }, 0);
  }, [selectedAddons]);

  const totalPrice = selectedPage.price + selectedDesign.price + addonsTotal;

  const toggleAddon = (id: string) => {
    setSelectedAddons((prev) => {
      const next = new Set(prev);
      if (next.has(id)) {
        next.delete(id);
      } else {
        next.add(id);
      }
      return next;
    });
  };

  return (
    <section id="pricing" className="relative bg-[#0a0a0a] px-4 py-16 sm:px-6 lg:py-24">
      <div className="mx-auto max-w-2xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-8 text-center"
        >
          <span className="mb-3 inline-block rounded-full border border-[#2997ff]/30 bg-[#2997ff]/10 px-4 py-1.5 text-sm text-[#2997ff]">
            Preis-Rechner
          </span>
          <h2 className="text-3xl font-bold text-white md:text-4xl">
            Was kostet Ihre{" "}
            <SpecialText inView once delay={0.3} className="text-[#2997ff]">
              Website?
            </SpecialText>
          </h2>
          <p className="mx-auto mt-3 max-w-md text-white/60">
            Wählen Sie Seiten, Design & Extras. Ab 50€.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <FlowGradientBackground 
            className="overflow-hidden rounded-3xl border border-white/10 p-6 backdrop-blur-xl md:p-8"
            variant="blue"
            intensity="high"
          >
          {/* Pages */}
          <div className="mb-6">
            <div className="mb-3 flex justify-between">
              <span className="text-sm text-white/70">Seiten</span>
              <span className="text-sm text-[#2997ff]">{selectedPage.label}</span>
            </div>
            <div className="grid grid-cols-4 gap-2">
              {pageOptions.map((option) => (
                <motion.button
                  key={option.id}
                  onClick={() => setSelectedPageId(option.id)}
                  whileTap={{ scale: 0.98 }}
                  className={`min-h-[60px] rounded-xl p-2 text-center text-xs font-medium transition-all md:text-sm ${
                    selectedPageId === option.id
                      ? 'bg-gradient-to-r from-[#2997ff] to-[#5856d6] text-white shadow-lg'
                      : 'border border-white/10 bg-white/5 text-white/70'
                  }`}
                >
                  <div>{option.label}</div>
                  <div className="text-[10px] opacity-70">{formatPrice(option.price)}</div>
                </motion.button>
              ))}
            </div>
          </div>

          {/* Design */}
          <div className="mb-6">
            <div className="mb-3 flex justify-between">
              <span className="text-sm text-white/70">Design</span>
              <span className="text-sm text-[#2997ff]">{selectedDesign.label}</span>
            </div>
            <div className="grid grid-cols-3 gap-2">
              {designOptions.map((option) => (
                <motion.button
                  key={option.id}
                  onClick={() => setSelectedDesignId(option.id)}
                  whileTap={{ scale: 0.98 }}
                  className={`min-h-[60px] rounded-xl p-2 text-center text-sm font-medium transition-all ${
                    selectedDesignId === option.id
                      ? 'bg-gradient-to-r from-[#2997ff] to-[#5856d6] text-white shadow-lg'
                      : 'border border-white/10 bg-white/5 text-white/70'
                  }`}
                >
                  <div>{option.label}</div>
                  {option.price > 0 && <div className="text-[10px] opacity-70">+{option.price}€</div>}
                </motion.button>
              ))}
            </div>
          </div>

          {/* Addons */}
          <div className="mb-6 border-t border-white/10 pt-6">
            <p className="mb-3 text-sm text-white/70">Optionale Extras</p>
            <div className="grid grid-cols-2 gap-3">
              {addonOptions.map((option) => (
                <motion.button
                  key={option.id}
                  onClick={() => toggleAddon(option.id)}
                  whileTap={{ scale: 0.98 }}
                  className={`flex min-h-[60px] items-center justify-between rounded-xl border p-4 text-left transition-all ${
                    selectedAddons.has(option.id)
                      ? 'border-[#2997ff]/50 bg-[#2997ff]/10'
                      : 'border-white/10 bg-white/5'
                  }`}
                >
                  <div>
                    <div className="text-sm font-medium text-white/90">{option.label}</div>
                    <div className="text-xs text-white/50">+{option.price}€</div>
                  </div>
                  {selectedAddons.has(option.id) && <Check className="h-5 w-5 text-[#2997ff]" />}
                </motion.button>
              ))}
            </div>
          </div>

          {/* Total */}
          <div className="border-t border-white/10 pt-6">
            <div className="flex items-end justify-between">
              <div>
                <p className="text-sm text-white/50">Schätzung</p>
                <motion.p
                  key={totalPrice}
                  initial={{ scale: 1.1 }}
                  animate={{ scale: 1 }}
                  className="text-4xl font-bold text-white"
                >
                  {formatPrice(totalPrice)}
                </motion.p>
              </div>
              <a href="/kontakt">
                <LiquidButton
                  variant="primary"
                  size="lg"
                  className="group"
                >
                  Anfragen
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                </LiquidButton>
              </a>
            </div>
            <p className="mt-3 text-xs text-white/40">Nur eine Schätzung. Finaler Preis vor Projektstart vereinbart.</p>
            </div>
          </FlowGradientBackground>
        </motion.div>
      </div>
    </section>
  );
}
