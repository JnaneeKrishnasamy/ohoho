import React from 'react'
import { Quote, Heart, Calendar } from 'lucide-react'

const Header: React.FC = () => {
  const today = new Date().toLocaleDateString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  })

  return (
    <header className="bg-white/80 backdrop-blur-sm border-b border-white/20 sticky top-0 z-50">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-gradient-to-r from-purple-600 to-blue-600 rounded-xl">
              <Quote className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-gray-800">Daily Quotes</h1>
              <p className="text-sm text-gray-600">Inspiration for every day</p>
            </div>
          </div>
          
          <div className="flex items-center gap-2 text-sm text-gray-600">
            <Calendar className="w-4 h-4" />
            <span className="hidden sm:inline">{today}</span>
            <span className="sm:hidden">{new Date().toLocaleDateString()}</span>
          </div>
        </div>
      </div>
    </header>
  )
}

export default Header
