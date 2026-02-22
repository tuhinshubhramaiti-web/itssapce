'use client'

import { useState } from 'react'
import { Mic, Square, Play } from 'lucide-react'

interface PostModalProps {
  type: 'text' | 'voice'
  onClose: () => void
  onSubmit: (content: string) => void
}

export function PostModal({ type, onClose, onSubmit }: PostModalProps) {
  const [content, setContent] = useState('')
  const [isRecording, setIsRecording] = useState(false)
  const [recordingTime, setRecordingTime] = useState(0)

  const handleSubmit = () => {
    if (content.trim()) {
      onSubmit(content)
    }
  }

  const startRecording = () => {
    setIsRecording(true)
    // Simulate recording timer
    const interval = setInterval(() => {
      setRecordingTime(prev => {
        if (prev >= 60) {
          clearInterval(interval)
          setIsRecording(false)
          return 60
        }
        return prev + 1
      })
    }, 1000)
  }

  const stopRecording = () => {
    setIsRecording(false)
    setContent(`Voice recording (${recordingTime}s)`) // Placeholder
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-primary rounded-lg p-6 w-full max-w-md">
        <h2 className="text-xl font-bold text-text mb-4">
          {type === 'text' ? 'Share your thoughts' : 'Record your voice'}
        </h2>
        
        {type === 'text' ? (
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder="Express yourself freely..."
            className="w-full h-32 bg-secondary text-text rounded-lg p-3 resize-none focus:outline-none focus:ring-2 focus:ring-accent"
          />
        ) : (
          <div className="text-center">
            <div className="w-24 h-24 bg-secondary rounded-full flex items-center justify-center mx-auto mb-4">
              {isRecording ? (
                <div className="flex flex-col items-center">
                  <Square className="w-8 h-8 text-red-500 mb-2" />
                  <span className="text-textSecondary">{recordingTime}s</span>
                </div>
              ) : (
                <Mic className="w-8 h-8 text-accent" />
              )}
            </div>
            <p className="text-textSecondary mb-4">
              {isRecording ? 'Recording...' : 'Tap to start recording (max 60s)'}
            </p>
            <button
              onClick={isRecording ? stopRecording : startRecording}
              className={`px-6 py-2 rounded-lg font-medium ${
                isRecording
                  ? 'bg-red-500 text-white'
                  : 'bg-accent text-primary'
              }`}
            >
              {isRecording ? 'Stop' : 'Start Recording'}
            </button>
          </div>
        )}
        
        <div className="flex space-x-3 mt-6">
          <button
            onClick={onClose}
            className="flex-1 bg-secondary text-textSecondary py-2 rounded-lg hover:bg-opacity-80 transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={handleSubmit}
            disabled={!content.trim()}
            className="flex-1 bg-accent text-primary py-2 rounded-lg font-medium disabled:opacity-50 disabled:cursor-not-allowed hover:bg-opacity-80 transition-colors"
          >
            Post
          </button>
        </div>
      </div>
    </div>
  )
}