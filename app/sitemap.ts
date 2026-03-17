import { MetadataRoute } from 'next'

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: 'https://liminalo.com',
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 1,
    },
    {
      url: 'https://liminalo.com/branchen',
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.9,
    },
    {
      url: 'https://liminalo.com/kontakt',
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: 'https://liminalo.com/blog',
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.8,
    },
    {
      url: 'https://liminalo.com/blog/warum-jede-kleine-firma-website-braucht',
      lastModified: new Date('2026-03-05'),
      changeFrequency: 'monthly',
      priority: 0.7,
    },
    {
      url: 'https://liminalo.com/blog/website-vs-instagram',
      lastModified: new Date('2026-02-28'),
      changeFrequency: 'monthly',
      priority: 0.7,
    },
    {
      url: 'https://liminalo.com/blog/5-groesste-fehler-website-erstellung',
      lastModified: new Date('2026-02-20'),
      changeFrequency: 'monthly',
      priority: 0.7,
    },
    {
      url: 'https://liminalo.com/impressum',
      lastModified: new Date(),
      changeFrequency: 'yearly',
      priority: 0.3,
    },
    {
      url: 'https://liminalo.com/datenschutz',
      lastModified: new Date(),
      changeFrequency: 'yearly',
      priority: 0.3,
    },
    {
      url: 'https://liminalo.com/agb',
      lastModified: new Date(),
      changeFrequency: 'yearly',
      priority: 0.3,
    },
  ]
}