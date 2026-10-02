'use client'

import { useState } from 'react'
import { experiments } from '@/lib/content'

export default function ResearchTimeline() {
  const [active, setActive] = useState(3)
  const current = experiments[active]
  return <div className="timeline"><div className="timeline-tabs" role="tablist" aria-label="CaptionAI experiments">{experiments.map((experiment, index) => <button key={experiment.title} className={`timeline-item ${active === index ? 'active' : ''}`} role="tab" aria-selected={active === index} onClick={() => setActive(index)}><span>{index === 0 ? 'GEN 01' : index === 1 ? 'GEN 02' : index === 2 ? 'GEN 02-RL' : 'GEN 03 ★'}</span><b>{experiment.title}</b><small>{index === 0 ? 'baseline · establish a protocol' : index === 1 ? 'recover space · reduce vocabulary pressure' : index === 2 ? 'optimize caption quality with reward' : 'language-aligned features · champion'}</small></button>)}</div><div className="timeline-detail" role="tabpanel"><p className="eyebrow">{current.label}</p><h3>{current.title}</h3><p>{current.body}</p><div className="exp-metric"><b>{current.metric}</b><span>{current.metricLabel}</span></div></div></div>
}
