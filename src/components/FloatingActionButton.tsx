'use client'

import { useState } from 'react'
import { Plus, Mic, Type } from 'lucide-react'
import { PostModal } from '@/components/PostModal'

interface FloatingActionButtonProps {
  onNewPost: (post: { userId: string; anonymousId: string; content: string; type: 'text' | 'voice'; reactions: { [key: string]: number } }) => void
}

export function FloatingActionButton({ onNewPost }: FloatingActionButtonProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [showPostModal, setShowPostModal] = useState(false)
  const [postType, setPostType] = useState<'text' | 'voice'>('text')

  const handlePost = (type: 'text' | 'voice') => {
    setPostType(type)
    setShowPostModal(true)
    setIsOpen(false)
  }

  const handleSubmitPost = (content: string) => {
    onNewPost({
      userId: 'anonymous',
      anonymousId: `Listener #${Math.floor(Math.random() * 1000)}`,
      content,
      type: postType,
      reactions: {}
    })
    setShowPostModal(false)
  }

  return (
    <>
      <div className="fixed bottom-6 right-6">
        {isOpen && (
          <div className="mb-4 space-y-2">
            <button
              onClick={() => handlePost('text')}
              className="flex items-center justify-center w-12 h-12 bg-secondaryAccent rounded-full text-white shadow-lg hover:bg-opacity-80 transition-colors"
            >
              <Type className="w-6 h-6" />
            </button>
            <button
              onClick={() => handlePost('voice')}
              className="flex items-center justify-center w-12 h-12 bg-secondaryAccent rounded-full text-white shadow-lg hover:bg-opacity-80 transition-colors"
            >
              <Mic className="w-6 h-6" />
            </button>
          </div>
        )}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="flex items-center justify-center w-14 h-14 bg-accent rounded-full text-primary shadow-lg hover:bg-opacity-80 transition-colors"
        >
          <Plus className="w-8 h-8" />
        </button>
      </div>
      
      {showPostModal && (
        <PostModal
          type={postType}
          onClose={() => setShowPostModal(false)}
          onSubmit={handleSubmitPost}
        />
      )}
    </>
  )
}