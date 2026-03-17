import { Calendar, Clock, ArrowLeft } from "lucide-react";
import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

import GridBackground from "@/components/grid-background";
import { blogArticles, getBlogArticle } from "@/content/blog-articles";
import {
  JsonLd,
  createArticleSchema,
  createBreadcrumbSchema,
  createPageMetadata,
} from "@/lib/seo";

export function generateStaticParams() {
  return blogArticles.map((article) => ({
    slug: article.slug,
  }));
}

function parseContent(content: string) {
  const lines = content.split("\n");
  const elements: JSX.Element[] = [];
  let currentList: string[] = [];
  let inList = false;
  let key = 0;

  const flushList = () => {
    if (currentList.length > 0) {
      elements.push(
        <ul key={`list-${key++}`} className="my-6 space-y-3">
          {currentList.map((item, i) => (
            <li key={i} className="flex items-start gap-3 text-white/70">
              <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-[#2997ff]" />
              <span>{item.replace(/^- \*\*|^\*\*/, "").replace(/\*\*/g, "")}</span>
            </li>
          ))}
        </ul>
      );
      currentList = [];
      inList = false;
    }
  };

  lines.forEach((line) => {
    const trimmed = line.trim();

    if (trimmed === "") {
      flushList();
      return;
    }

    if (trimmed.startsWith("## ")) {
      flushList();
      elements.push(
        <h2 key={key++} className="mb-6 mt-12 text-2xl font-bold text-white">
          {trimmed.replace("## ", "")}
        </h2>
      );
      return;
    }

    if (trimmed.startsWith("### ")) {
      flushList();
      elements.push(
        <h3 key={key++} className="mb-4 mt-8 text-xl font-semibold text-white/90">
          {trimmed.replace("### ", "")}
        </h3>
      );
      return;
    }

    if (trimmed.startsWith("- ") || trimmed.startsWith("**")) {
      currentList.push(trimmed.replace("- ", "").replace(/\*\*/g, ""));
      inList = true;
      return;
    }

    if (inList && !trimmed.startsWith("- ")) {
      flushList();
    }

    const processedLine = trimmed
      .replace(/\*\*(.*?)\*\*/g, '<strong class="text-white">$1</strong>')
      .replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2" class="text-[#2997ff] hover:underline">$1</a>');

    elements.push(
      <p
        key={key++}
        className="mb-6 leading-relaxed text-white/70"
        dangerouslySetInnerHTML={{ __html: processedLine }}
      />
    );
  });

  flushList();
  return elements;
}

interface Props {
  params: { slug: string };
}

export function generateMetadata({ params }: Props): Metadata {
  const article = getBlogArticle(params.slug);

  if (!article) {
    return createPageMetadata({
      title: "Artikel nicht gefunden",
      description: "Der angeforderte Blogartikel konnte nicht gefunden werden.",
      path: "/blog",
      noIndex: true,
    });
  }

  return createPageMetadata({
    title: article.title,
    description: article.excerpt,
    path: `/blog/${article.slug}`,
    type: "article",
    keywords: article.keywords,
  });
}

export default function ArticlePage({ params }: Props) {
  const article = getBlogArticle(params.slug);

  if (!article) {
    notFound();
  }

  const contentElements = parseContent(article.content);

  return (
    <div className="relative min-h-screen bg-[#08090d]">
      <JsonLd
        data={createArticleSchema({
          title: article.title,
          description: article.excerpt,
          path: `/blog/${article.slug}`,
          publishedAt: article.publishedAt,
          updatedAt: article.updatedAt,
          author: article.author,
        })}
      />
      <JsonLd
        data={createBreadcrumbSchema([
          { name: "Startseite", path: "/" },
          { name: "Blog", path: "/blog" },
          { name: article.title, path: `/blog/${article.slug}` },
        ])}
      />

      <GridBackground />
      <div className="fixed inset-0 -z-10 bg-gradient-to-b from-transparent via-transparent to-[#0a0a0a]/80 pointer-events-none" />

      <div className="px-4 pb-4 pt-24 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-3xl">
          <Link href="/blog" className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm text-white/85 transition-all hover:border-white/20 hover:bg-white/10">
            <ArrowLeft className="h-4 w-4" />
            Alle Artikel
          </Link>
        </div>
      </div>

      <article className="px-4 pb-16 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-3xl">
          <div className="mb-6 flex flex-wrap items-center gap-3 text-sm">
            <span className="rounded-full border border-[#2997ff]/30 bg-[#2997ff]/10 px-3 py-1.5 font-medium text-[#2997ff]">
              {article.category}
            </span>
            <span className="flex items-center gap-1.5 text-white/50">
              <Calendar className="h-4 w-4" />
              {article.dateLabel}
            </span>
            <span className="flex items-center gap-1.5 text-white/50">
              <Clock className="h-4 w-4" />
              {article.readTime} Lesezeit
            </span>
          </div>

          <h1 className="mb-8 text-2xl font-bold leading-tight tracking-tight text-white sm:text-3xl md:text-4xl lg:text-5xl">
            {article.title}
          </h1>

          <div className="mb-10 flex items-center gap-4 border-b border-white/10 pb-8">
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-br from-[#2997ff] to-[#5856d6] text-base font-bold text-white">
              {article.author[0]}
            </div>
            <div>
              <p className="font-semibold text-white">{article.author}</p>
              <p className="text-sm text-white/50">Liminalo Team</p>
            </div>
          </div>

          <div className="article-content">{contentElements}</div>

          <div className="mt-12 rounded-2xl border border-white/10 bg-gradient-to-br from-[#2997ff]/10 via-transparent to-[#5856d6]/10 p-6 sm:p-8">
            <h3 className="mb-3 text-xl font-semibold text-white">Bereit für Ihre eigene Website?</h3>
            <p className="mb-6 text-sm text-white/60 sm:text-base">
              Lassen Sie uns besprechen, wie wir Ihnen mit einer klaren Website weiterhelfen können.
            </p>
            <Link href="/kontakt" className="inline-flex items-center justify-center rounded-full bg-gradient-to-r from-[#2997ff] to-[#5856d6] px-6 py-3 text-sm font-medium text-white transition-all duration-300 hover:scale-[1.02] hover:shadow-lg hover:shadow-[#2997ff]/25">
              Kontakt
            </Link>
          </div>
        </div>
      </article>
    </div>
  );
}
