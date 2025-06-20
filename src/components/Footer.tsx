import React from 'react'
import { Heart, Quote } from 'lucide-react'

const Footer: React.FC = () => {
  return (
    <footer className="bg-white/80 backdrop-blur-sm border-t border-white/20 mt-16">
      <div className="container mx-auto px-4 py-8">
        <div className="text-center">
          <div className="flex items-center justify-center gap-2 mb-4">
            <Quote className="w-5 h-5 text-purple-600" />
            <span className="text-lg font-semibold text-gray-800">Daily Quotes</span>
          </div>
          
          <p className="text-gray-600 mb-4">
            Inspiring you one quote at a time
          </p>
          
          <div className="flex items-center justify-center gap-1 text-sm text-gray-500">
            <span>Made with</span>
            <Heart className="w-4 h-4 text-red-500 fill-current" />
            <span>for daily inspiration</span>
          </div>
          
          <div className="mt-4 text-xs text-gray-400">
            © 2024 Daily Quotes. All quotes are attributed to their respective authors.
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer
