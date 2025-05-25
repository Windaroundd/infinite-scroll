import type { Post, Author } from "@/types/post"

const authors: Author[] = [
  {
    id: "1",
    name: "Alex Johnson",
    username: "alexj",
    avatar: "/placeholder.svg?height=40&width=40",
  },
  {
    id: "2",
    name: "Sarah Chen",
    username: "sarahc",
    avatar: "/placeholder.svg?height=40&width=40",
  },
  {
    id: "3",
    name: "Mike Rodriguez",
    username: "mikerod",
    avatar: "/placeholder.svg?height=40&width=40",
  },
  {
    id: "4",
    name: "Emily Davis",
    username: "emilyd",
    avatar: "/placeholder.svg?height=40&width=40",
  },
  {
    id: "5",
    name: "David Kim",
    username: "davidk",
    avatar: "/placeholder.svg?height=40&width=40",
  },
]

const postTitles = [
  "Building the Future of Web Development",
  "10 Tips for Better Code Organization",
  "The Art of Clean Architecture",
  "Mastering React Performance",
  "TypeScript Best Practices",
  "Modern CSS Techniques",
  "Database Design Patterns",
  "API Security Fundamentals",
  "Mobile-First Development",
  "DevOps for Beginners",
]

const postContents = [
  "Exploring the latest trends in web development and how they're shaping the future of digital experiences. From AI integration to progressive web apps, the landscape is evolving rapidly.",
  "Code organization is crucial for maintainable software. Here are some proven strategies that have helped me throughout my career as a developer.",
  "Clean architecture isn't just about code structure—it's about creating systems that are testable, maintainable, and adaptable to change.",
  "Performance optimization in React can make or break user experience. Let's dive into some advanced techniques that actually work.",
  "TypeScript has revolutionized how we write JavaScript. These practices will help you leverage its full potential in your projects.",
  "CSS has come a long way. Modern techniques like Grid, Flexbox, and custom properties are changing how we approach styling.",
  "Good database design is the foundation of any robust application. These patterns will help you build scalable data architectures.",
  "Security should never be an afterthought. Learn the fundamentals of protecting your APIs from common vulnerabilities.",
  "Mobile-first isn't just a buzzword—it's a necessity. Here's how to approach development with mobile users in mind.",
  "DevOps might seem intimidating, but these fundamentals will get you started on the right path.",
]

const tags = [
  ["webdev", "javascript", "react"],
  ["coding", "bestpractices", "clean-code"],
  ["architecture", "design", "patterns"],
  ["react", "performance", "optimization"],
  ["typescript", "javascript", "types"],
  ["css", "frontend", "design"],
  ["database", "sql", "design"],
  ["security", "api", "backend"],
  ["mobile", "responsive", "ux"],
  ["devops", "deployment", "ci-cd"],
]

const timeAgoOptions = ["2m", "5m", "15m", "1h", "2h", "4h", "8h", "1d", "2d", "3d"]

export function generateMockPosts(page: number, count: number): Post[] {
  const posts: Post[] = []
  const startIndex = (page - 1) * count

  for (let i = 0; i < count; i++) {
    const index = (startIndex + i) % postTitles.length
    const authorIndex = (startIndex + i) % authors.length

    posts.push({
      id: `post-${startIndex + i + 1}`,
      title: postTitles[index],
      content: postContents[index],
      author: authors[authorIndex],
      timeAgo: timeAgoOptions[Math.floor(Math.random() * timeAgoOptions.length)],
      likes: Math.floor(Math.random() * 500) + 10,
      comments: Math.floor(Math.random() * 50) + 1,
      shares: Math.floor(Math.random() * 25) + 1,
      image: Math.random() > 0.3 ? `/placeholder.svg?height=300&width=600` : undefined,
      tags: tags[index],
    })
  }

  return posts
}
