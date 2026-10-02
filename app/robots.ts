import type { MetadataRoute } from 'next'
export default function robots(): MetadataRoute.Robots { return { rules: { userAgent: '*', allow: '/', disallow: ['/api/'] }, sitemap: 'https://4173-il5mbwzzs0j6ssmgzpuy4-9709572c.us1.manus.computer/sitemap.xml' } }
