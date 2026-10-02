import type { MetadataRoute } from 'next'
export default function robots(): MetadataRoute.Robots { return { rules: { userAgent: '*', allow: '/', disallow: ['/api/'] }, sitemap: 'https://muhammad-hamza-portfolio-sable.vercel.app/sitemap.xml' } }
