'use client'

import { useState } from 'react'
import { Plus, Mic, Type, X } from 'lucide-react'
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
      <div className="fixed bottom-6 right-6 z-40">
        {isOpen && (
          <div className="mb-4 space-y-3 animate-fade-in">
            <button
              onClick={() => handlePost('text')}
              className="flex items-center justify-center w-14 h-14 bg-secondaryAccent rounded-full text-white shadow-xl hover:bg-opacity-90 transition-all duration-200 transform hover:scale-110"
            >
              <Type className="w-7 h-7" />
            </button>
            <button
              onClick={() => handlePost('voice')}
              className="flex items-center justify-center w-14 h-14 bg-secondaryAccent rounded-full text-white shadow-xl hover:bg-opacity-90 transition-all duration-200 transform hover:scale-110"
            >
              <Mic className="w-7 h-7" />
            </button>
          </div>
        )}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="flex items-center justify-center w-16 h-16 bg-gradient-to-r from-accent to-secondaryAccent rounded-full text-primary shadow-2xl hover:shadow-accent/25 transition-all duration-300 transform hover:scale-110"
        >
          {isOpen ? <X className="w-8 h-8" /> : <Plus className="w-8 h-8" />}
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