import type { Metadata } from 'next'
import Link from 'next/link'
export const metadata: Metadata={title:'About — Muhammad Hamza Mushtaq',description:'About Muhammad Hamza Mushtaq, Software & AI Engineer.'}
export default function AboutPage(){return <main className="section-shell simple-page"><p className="eyebrow">About</p><h1>Software &amp;<br/><span>AI Engineer.</span></h1><p className="case-lede">I build AI-enabled software across machine learning, computer vision, multimodal systems, and full-stack product engineering.</p><p>My work spans dataset creation, model fine-tuning, evaluation, inference, API integration, and user-facing systems. I care about evidence, observability, and honest trade-offs.</p><Link className="text-link" href="/resume">View resume ↗</Link></main>}
