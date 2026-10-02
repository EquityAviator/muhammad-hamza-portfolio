import type { MetadataRoute } from 'next'
import { projects } from '@/lib/content'
const base = 'https://4173-il5mbwzzs0j6ssmgzpuy4-9709572c.us1.manus.computer'
export default function sitemap(): MetadataRoute.Sitemap { const staticRoutes = ['', '/work', '/about', '/research', '/contact']; return [...staticRoutes.map((route) => ({ url: `${base}${route}`, lastModified: new Date('2026-10-01'), changeFrequency: 'monthly' as const, priority: route === '' ? 1 : .7 })), ...projects.map((project) => ({ url: `${base}/work/${project.slug}`, lastModified: new Date('2026-10-01'), changeFrequency: 'monthly' as const, priority: project.featured ? .8 : .6 }))] }
