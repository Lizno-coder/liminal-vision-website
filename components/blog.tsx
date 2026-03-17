"use client";

import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import Link from "next/link";

import { blogArticles } from "@/content/blog-articles";

export default function Blog() {
  return (
    <section id="blog" className="px-4 py-16 sm:px-6">
      <div className="mx-auto max-w-4xl">
        <div className="mb-8 flex items-end justify-between">
          <div>
            <p className="mb-1 text-sm uppercase tracking-[0.2em] text-[#2997ff]">Blog</p>
            <h2 className="text-2xl font-semibold text-white">Tipps & Tricks</h2>
          </div>
          <Link href="/blog" className="text-sm text-[#2997ff] hover:underline">
            Alle ansehen
          </Link>
        </div>

        <div className="grid gap-3 sm:grid-cols-3">
          {blogArticles.slice(0, 3).map((post, i) => (
            <motion.div
              key={post.slug}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
            >
              <Link
                href={`/blog/${post.slug}`}
                className="group flex items-center justify-between rounded-xl border border-white/10 bg-white/[0.03] p-4 transition-colors hover:border-white/20"
              >
                <span className="font-medium text-white">{post.title}</span>
                <ArrowRight className="h-4 w-4 text-[#2997ff] transition-transform group-hover:translate-x-1" />
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
