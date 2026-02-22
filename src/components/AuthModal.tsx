'use client'

import { Lock } from 'lucide-react'

interface AuthModalProps {
  onClose: () => void
  onAuth: () => void
}

export function AuthModal({ onClose, onAuth }: AuthModalProps) {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-primary rounded-lg p-6 w-full max-w-md text-center">
        <div className="w-16 h-16 bg-accent rounded-full flex items-center justify-center mx-auto mb-4">
          <Lock className="w-8 h-8 text-primary" />
        </div>
        <h2 className="text-xl font-bold text-text mb-2">
          Welcome to Your Safe Space
        </h2>
        <p className="text-textSecondary mb-6">
          A safe space to express, listen, and connect — without judgment.
        </p>
        <p className="text-textSecondary text-sm mb-6">
          We prioritize your privacy. No personal data required.
        </p>
        <button
          onClick={onAuth}
          className="w-full bg-accent text-primary py-3 rounded-lg font-medium hover:bg-opacity-80 transition-colors"
        >
          Enter Anonymously
        </button>
        <button
          onClick={onClose}
          className="w-full mt-3 text-textSecondary hover:text-text transition-colors"
        >
          Cancel
        </button>
      </div>
    </div>
  )
}