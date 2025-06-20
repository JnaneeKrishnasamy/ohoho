import React from 'react'
import { Quote, Heart, Share2, Sparkles } from 'lucide-react'
import { QuoteType } from '../types/Quote'

interface QuoteCardProps {
  quote: QuoteType
  isFavorited: boolean
  onToggleFavorite: () => void
  onShare: () => void
  isLoading: boolean
}

const QuoteCard: React.FC<QuoteCardProps> = ({
  quote,
  isFavorited,
  onToggleFavorite,
  onShare,
  isLoading
}) => {
  return (
    <div className="max-w-4xl mx-auto">
      <div className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-2xl border border-white/20 overflow-hidden">
        {/* Decorative header */}
        <div className="h-2 bg-gradient-to-r from-purple-600 via-blue-600 to-indigo-600"></div>
        
        <div className="p-8 md:p-12">
          {/* Quote icon */}
          <div className="flex justify-center mb-8">
            <div className="p-4 bg-gradient-to-r from-purple-100 to-blue-100 rounded-full">
              <Quote className="w-8 h-8 text-purple-600" />
            </div>
          </div>

          {/* Quote text */}
          <blockquote className="text-center mb-8">
            <p className="text-2xl md:text-3xl lg:text-4xl font-light text-gray-800 leading-relaxed mb-6">
              "{quote.text}"
            </p>
            <cite className="text-xl md:text-2xl font-semibold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
              — {quote.author}
            </cite>
          </blockquote>

          {/* Category badge */}
          <div className="flex justify-center mb-8">
            <span className="inline-flex items-center gap-1 px-4 py-2 bg-gradient-to-r from-purple-100 to-blue-100 text-purple-700 rounded-full text-sm font-medium">
              <Sparkles className="w-4 h-4" />
              {quote.category}
            </span>
          </div>

          {/* Action buttons */}
          <div className="flex justify-center gap-4">
            <button
              onClick={onToggleFavorite}
              className={`flex items-center gap-2 px-6 py-3 rounded-xl font-semibold transition-all duration-200 shadow-lg hover:shadow-xl ${
                isFavorited
                  ? 'bg-red-500 text-white hover:bg-red-600'
                  : 'bg-white text-gray-700 hover:bg-gray-50 border border-gray-200'
              }`}
            >
              <Heart className={`w-5 h-5 ${isFavorited ? 'fill-current' : ''}`} />
              {isFavorited ? 'Favorited' : 'Add to Favorites'}
            </button>
            
            <button
              onClick={onShare}
              className="flex items-center gap-2 px-6 py-3 bg-white text-gray-700 rounded-xl font-semibold hover:bg-gray-50 transition-all duration-200 shadow-lg hover:shadow-xl border border-gray-200"
            >
              <Share2 className="w-5 h-5" />
              Share
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default QuoteCard
