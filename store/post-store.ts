"use client"

import { create } from "zustand"
import { devtools } from "zustand/middleware"
import type { Post } from "@/types/post"
import { generateMockPosts } from "@/lib/mock-data"

interface PostState {
  posts: Post[]
  loading: boolean
  error: string | null
  hasMore: boolean
  page: number
  cache: Map<number, Post[]>
}

interface PostActions {
  fetchPosts: () => Promise<void>
  loadMorePosts: () => Promise<void>
  clearPosts: () => void
  setError: (error: string | null) => void
}

type PostStore = PostState & PostActions

const POSTS_PER_PAGE = 5
const MAX_PAGES = 20

export const usePostStore = create<PostStore>()(
  devtools(
    (set, get) => ({
      // State
      posts: [],
      loading: false,
      error: null,
      hasMore: true,
      page: 0,
      cache: new Map(),

      // Actions
      fetchPosts: async () => {
        const { loading, cache } = get()
        if (loading) return

        set({ loading: true, error: null })

        try {
          // Simulate API delay
          await new Promise((resolve) => setTimeout(resolve, 800))

          // Check cache first
          const cachedPosts = cache.get(1)
          if (cachedPosts) {
            set({
              posts: cachedPosts,
              loading: false,
              page: 1,
              hasMore: true,
            })
            return
          }

          const newPosts = generateMockPosts(1, POSTS_PER_PAGE)
          const newCache = new Map(cache)
          newCache.set(1, newPosts)

          set({
            posts: newPosts,
            loading: false,
            page: 1,
            hasMore: true,
            cache: newCache,
          })
        } catch (error) {
          set({
            loading: false,
            error: "Failed to load posts. Please try again.",
          })
        }
      },

      loadMorePosts: async () => {
        const { loading, hasMore, page, posts, cache } = get()
        if (loading || !hasMore) return

        set({ loading: true, error: null })

        try {
          // Simulate API delay
          await new Promise((resolve) => setTimeout(resolve, 600))

          const nextPage = page + 1

          // Check if we've reached the maximum
          if (nextPage > MAX_PAGES) {
            set({
              loading: false,
              hasMore: false,
            })
            return
          }

          // Check cache first
          const cachedPosts = cache.get(nextPage)
          if (cachedPosts) {
            set({
              posts: [...posts, ...cachedPosts],
              loading: false,
              page: nextPage,
              hasMore: nextPage < MAX_PAGES,
            })
            return
          }

          const newPosts = generateMockPosts(nextPage, POSTS_PER_PAGE)
          const newCache = new Map(cache)
          newCache.set(nextPage, newPosts)

          set({
            posts: [...posts, ...newPosts],
            loading: false,
            page: nextPage,
            hasMore: nextPage < MAX_PAGES,
            cache: newCache,
          })
        } catch (error) {
          set({
            loading: false,
            error: "Failed to load more posts. Please try again.",
          })
        }
      },

      clearPosts: () => {
        set({
          posts: [],
          page: 0,
          hasMore: true,
          error: null,
          cache: new Map(),
        })
      },

      setError: (error) => {
        set({ error })
      },
    }),
    {
      name: "post-store",
    },
  ),
)
