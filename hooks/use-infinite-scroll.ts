"use client"

import { useRef, useEffect, useCallback } from "react"

interface UseInfiniteScrollOptions {
  onIntersect: () => void
  enabled?: boolean
  threshold?: number
  rootMargin?: string
  debounceMs?: number
}

export function useInfiniteScroll({
  onIntersect,
  enabled = true,
  threshold = 0.1,
  rootMargin = "0px",
  debounceMs = 300,
}: UseInfiniteScrollOptions) {
  const targetRef = useRef<HTMLDivElement>(null)
  const timeoutRef = useRef<NodeJS.Timeout>()

  // Debounced callback
  const debouncedCallback = useCallback(() => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current)
    }

    timeoutRef.current = setTimeout(() => {
      onIntersect()
    }, debounceMs)
  }, [onIntersect, debounceMs])

  useEffect(() => {
    const target = targetRef.current
    if (!target || !enabled) return

    const observer = new IntersectionObserver(
      (entries) => {
        const [entry] = entries
        if (entry.isIntersecting) {
          debouncedCallback()
        }
      },
      {
        threshold,
        rootMargin,
      },
    )

    observer.observe(target)

    return () => {
      observer.unobserve(target)
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current)
      }
    }
  }, [enabled, threshold, rootMargin, debouncedCallback])

  return { targetRef }
}
