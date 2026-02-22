'use client'

import { useState } from 'react'
import { Heart, Ear, Users } from 'lucide-react'

interface PostData {
  id: string
  userId: string
  anonymousId: string
  content: string
  type: 'text' | 'voice'
  timestamp: Date
  reactions: { [key: string]: number }
}

interface PostProps {
  post: PostData
}

const reactionIcons = {
  hear: <Ear className="w-5 h-5" />,
  alone: <Users className="w-5 h-5" />,
  empathy: <Heart className="w-5 h-5" />,
  hug: <Heart className="w-5 h-5" />,
}

const reactionLabels = {
  hear: "I hear you",
  alone: "You're not alone",
  empathy: "Empathy",
  hug: "Support hug",
}

export function Post({ post }: PostProps) {
  const [reactions, setReactions] = useState(post.reactions)

  const handleReaction = (reaction: string) => {
    setReactions(prev => ({
      ...prev,
      [reaction]: (prev[reaction] || 0) + 1
    }))
  }

  return (
    <div className="bg-secondary rounded-lg p-6 shadow-lg">
      <div className="flex items-center mb-4">
        <div className="w-10 h-10 bg-accent rounded-full flex items-center justify-center text-primary font-bold">
          {post.anonymousId.split(' ')[1]?.[0] || 'A'}
        </div>
        <span className="ml-3 text-textSecondary">{post.anonymousId}</span>
        <span className="ml-auto text-textSecondary text-sm">
          {post.timestamp.toLocaleDateString()}
        </span>
      </div>
      
      <div className="mb-4">
        {post.type === 'text' ? (
          <p className="text-text">{post.content}</p>
        ) : (
          <div className="bg-divider p-4 rounded">
            <p className="text-textSecondary">Voice message</p>
            {/* Placeholder for audio player */}
          </div>
        )}
      </div>
      
      <div className="flex space-x-4">
        {Object.entries(reactionLabels).map(([key, label]) => (
          <button
            key={key}
            onClick={() => handleReaction(key)}
            className="flex items-center space-x-2 text-textSecondary hover:text-accent transition-colors"
          >
            {reactionIcons[key as keyof typeof reactionIcons]}
            <span>{label}</span>
            {reactions[key] > 0 && <span>({reactions[key]})</span>}
          </button>
        ))}
      </div>
    </div>
  )
}