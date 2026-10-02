import type { Metadata } from 'next'
import Link from 'next/link'
import { experiments } from '@/lib/content'
export const metadata: Metadata={title:'Research — Muhammad Hamza Mushtaq',description:'Evidence-driven multimodal AI and machine learning research by Muhammad Hamza Mushtaq.'}
export default function ResearchPage(){return <main className="section-shell simple-page"><p className="eyebrow">Research</p><h1>Questions,<br/><span>then evidence.</span></h1><p className="case-lede">I treat model development as a search: define the bottleneck, test one meaningful change, measure it honestly, and document the failure when it does not hold.</p><div className="research-list">{experiments.map((e,i)=><div key={e.title}><span className="eyebrow">0{i+1} / {e.label}</span><h2>{e.title}</h2><p>{e.body}</p><b>{e.metric} <small>{e.metricLabel}</small></b></div>)}</div><Link className="text-link" href="/work/caption-ai">View CaptionAI case study ↗</Link></main>}
