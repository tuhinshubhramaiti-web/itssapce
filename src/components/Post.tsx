'use client'

import { useState } from 'react'
import { Heart, Ear, Users, Play, Pause } from 'lucide-react'

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
  const [isPlaying, setIsPlaying] = useState(false)

  const handleReaction = (reaction: string) => {
    setReactions(prev => ({
      ...prev,
      [reaction]: (prev[reaction] || 0) + 1
    }))
  }

  const togglePlay = () => {
    setIsPlaying(!isPlaying)
    // In a real app, this would control audio playback
  }

  return (
    <div className="bg-secondary rounded-xl p-4 shadow-lg border border-divider">
      {post.group && (
        <div className="mb-3">
          <span className="inline-block bg-accent text-primary text-xs px-2 py-1 rounded-full font-medium">
            {post.group}
          </span>
        </div>
      )}
      
      <div className="flex items-center mb-3">
        <div className="w-8 h-8 bg-accent rounded-full flex items-center justify-center text-primary font-bold text-sm mr-3">
          {post.anonymousId.split(' ')[1]?.[0] || 'A'}
        </div>
        <div>
          <span className="text-text font-medium">{post.anonymousId}</span>
          <span className="text-textSecondary text-xs ml-2">
            {post.timestamp.toLocaleDateString()} • {post.timestamp.toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}
          </span>
        </div>
      </div>
      
      <div className="mb-4">
        {post.type === 'text' ? (
          <p className="text-text leading-relaxed">{post.content}</p>
        ) : (
          <div className="bg-divider p-4 rounded-lg flex items-center justify-between">
            <div className="flex items-center">
              <button
                onClick={togglePlay}
                className="w-10 h-10 bg-accent rounded-full flex items-center justify-center text-primary mr-3"
              >
                {isPlaying ? <Pause className="w-5 h-5" /> : <Play className="w-5 h-5" />}
              </button>
              <div>
                <p className="text-text font-medium">Voice Message</p>
                <p className="text-textSecondary text-sm">0:45 / 1:23</p>
              </div>
            </div>
            <div className="flex space-x-1">
              <div className="w-2 h-8 bg-accent rounded"></div>
              <div className="w-2 h-6 bg-textSecondary rounded"></div>
              <div className="w-2 h-4 bg-textSecondary rounded"></div>
              <div className="w-2 h-10 bg-accent rounded"></div>
              <div className="w-2 h-7 bg-textSecondary rounded"></div>
            </div>
          </div>
        )}
      </div>
      
      <div className="flex flex-wrap gap-2">
        {Object.entries(reactionLabels).map(([key, label]) => (
          <button
            key={key}
            onClick={() => handleReaction(key)}
            className="flex items-center space-x-1 text-textSecondary hover:text-accent transition-colors bg-divider px-3 py-1 rounded-full text-sm"
          >
            {reactionIcons[key as keyof typeof reactionIcons]}
            <span>{label}</span>
            {reactions[key] > 0 && <span className="text-accent">({reactions[key]})</span>}
          </button>
        ))}
      </div>
    </div>
  )
}