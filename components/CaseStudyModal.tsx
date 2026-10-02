'use client'

import { useEffect } from 'react'
import type { Project } from '@/lib/content'

type Props = { project: Project | null; onClose: () => void }

export default function CaseStudyModal({ project, onClose }: Props) {
  useEffect(() => {
    if (!project) return
    const previous = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    const onKey = (event: KeyboardEvent) => event.key === 'Escape' && onClose()
    window.addEventListener('keydown', onKey)
    return () => { document.body.style.overflow = previous; window.removeEventListener('keydown', onKey) }
  }, [project, onClose])

  if (!project) return null
  return <div className="modal open" role="presentation"><button className="modal-backdrop" aria-label="Close case study" onClick={onClose} /><article className="modal-panel" role="dialog" aria-modal="true" aria-labelledby="modal-title"><button className="modal-close" onClick={onClose} aria-label="Close case study">×</button><p className="eyebrow">{project.number} / {project.kicker} · {project.meta}</p><h2 id="modal-title">{project.title}</h2><p className="modal-summary">{project.summary}</p><div className="modal-grid"><div><span className="modal-label">Problem</span><p>{project.problem}</p></div><div><span className="modal-label">What I built</span><p>{project.built}</p></div><div><span className="modal-label">Evidence</span><p>{project.evidence}</p></div><div><span className="modal-label">Stack</span><p>{project.stack}</p></div></div><a className="button button-primary" href="#contact" onClick={onClose}>Discuss a similar problem <span>↗</span></a></article></div>
}
