'use client'

import { useState, useEffect } from 'react'
import { Post } from '@/components/Post'
import { FloatingActionButton } from '@/components/FloatingActionButton'
import { AuthModal } from '@/components/AuthModal'
import { Groups } from '@/components/Groups'

interface PostData {
  id: string
  userId: string
  anonymousId: string
  content: string
  type: 'text' | 'voice'
  timestamp: Date
  reactions: { [key: string]: number }
  group?: string
}

const demoPosts: PostData[] = [
  {
    id: '1',
    userId: 'demo1',
    anonymousId: 'Listener #123',
    content: 'Feeling overwhelmed today. Work is piling up, and I just need a moment to breathe.',
    type: 'text',
    timestamp: new Date(Date.now() - 3600000),
    reactions: { hear: 5, alone: 3, empathy: 7 },
  },
  {
    id: '2',
    userId: 'demo2',
    anonymousId: 'Listener #456',
    content: 'Voice recording: Sharing my thoughts on anxiety...',
    type: 'voice',
    timestamp: new Date(Date.now() - 7200000),
    reactions: { hear: 8, alone: 2, empathy: 6, hug: 4 },
  },
  {
    id: '3',
    userId: 'demo3',
    anonymousId: 'Listener #789',
    content: 'Grateful for this space. It&apos;s hard to open up elsewhere.',
    type: 'text',
    timestamp: new Date(Date.now() - 10800000),
    reactions: { hear: 12, empathy: 9, hug: 5 },
    group: 'Mental Health Support',
  },
]

export function Feed() {
  const [posts, setPosts] = useState<PostData[]>(demoPosts)
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [showAuthModal, setShowAuthModal] = useState(false)
  const [activeTab, setActiveTab] = useState<'feed' | 'groups'>('feed')

  useEffect(() => {
    // Check authentication status
    setIsAuthenticated(true)
  }, [])

  const handleNewPost = (post: Omit<PostData, 'id' | 'timestamp'>) => {
    const newPost: PostData = {
      ...post,
      id: Date.now().toString(),
      timestamp: new Date(),
    }
    setPosts([newPost, ...posts])
  }

  if (!isAuthenticated) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-primary px-4">
        <AuthModal onClose={() => setShowAuthModal(false)} onAuth={() => setIsAuthenticated(true)} />
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-primary text-text">
      {/* Header */}
      <header className="sticky top-0 bg-primary border-b border-divider p-4 z-10">
        <div className="flex items-center justify-between max-w-md mx-auto">
          <h1 className="text-xl font-bold text-accent">It&apos;s a Space</h1>
          <div className="flex space-x-4">
            <button
              onClick={() => setActiveTab('feed')}
              className={`px-3 py-1 rounded-full text-sm ${activeTab === 'feed' ? 'bg-accent text-primary' : 'text-textSecondary'}`}
            >
              Feed
            </button>
            <button
              onClick={() => setActiveTab('groups')}
              className={`px-3 py-1 rounded-full text-sm ${activeTab === 'groups' ? 'bg-accent text-primary' : 'text-textSecondary'}`}
            >
              Groups
            </button>
          </div>
        </div>
      </header>

      {/* Content */}
      <main className="max-w-md mx-auto p-4 pb-20">
        {activeTab === 'feed' ? (
          <div className="space-y-4">
            {posts.map((post) => (
              <Post key={post.id} post={post} />
            ))}
          </div>
        ) : (
          <Groups />
        )}
      </main>

      <FloatingActionButton onNewPost={handleNewPost} />
    </div>
  )
}