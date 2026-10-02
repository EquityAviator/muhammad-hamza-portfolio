import type { MetadataRoute } from 'next'
export default function robots(): MetadataRoute.Robots { return { rules: { userAgent: '*', allow: '/', disallow: ['/api/'] }, sitemap: 'https://muhammad-hamza-portfolio-qwz120987-2037.vercel.app/sitemap.xml' } }
