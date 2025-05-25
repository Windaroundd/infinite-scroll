export interface Author {
  id: string
  name: string
  username: string
  avatar: string
}

export interface Post {
  id: string
  title: string
  content: string
  author: Author
  timeAgo: string
  likes: number
  comments: number
  shares: number
  image?: string
  tags?: string[]
}
