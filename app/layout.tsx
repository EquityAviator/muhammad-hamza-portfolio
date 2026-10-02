import type { Metadata } from 'next'
import { IBM_Plex_Mono, Space_Grotesk } from 'next/font/google'
import './globals.css'

const spaceGrotesk = Space_Grotesk({ subsets: ['latin'], variable: '--font-sans', display: 'swap' })
const ibmPlexMono = IBM_Plex_Mono({ subsets: ['latin'], variable: '--font-mono', display: 'swap', weight: ['400', '500', '600'] })
const siteUrl = 'https://4173-il5mbwzzs0j6ssmgzpuy4-9709572c.us1.manus.computer'

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: { default: 'Muhammad Hamza Mushtaq — Software & AI Engineer', template: '%s — Muhammad Hamza Mushtaq' },
  description: 'Muhammad Hamza Mushtaq builds evidence-backed AI systems, multimodal research, and full-stack products.',
  alternates: { canonical: '/' },
  openGraph: { title: 'Muhammad Hamza Mushtaq — Software & AI Engineer', description: 'AI systems, multimodal research, and full-stack products built with evidence and intent.', url: siteUrl, type: 'website', siteName: 'Muhammad Hamza Mushtaq' },
  twitter: { card: 'summary_large_image', title: 'Muhammad Hamza Mushtaq — Software & AI Engineer', description: 'AI systems, multimodal research, and full-stack products built with evidence and intent.' },
}

const structuredData = {
  '@context': 'https://schema.org',
  '@graph': [
    { '@type': 'Person', name: 'Muhammad Hamza Mushtaq', jobTitle: 'Software & AI Engineer', url: siteUrl, email: 'mailto:m.hamza.mushtaq.14@gmail.com', sameAs: ['https://github.com/EquityAviator', 'https://www.linkedin.com/in/muhammad-hamza-mushtaq-93b47428'] },
    { '@type': 'WebSite', name: 'Muhammad Hamza Mushtaq — Software & AI Engineer', url: siteUrl, description: 'Evidence-backed AI systems, multimodal research, and full-stack products.' },
  ],
}

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en" suppressHydrationWarning><body className={`${spaceGrotesk.variable} ${ibmPlexMono.variable}`}><script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }} />{children}</body></html>
}
