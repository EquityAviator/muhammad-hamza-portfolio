'use client'
import { useEffect, useRef } from 'react'
export default function Reveal({ children, className = '' }: { children: React.ReactNode; className?: string }) {
  const ref = useRef<HTMLDivElement>(null)
  useEffect(() => { const node = ref.current; if (!node) return; if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) { node.classList.add('visible'); return } const observer = new IntersectionObserver(([entry]) => { if (entry.isIntersecting) { node.classList.add('visible'); observer.disconnect() } }, { threshold: .12, rootMargin: '0px 0px -8% 0px' }); observer.observe(node); return () => observer.disconnect() }, [])
  return <div ref={ref} className={`reveal ${className}`}>{children}</div>
}
