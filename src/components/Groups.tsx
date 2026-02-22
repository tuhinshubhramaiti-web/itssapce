'use client'

import { Users, Heart, Zap } from 'lucide-react'

const groups = [
  {
    id: '1',
    name: 'Mental Health Support',
    description: 'A safe space for sharing mental health experiences',
    members: 1247,
    icon: Heart,
    color: 'bg-red-500',
  },
  {
    id: '2',
    name: 'Anxiety & Stress Relief',
    description: 'Coping strategies and mutual support',
    members: 892,
    icon: Zap,
    color: 'bg-yellow-500',
  },
  {
    id: '3',
    name: 'LGBTQ+ Community',
    description: 'Inclusive space for LGBTQ+ individuals',
    members: 654,
    icon: Users,
    color: 'bg-purple-500',
  },
  {
    id: '4',
    name: 'Workplace Burnout',
    description: 'Navigating professional stress and burnout',
    members: 543,
    icon: Users,
    color: 'bg-blue-500',
  },
]

export function Groups() {
  return (
    <div className="space-y-4">
      <h2 className="text-xl font-bold text-text mb-4">Support Groups</h2>
      {groups.map((group) => (
        <div key={group.id} className="bg-secondary rounded-lg p-4 shadow-lg">
          <div className="flex items-center mb-3">
            <div className={`w-10 h-10 ${group.color} rounded-full flex items-center justify-center mr-3`}>
              <group.icon className="w-6 h-6 text-white" />
            </div>
            <div>
              <h3 className="font-semibold text-text">{group.name}</h3>
              <p className="text-sm text-textSecondary">{group.members} members</p>
            </div>
          </div>
          <p className="text-textSecondary text-sm mb-3">{group.description}</p>
          <button className="w-full bg-accent text-primary py-2 rounded-lg font-medium hover:bg-opacity-80 transition-colors">
            Join Group
          </button>
        </div>
      ))}
    </div>
  )
}