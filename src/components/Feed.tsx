'use client'

import { useState, useEffect } from 'react'
import { Post } from '@/components/Post'
import { FloatingActionButton } from '@/components/FloatingActionButton'
import { AuthModal } from '@/components/AuthModal'

interface PostData {
  id: string
  userId: string
  anonymousId: string
  content: string
  type: 'text' | 'voice'
  timestamp: Date
  reactions: { [key: string]: number }
}

export function Feed() {
  const [posts, setPosts] = useState<PostData[]>([])
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [showAuthModal, setShowAuthModal] = useState(false)

  useEffect(() => {
    // Check authentication status
    // For now, assume anonymous
    setIsAuthenticated(true)
  }, [])

  const handleNewPost = (post: Omit<PostData, 'id' | 'timestamp'>) => {
    const newPost: PostData = {
      ...post,
      id: Date.now().toString(),
      timestamp: new Date(),
      reactions: {}
    }
    setPosts([newPost, ...posts])
  }

  if (!isAuthenticated) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <button
          onClick={() => setShowAuthModal(true)}
          className="bg-accent text-primary px-6 py-3 rounded-lg font-medium"
        >
          Enter Anonymously
        </button>
        {showAuthModal && <AuthModal onClose={() => setShowAuthModal(false)} onAuth={() => setIsAuthenticated(true)} />}
      </div>
    )
  }

  return (
    <div className="max-w-2xl mx-auto p-4">
      <h1 className="text-2xl font-bold text-center mb-8 text-text">
        Welcome to Your Safe Space
      </h1>
      <div className="space-y-6">
        {posts.map((post) => (
          <Post key={post.id} post={post} />
        ))}
      </div>
      <FloatingActionButton onNewPost={handleNewPost} />
    </div>
  )
}