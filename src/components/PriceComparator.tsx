'use client';

import { useState } from 'react';
import { TrendingUp, TrendingDown, AlertCircle, Shield } from 'lucide-react';

interface PriceComparatorProps {
  currentPrice: number;
  averagePrice: number;
  priceHistory: number[];
  location: string;
}

export default function PriceComparator({ 
  currentPrice, 
  averagePrice, 
  priceHistory, 
  location 
}: PriceComparatorProps) {
  const [showDetails, setShowDetails] = useState(false);

  const formatPrice = (amount: number): string => {
    return new Intl.NumberFormat('en-NG', {
      style: 'currency',
      currency: 'NGN',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  };

  // Calculate price analysis
  const priceDifference = currentPrice - averagePrice;
  const priceDifferencePercent = ((priceDifference / averagePrice) * 100);
  const isAboveAverage = priceDifference > 0;
  const significantDifference = Math.abs(priceDifferencePercent) > 15;

  // Calculate trend
  const recentTrend = priceHistory.length >= 2 ? 
    priceHistory[priceHistory.length - 1] - priceHistory[priceHistory.length - 2] : 0;
  
  // AI-powered fair price assessment
  const getFairPriceAssessment = () => {
    if (Math.abs(priceDifferencePercent) <= 10) {
      return {
        status: 'fair',
        message: 'This price is within fair market range',
        icon: Shield,
        color: 'text-green-400',
        bgColor: 'bg-green-900/20',
        borderColor: 'border-green-700/30',
      };
    } else if (priceDifferencePercent > 10 && priceDifferencePercent <= 25) {
      return {
        status: 'above-average',
        message: 'This price is above market average',
        icon: TrendingUp,
        color: 'text-yellow-400',
        bgColor: 'bg-yellow-900/20',
        borderColor: 'border-yellow-700/30',
      };
    } else if (priceDifferencePercent > 25) {
      return {
        status: 'overpriced',
        message: 'This price may be overpriced for the area',
        icon: AlertCircle,
        color: 'text-red-400',
        bgColor: 'bg-red-900/20',
        borderColor: 'border-red-700/30',
      };
    } else {
      return {
        status: 'underpriced',
        message: 'This price is below market average',
        icon: TrendingDown,
        color: 'text-blue-400',
        bgColor: 'bg-blue-900/20',
        borderColor: 'border-blue-700/30',
      };
    }
  };

  const assessment = getFairPriceAssessment();
  const IconComponent = assessment.icon;

  return (
    <div className="bg-gray-900/50 backdrop-blur-sm border border-gray-800 rounded-xl p-6">
      <div className="flex items-center gap-3 mb-6">
        <div className="bg-purple-600 p-2 rounded-lg">
          <TrendingUp className="w-5 h-5 text-white" />
        </div>
        <div>
          <h3 className="text-xl font-bold text-white">AI Price Analysis</h3>
          <p className="text-gray-400 text-sm">Smart pricing insights for {location}</p>
        </div>
      </div>

      {/* Main Price Comparison */}
      <div className="grid grid-cols-2 gap-4 mb-6">
        <div className="bg-purple-900/20 border border-purple-700/30 rounded-lg p-4">
          <div className="text-purple-300 text-sm font-medium mb-1">This Lodge</div>
          <div className="text-2xl font-bold text-white">{formatPrice(currentPrice)}</div>
          <div className="text-xs text-gray-400">per semester</div>
        </div>
        
        <div className="bg-gray-800/50 border border-gray-700 rounded-lg p-4">
          <div className="text-gray-300 text-sm font-medium mb-1">Area Average</div>
          <div className="text-2xl font-bold text-white">{formatPrice(averagePrice)}</div>
          <div className="text-xs text-gray-400">per semester</div>
        </div>
      </div>

      {/* Fair Price Assessment */}
      <div className={`${assessment.bgColor} ${assessment.borderColor} border rounded-lg p-4 mb-4`}>
        <div className="flex items-start gap-3">
          <IconComponent className={`w-5 h-5 ${assessment.color} flex-shrink-0 mt-0.5`} />
          <div>
            <div className={`font-semibold ${assessment.color} mb-1`}>
              {assessment.message}
            </div>
            <div className="text-sm text-gray-300">
              This price is{' '}
              <span className={`font-medium ${isAboveAverage ? 'text-red-300' : 'text-green-300'}`}>
                {formatPrice(Math.abs(priceDifference))}{' '}
                {isAboveAverage ? 'above' : 'below'}
              </span>{' '}
              the area average ({Math.abs(priceDifferencePercent).toFixed(1)}%)
            </div>
          </div>
        </div>
      </div>

      {/* Price Insights */}
      <div className="space-y-3">
        <button
          onClick={() => setShowDetails(!showDetails)}
          className="w-full text-left text-purple-400 hover:text-purple-300 text-sm font-medium transition-colors"
        >
          {showDetails ? '▼' : '▶'} View Detailed Analysis
        </button>

        {showDetails && (
          <div className="space-y-3 pl-4 border-l-2 border-purple-700/30">
            {/* Market Position */}
            <div className="bg-gray-800/30 rounded-lg p-3">
              <div className="text-xs font-medium text-gray-400 uppercase tracking-wide mb-1">
                Market Position
              </div>
              <div className="text-white">
                {priceDifferencePercent > 15 && 'Premium Pricing'}
                {priceDifferencePercent >= -15 && priceDifferencePercent <= 15 && 'Market Rate'}
                {priceDifferencePercent < -15 && 'Budget-Friendly'}
              </div>
            </div>

            {/* Price Trend */}
            <div className="bg-gray-800/30 rounded-lg p-3">
              <div className="text-xs font-medium text-gray-400 uppercase tracking-wide mb-1">
                Recent Trend
              </div>
              <div className={`flex items-center gap-1 ${
                recentTrend > 0 ? 'text-red-400' : recentTrend < 0 ? 'text-green-400' : 'text-gray-400'
              }`}>
                {recentTrend > 0 && <TrendingUp size={14} />}
                {recentTrend < 0 && <TrendingDown size={14} />}
                <span>
                  {recentTrend === 0 ? 'Stable' : 
                   recentTrend > 0 ? `+${formatPrice(recentTrend)} this month` :
                   `${formatPrice(recentTrend)} this month`}
                </span>
              </div>
            </div>

            {/* Recommendations */}
            <div className="bg-blue-900/20 border border-blue-700/30 rounded-lg p-3">
              <div className="text-xs font-medium text-blue-300 uppercase tracking-wide mb-2">
                💡 AI Recommendation
              </div>
              <div className="text-sm text-blue-200">
                {assessment.status === 'fair' && 
                  'Good value for money. Consider viewing this property soon as fair-priced lodges get taken quickly.'
                }
                {assessment.status === 'above-average' && 
                  'Price is higher than average. Ensure amenities and location justify the premium.'
                }
                {assessment.status === 'overpriced' && 
                  'Consider negotiating or exploring similar properties in the area with better value.'
                }
                {assessment.status === 'underpriced' && 
                  'Excellent value! Verify property condition and ensure legitimacy before booking.'
                }
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Price Alert */}
      {significantDifference && (
        <div className="mt-4 bg-yellow-900/20 border border-yellow-700/30 rounded-lg p-3">
          <div className="flex items-center gap-2 text-yellow-400 text-sm font-medium mb-1">
            <AlertCircle size={16} />
            Price Alert
          </div>
          <div className="text-xs text-yellow-200">
            This lodges price differs significantly from the area average. 
            {isAboveAverage ? ' Verify if premium amenities justify the cost.' : ' Ensure property legitimacy and condition.'}
          </div>
        </div>
      )}
    </div>
  );
}
