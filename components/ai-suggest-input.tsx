"use client"

import { useEffect, useRef, useState } from "react"
import { Sparkles, Loader2 } from "lucide-react"
import { cn } from "@/lib/utils"

interface AiSuggestInputProps {
  type: "college" | "company"
  value: string
  onChange: (value: string) => void
  placeholder?: string
  className?: string
}

export function AiSuggestInput({ type, value, onChange, placeholder, className }: AiSuggestInputProps) {
  const [suggestions, setSuggestions] = useState<string[]>([])
  const [open, setOpen] = useState(false)
  const [loading, setLoading] = useState(false)
  const [activeIndex, setActiveIndex] = useState(-1)
  const containerRef = useRef<HTMLDivElement>(null)
  const justSelectedRef = useRef(false)

  // Debounced fetch of AI suggestions
  useEffect(() => {
    if (justSelectedRef.current) {
      justSelectedRef.current = false
      return
    }

    const query = value.trim()
    if (query.length < 2) {
      setSuggestions([])
      setOpen(false)
      return
    }

    const controller = new AbortController()
    setLoading(true)
    const timer = setTimeout(async () => {
      try {
        const res = await fetch("/api/suggest", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ type, query }),
          signal: controller.signal,
        })
        const data = (await res.json()) as { suggestions?: string[] }
        const next = (data.suggestions ?? []).filter(
          (s) => s.toLowerCase() !== query.toLowerCase(),
        )
        setSuggestions(next)
        setOpen(next.length > 0)
        setActiveIndex(-1)
      } catch (err) {
        if ((err as Error).name !== "AbortError") {
          setSuggestions([])
          setOpen(false)
        }
      } finally {
        setLoading(false)
      }
    }, 400)

    return () => {
      clearTimeout(timer)
      controller.abort()
    }
  }, [value, type])

  // Close dropdown on outside click
  useEffect(() => {
    function onDocClick(e: MouseEvent) {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setOpen(false)
      }
    }
    document.addEventListener("mousedown", onDocClick)
    return () => document.removeEventListener("mousedown", onDocClick)
  }, [])

  function select(name: string) {
    justSelectedRef.current = true
    onChange(name)
    setSuggestions([])
    setOpen(false)
    setActiveIndex(-1)
  }

  function onKeyDown(e: React.KeyboardEvent<HTMLInputElement>) {
    if (!open || suggestions.length === 0) return
    if (e.key === "ArrowDown") {
      e.preventDefault()
      setActiveIndex((i) => (i + 1) % suggestions.length)
    } else if (e.key === "ArrowUp") {
      e.preventDefault()
      setActiveIndex((i) => (i - 1 + suggestions.length) % suggestions.length)
    } else if (e.key === "Enter" && activeIndex >= 0) {
      e.preventDefault()
      select(suggestions[activeIndex])
    } else if (e.key === "Escape") {
      setOpen(false)
    }
  }

  return (
    <div ref={containerRef} className="relative">
      <div className="relative">
        <input
          value={value}
          onChange={(e) => onChange(e.target.value)}
          onFocus={() => suggestions.length > 0 && setOpen(true)}
          onKeyDown={onKeyDown}
          placeholder={placeholder}
          autoComplete="off"
          className={cn(
            "w-full bg-background border border-border rounded-xl px-3 py-2.5 pr-9 text-sm focus:outline-none focus:ring-2 focus:ring-ring",
            className,
          )}
        />
        <span className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground">
          {loading ? (
            <Loader2 className="w-4 h-4 animate-spin" />
          ) : (
            <Sparkles className="w-4 h-4 text-primary" />
          )}
        </span>
      </div>

      {open && suggestions.length > 0 && (
        <div className="absolute z-20 mt-1.5 w-full rounded-xl border border-border bg-popover shadow-lg overflow-hidden">
          <div className="flex items-center gap-1.5 px-3 py-1.5 border-b border-border/60">
            <Sparkles className="w-3 h-3 text-primary" />
            <span className="text-[11px] font-medium text-muted-foreground">AI suggestions</span>
          </div>
          <ul className="max-h-56 overflow-y-auto py-1">
            {suggestions.map((s, i) => (
              <li key={s}>
                <button
                  type="button"
                  onMouseEnter={() => setActiveIndex(i)}
                  onClick={() => select(s)}
                  className={cn(
                    "w-full text-left px-3 py-2 text-sm transition-colors",
                    i === activeIndex ? "bg-primary/10 text-primary" : "hover:bg-muted",
                  )}
                >
                  {s}
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  )
}
