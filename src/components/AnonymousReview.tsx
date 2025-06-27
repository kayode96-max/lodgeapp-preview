'use client';

import { useState } from 'react';
import { Send, Shield, FileText } from 'lucide-react';

interface AnonymousReviewProps {
  lodgeId: string;
}

interface ReviewData {
  rating: number;
  review: string;
  roomType: string;
  stayDuration: string;
  wouldRecommend: boolean;
}

export default function AnonymousReview({ lodgeId }: AnonymousReviewProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState<ReviewData>({
    rating: 0,
    review: '',
    roomType: '',
    stayDuration: '',
    wouldRecommend: false,
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // Simulate API call - replace with actual Firestore submission
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Here you would submit to Firestore with anonymous user ID
      console.log('Submitting review for lodge:', lodgeId, formData);
      
      setSubmitted(true);
    } catch (error) {
      console.error('Error submitting review:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleRatingClick = (rating: number) => {
    setFormData(prev => ({ ...prev, rating }));
  };

  if (submitted) {
    return (
      <div className="bg-green-900/20 border border-green-700/30 rounded-xl p-6 text-center">
        <Shield className="w-12 h-12 text-green-400 mx-auto mb-3" />
        <h3 className="text-lg font-semibold text-white mb-2">Review Submitted Successfully!</h3>
        <p className="text-gray-400">
          Your anonymous review has been submitted and will help other students make informed decisions.
        </p>
      </div>
    );
  }

  return (
    <div className="bg-gray-900/50 backdrop-blur-sm border border-gray-800 rounded-xl p-6">
      <div className="flex items-center gap-3 mb-6">
        <div className="bg-purple-600 p-2 rounded-lg">
          <FileText className="w-5 h-5 text-white" />
        </div>
        <div>
          <h3 className="text-xl font-bold text-white">Submit Anonymous Review</h3>
          <p className="text-gray-400 text-sm">Help fellow students with honest feedback</p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Rating */}
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">
            Overall Rating *
          </label>
          <div className="flex gap-2">
            {[1, 2, 3, 4, 5].map((star) => (
              <button
                key={star}
                type="button"
                onClick={() => handleRatingClick(star)}
                className={`w-10 h-10 rounded-lg transition-colors ${
                  star <= formData.rating
                    ? 'bg-yellow-500 text-white'
                    : 'bg-gray-700 text-gray-400 hover:bg-gray-600'
                }`}
              >
                ★
              </button>
            ))}
          </div>
        </div>

        {/* Room Type */}
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">
            Room Type *
          </label>
          <select
            required
            value={formData.roomType}
            onChange={(e) => setFormData(prev => ({ ...prev, roomType: e.target.value }))}
            className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
          >
            <option value="">Select room type</option>
            <option value="single">Single Room</option>
            <option value="shared">Shared Room</option>
            <option value="self-contained">Self-Contained</option>
            <option value="apartment">Apartment</option>
          </select>
        </div>

        {/* Stay Duration */}
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">
            How long did you stay? *
          </label>
          <select
            required
            value={formData.stayDuration}
            onChange={(e) => setFormData(prev => ({ ...prev, stayDuration: e.target.value }))}
            className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
          >
            <option value="">Select duration</option>
            <option value="1-semester">1 Semester</option>
            <option value="1-year">1 Academic Year</option>
            <option value="2-years">2+ Years</option>
            <option value="current">Currently Staying</option>
          </select>
        </div>

        {/* Review Text */}
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">
            Your Review *
          </label>
          <textarea
            required
            rows={4}
            value={formData.review}
            onChange={(e) => setFormData(prev => ({ ...prev, review: e.target.value }))}
            placeholder="Share your honest experience about the lodge, landlord, facilities, security, etc."
            className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500"
          />
        </div>

        {/* Recommendation */}
        <div className="flex items-center gap-3">
          <input
            type="checkbox"
            id="recommend"
            checked={formData.wouldRecommend}
            onChange={(e) => setFormData(prev => ({ ...prev, wouldRecommend: e.target.checked }))}
            className="w-4 h-4 text-purple-600 bg-gray-800 border-gray-600 rounded focus:ring-purple-500"
          />
          <label htmlFor="recommend" className="text-sm text-gray-300">
            I would recommend this lodge to other students
          </label>
        </div>

        {/* Privacy Notice */}
        <div className="bg-blue-900/20 border border-blue-700/30 rounded-lg p-4">
          <div className="flex items-start gap-3">
            <Shield className="w-5 h-5 text-blue-400 flex-shrink-0 mt-0.5" />
            <div className="text-sm text-blue-200">
              <strong>Your privacy is protected.</strong> Reviews are submitted anonymously and cannot be traced back to you. 
              Only aggregate data is used to help other students make informed decisions.
            </div>
          </div>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={isSubmitting || !formData.rating || !formData.roomType || !formData.stayDuration || !formData.review}
          className="w-full bg-purple-600 hover:bg-purple-700 disabled:bg-gray-700 disabled:cursor-not-allowed text-white py-3 px-4 rounded-lg font-medium transition-colors flex items-center justify-center gap-2"
        >
          {isSubmitting ? (
            <>
              <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
              Submitting...
            </>
          ) : (
            <>
              <Send className="w-4 h-4" />
              Submit Anonymous Review
            </>
          )}
        </button>
      </form>
    </div>
  );
}
