'use client'

import { useState } from 'react'
import { Mic, Square, X, Send } from 'lucide-react'

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
    setContent(`Voice recording (${recordingTime}s)`)
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-end justify-center p-4 z-50">
      <div className="bg-primary rounded-t-2xl w-full max-w-sm shadow-2xl border-t border-divider animate-slide-up">
        <div className="flex items-center justify-between p-4 border-b border-divider">
          <h2 className="text-lg font-bold text-text">
            {type === 'text' ? 'Share your thoughts' : 'Record your voice'}
          </h2>
          <button onClick={onClose} className="text-textSecondary hover:text-text">
            <X className="w-6 h-6" />
          </button>
        </div>
        
        <div className="p-4">
          {type === 'text' ? (
            <textarea
              value={content}
              onChange={(e) => setContent(e.target.value)}
              placeholder="Express yourself freely..."
              className="w-full h-32 bg-secondary text-text rounded-xl p-4 resize-none focus:outline-none focus:ring-2 focus:ring-accent border border-divider"
            />
          ) : (
            <div className="text-center">
              <div className="w-20 h-20 bg-gradient-to-br from-accent to-secondaryAccent rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg">
                {isRecording ? (
                  <div className="flex flex-col items-center">
                    <Square className="w-8 h-8 text-primary mb-1" />
                    <span className="text-primary text-sm font-bold">{recordingTime}s</span>
                  </div>
                ) : (
                  <Mic className="w-8 h-8 text-primary" />
                )}
              </div>
              <p className="text-textSecondary mb-4">
                {isRecording ? 'Recording...' : 'Tap to start recording (max 60s)'}
              </p>
              <button
                onClick={isRecording ? stopRecording : startRecording}
                className={`px-6 py-3 rounded-xl font-semibold text-lg shadow-lg transition-all duration-200 transform hover:scale-105 ${
                  isRecording
                    ? 'bg-red-500 text-white'
                    : 'bg-accent text-primary'
                }`}
              >
                {isRecording ? 'Stop' : 'Start Recording'}
              </button>
            </div>
          )}
        </div>
        
        <div className="flex space-x-3 p-4 border-t border-divider">
          <button
            onClick={onClose}
            className="flex-1 bg-secondary text-textSecondary py-3 rounded-xl font-medium hover:bg-opacity-80 transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={handleSubmit}
            disabled={!content.trim()}
            className="flex-1 bg-accent text-primary py-3 rounded-xl font-semibold text-lg shadow-lg hover:bg-opacity-90 transition-all duration-200 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
          >
            <Send className="w-5 h-5" />
            <span>Post</span>
          </button>
        </div>
      </div>
    </div>
  )
}