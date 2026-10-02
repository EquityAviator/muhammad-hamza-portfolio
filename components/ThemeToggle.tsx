'use client'

import { useEffect, useState } from 'react'

type Theme = 'dark' | 'light'

export default function ThemeToggle() {
  const [theme, setTheme] = useState<Theme>('dark')
  useEffect(() => { const saved = window.localStorage.getItem('portfolio-theme') as Theme | null; const preferred = window.matchMedia('(prefers-color-scheme: light)').matches ? 'light' : 'dark'; const next = saved === 'light' || saved === 'dark' ? saved : preferred; document.documentElement.dataset.theme = next; setTheme(next) }, [])
  const toggle = () => { const next = theme === 'dark' ? 'light' : 'dark'; document.documentElement.dataset.theme = next; window.localStorage.setItem('portfolio-theme', next); setTheme(next) }
  return <button className="theme-toggle" onClick={toggle} aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`} title={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}><span className="theme-icon">{theme === 'dark' ? '☼' : '◐'}</span><span className="theme-copy">{theme === 'dark' ? 'Light' : 'Dark'}</span></button>
}
