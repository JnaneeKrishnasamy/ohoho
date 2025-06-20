import React, { useState, useEffect } from 'react'
import { Quote, RefreshCw, Heart, Share2, Calendar, Sunrise, Moon, Star } from 'lucide-react'
import QuoteCard from './components/QuoteCard'
import Header from './components/Header'
import Footer from './components/Footer'
import ShareModal from './components/ShareModal'
import { quotes } from './data/quotes'
import { QuoteType } from './types/Quote'

function App() {
  const [currentQuote, setCurrentQuote] = useState<QuoteType | null>(null)
  const [favorites, setFavorites] = useState<QuoteType[]>([])
  const [showShareModal, setShowShareModal] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [timeOfDay, setTimeOfDay] = useState<'morning' | 'afternoon' | 'evening'>('morning')

  useEffect(() => {
    // Set time of day based on current hour
    const hour = new Date().getHours()
    if (hour < 12) setTimeOfDay('morning')
    else if (hour < 18) setTimeOfDay('afternoon')
    else setTimeOfDay('evening')

    // Load today's quote
    loadTodaysQuote()
    
    // Load favorites from localStorage
    const savedFavorites = localStorage.getItem('favoriteQuotes')
    if (savedFavorites) {
      setFavorites(JSON.parse(savedFavorites))
    }
  }, [])

  const loadTodaysQuote = () => {
    // Use date as seed for consistent daily quote
    const today = new Date().toDateString()
    const savedQuote = localStorage.getItem(`quote-${today}`)
    
    if (savedQuote) {
      setCurrentQuote(JSON.parse(savedQuote))
    } else {
      const randomIndex = Math.floor(Math.random() * quotes.length)
      const quote = quotes[randomIndex]
      setCurrentQuote(quote)
      localStorage.setItem(`quote-${today}`, JSON.stringify(quote))
    }
  }

  const getNewQuote = async () => {
    setIsLoading(true)
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 800))
    
    const randomIndex = Math.floor(Math.random() * quotes.length)
    const newQuote = quotes[randomIndex]
    setCurrentQuote(newQuote)
    setIsLoading(false)
  }

  const toggleFavorite = (quote: QuoteType) => {
    const isFavorited = favorites.some(fav => fav.id === quote.id)
    let newFavorites: QuoteType[]
    
    if (isFavorited) {
      newFavorites = favorites.filter(fav => fav.id !== quote.id)
    } else {
      newFavorites = [...favorites, quote]
    }
    
    setFavorites(newFavorites)
    localStorage.setItem('favoriteQuotes', JSON.stringify(newFavorites))
  }

  const getTimeIcon = () => {
    switch (timeOfDay) {
      case 'morning': return <Sunrise className="w-5 h-5" />
      case 'afternoon': return <Star className="w-5 h-5" />
      case 'evening': return <Moon className="w-5 h-5" />
    }
  }

  const getGreeting = () => {
    switch (timeOfDay) {
      case 'morning': return 'Good Morning'
      case 'afternoon': return 'Good Afternoon'
      case 'evening': return 'Good Evening'
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-indigo-100">
      <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1506905925346-21bda4d32df4?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80')] bg-cover bg-center opacity-5"></div>
      
      <div className="relative z-10">
        <Header />
        
        <main className="container mx-auto px-4 py-8">
          {/* Greeting Section */}
          <div className="text-center mb-12">
            <div className="flex items-center justify-center gap-2 mb-4">
              {getTimeIcon()}
              <h1 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
                {getGreeting()}
              </h1>
            </div>
            <p className="text-gray-600 text-lg">
              Here's your daily dose of inspiration
            </p>
          </div>

          {/* Quote Card */}
          {currentQuote && (
            <QuoteCard
              quote={currentQuote}
              isFavorited={favorites.some(fav => fav.id === currentQuote.id)}
              onToggleFavorite={() => toggleFavorite(currentQuote)}
              onShare={() => setShowShareModal(true)}
              isLoading={isLoading}
            />
          )}

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center mt-8">
            <button
              onClick={getNewQuote}
              disabled={isLoading}
              className="flex items-center justify-center gap-2 px-6 py-3 bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-xl font-semibold hover:from-purple-700 hover:to-blue-700 transition-all duration-200 shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <RefreshCw className={`w-5 h-5 ${isLoading ? 'animate-spin' : ''}`} />
              {isLoading ? 'Loading...' : 'New Quote'}
            </button>
            
            <button
              onClick={() => setShowShareModal(true)}
              className="flex items-center justify-center gap-2 px-6 py-3 bg-white text-gray-700 rounded-xl font-semibold hover:bg-gray-50 transition-all duration-200 shadow-lg hover:shadow-xl border border-gray-200"
            >
              <Share2 className="w-5 h-5" />
              Share Quote
            </button>
          </div>

          {/* Favorites Section */}
          {favorites.length > 0 && (
            <div className="mt-16">
              <div className="flex items-center gap-2 mb-6">
                <Heart className="w-6 h-6 text-red-500 fill-current" />
                <h2 className="text-2xl font-bold text-gray-800">Your Favorite Quotes</h2>
              </div>
              
              <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {favorites.slice(0, 6).map((quote) => (
                  <div key={quote.id} className="bg-white/80 backdrop-blur-sm rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-200 border border-white/20">
                    <Quote className="w-8 h-8 text-purple-500 mb-4" />
                    <blockquote className="text-gray-700 mb-4 leading-relaxed">
                      "{quote.text}"
                    </blockquote>
                    <cite className="text-purple-600 font-semibold">— {quote.author}</cite>
                  </div>
                ))}
              </div>
            </div>
          )}
        </main>

        <Footer />

        {/* Share Modal */}
        {showShareModal && currentQuote && (
          <ShareModal
            quote={currentQuote}
            onClose={() => setShowShareModal(false)}
          />
        )}
      </div>
    </div>
  )
}

export default App
