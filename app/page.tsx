"use client";

import { useEffect } from "react";
import { PostCard } from "@/components/post-card";
import { LoadingSkeleton } from "@/components/loading-skeleton";
import { usePostStore } from "@/store/post-store";
import { useInfiniteScroll } from "@/hooks/use-infinite-scroll";

export default function InfiniteScrollFeed() {
  const { posts, loading, hasMore, error, fetchPosts, loadMorePosts } =
    usePostStore();

  // Custom infinite scroll hook
  const { targetRef } = useInfiniteScroll({
    onIntersect: loadMorePosts,
    enabled: hasMore && !loading,
    threshold: 0.1,
    rootMargin: "100px",
  });

  // Initial load
  useEffect(() => {
    if (posts.length === 0) {
      fetchPosts();
    }
  }, [posts.length, fetchPosts]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800">
      <div className="container mx-auto px-4 py-8 max-w-2xl">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-2">
            Infinite Posts Feed
          </h1>
          <p className="text-slate-600 dark:text-slate-400">
            Scroll down to load more amazing content
          </p>
        </div>

        {/* Posts Feed */}
        <div className="space-y-6">
          {posts.map((post, index) => (
            <PostCard key={`${post.id}-${index}`} post={post} index={index} />
          ))}
        </div>

        {/* Loading State */}
        {loading && (
          <div className="mt-8 space-y-6">
            {Array.from({ length: 3 }).map((_, i) => (
              <LoadingSkeleton key={i} />
            ))}
          </div>
        )}

        {/* Error State */}
        {error && (
          <div className="mt-8 p-6 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-xl text-center">
            <p className="text-red-600 dark:text-red-400 font-medium">
              {error}
            </p>
            <button
              onClick={() => loadMorePosts()}
              className="mt-3 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
            >
              Try Again
            </button>
          </div>
        )}

        {/* End of Feed */}
        {!hasMore && posts.length > 0 && (
          <div className="mt-12 text-center">
            <div className="inline-flex items-center px-6 py-3 bg-white dark:bg-slate-800 rounded-full shadow-lg border border-slate-200 dark:border-slate-700">
              <span className="text-slate-600 dark:text-slate-400 font-medium">
                🎉 You've reached the end!
              </span>
            </div>
          </div>
        )}

        {/* Intersection Observer Target */}
        <div ref={targetRef} className="h-4" />
      </div>
    </div>
  );
}
