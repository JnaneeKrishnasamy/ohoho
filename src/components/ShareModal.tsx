import React, { useState } from 'react'
import { X, Copy, Twitter, Facebook, MessageCircle, Check } from 'lucide-react'
import { QuoteType } from '../types/Quote'

interface ShareModalProps {
  quote: QuoteType
  onClose: () => void
}

const ShareModal: React.FC<ShareModalProps> = ({ quote, onClose }) => {
  const [copied, setCopied] = useState(false)

  const shareText = `"${quote.text}" — ${quote.author}`
  const shareUrl = window.location.href

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(shareText)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch (err) {
      console.error('Failed to copy text: ', err)
    }
  }

  const shareOnTwitter = () => {
    const url = `https://twitter.com/intent/tweet?text=${encodeURIComponent(shareText)}&url=${encodeURIComponent(shareUrl)}`
    window.open(url, '_blank')
  }

  const shareOnFacebook = () => {
    const url = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}&quote=${encodeURIComponent(shareText)}`
    window.open(url, '_blank')
  }

  const shareOnWhatsApp = () => {
    const url = `https://wa.me/?text=${encodeURIComponent(shareText + ' ' + shareUrl)}`
    window.open(url, '_blank')
  }

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <h3 className="text-xl font-bold text-gray-800">Share Quote</h3>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <X className="w-5 h-5 text-gray-500" />
          </button>
        </div>

        {/* Quote preview */}
        <div className="p-6 border-b border-gray-200">
          <div className="bg-gradient-to-r from-purple-50 to-blue-50 rounded-xl p-4">
            <blockquote className="text-gray-700 mb-2">
              "{quote.text}"
            </blockquote>
            <cite className="text-purple-600 font-semibold">— {quote.author}</cite>
          </div>
        </div>

        {/* Share options */}
        <div className="p-6">
          <div className="space-y-3">
            {/* Copy to clipboard */}
            <button
              onClick={copyToClipboard}
              className="w-full flex items-center gap-3 p-4 bg-gray-50 hover:bg-gray-100 rounded-xl transition-colors"
            >
              {copied ? (
                <Check className="w-5 h-5 text-green-600" />
              ) : (
                <Copy className="w-5 h-5 text-gray-600" />
              )}
              <span className="font-medium text-gray-700">
                {copied ? 'Copied!' : 'Copy to Clipboard'}
              </span>
            </button>

            {/* Twitter */}
            <button
              onClick={shareOnTwitter}
              className="w-full flex items-center gap-3 p-4 bg-blue-50 hover:bg-blue-100 rounded-xl transition-colors"
            >
              <Twitter className="w-5 h-5 text-blue-600" />
              <span className="font-medium text-blue-700">Share on Twitter</span>
            </button>

            {/* Facebook */}
            <button
              onClick={shareOnFacebook}
              className="w-full flex items-center gap-3 p-4 bg-blue-50 hover:bg-blue-100 rounded-xl transition-colors"
            >
              <Facebook className="w-5 h-5 text-blue-600" />
              <span className="font-medium text-blue-700">Share on Facebook</span>
            </button>

            {/* WhatsApp */}
            <button
              onClick={shareOnWhatsApp}
              className="w-full flex items-center gap-3 p-4 bg-green-50 hover:bg-green-100 rounded-xl transition-colors"
            >
              <MessageCircle className="w-5 h-5 text-green-600" />
              <span className="font-medium text-green-700">Share on WhatsApp</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ShareModal
