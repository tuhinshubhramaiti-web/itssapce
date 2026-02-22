'use client'

import { Lock, Shield, Users } from 'lucide-react'

interface AuthModalProps {
  onClose: () => void
  onAuth: () => void
}

export function AuthModal({ onClose, onAuth }: AuthModalProps) {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-primary rounded-2xl p-6 w-full max-w-sm text-center shadow-2xl border border-divider">
        <div className="w-16 h-16 bg-gradient-to-br from-accent to-secondaryAccent rounded-full flex items-center justify-center mx-auto mb-4">
          <Shield className="w-8 h-8 text-primary" />
        </div>
        <h2 className="text-2xl font-bold text-text mb-2">
          Welcome to Your Safe Space
        </h2>
        <p className="text-textSecondary mb-6 leading-relaxed">
          &ldquo;A safe space to express, listen, and connect — without judgment.&rdquo;
        </p>
        
        <div className="flex items-center justify-center space-x-2 mb-6 text-textSecondary text-sm">
          <Lock className="w-4 h-4" />
          <span>100% Anonymous • End-to-End Encrypted</span>
        </div>
        
        <div className="space-y-3 mb-6">
          <div className="flex items-center text-textSecondary text-sm">
            <Users className="w-4 h-4 mr-2 text-accent" />
            <span>Join 10,000+ listeners worldwide</span>
          </div>
          <div className="flex items-center text-textSecondary text-sm">
            <Shield className="w-4 h-4 mr-2 text-accent" />
            <span>Privacy-first, judgment-free</span>
          </div>
        </div>
        
        <button
          onClick={onAuth}
          className="w-full bg-accent text-primary py-3 rounded-xl font-semibold text-lg shadow-lg hover:bg-opacity-90 transition-all duration-200 transform hover:scale-105"
        >
          Enter Anonymously
        </button>
        
        <p className="text-textSecondary text-xs mt-4">
          By entering, you agree to our community guidelines
        </p>
      </div>
    </div>
  )
}