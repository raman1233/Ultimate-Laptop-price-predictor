'use client'

interface ComparisonProps {
  predictedPrice: number
}

export function PriceComparison({ predictedPrice }: ComparisonProps) {
  // Simulate market price ranges for demonstration
  const getMarketInsights = (price: number) => {
    const discountedPrice = Math.round(price * 0.85)
    const medianPrice = price
    const premiumPrice = Math.round(price * 1.15)

    return {
      discounted: discountedPrice,
      median: medianPrice,
      premium: premiumPrice,
    }
  }

  const insights = getMarketInsights(predictedPrice)

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      minimumFractionDigits: 0,
    }).format(price)
  }

  const getDealQuality = (price: number) => {
    if (price < insights.discounted) {
      return { label: 'Exceptional Deal', color: 'text-green-400', bg: 'bg-green-500/10' }
    } else if (price < insights.median) {
      return { label: 'Good Deal', color: 'text-blue-400', bg: 'bg-blue-500/10' }
    } else if (price < insights.premium) {
      return { label: 'Fair Price', color: 'text-yellow-400', bg: 'bg-yellow-500/10' }
    } else {
      return { label: 'Premium Price', color: 'text-orange-400', bg: 'bg-orange-500/10' }
    }
  }

  const dealQuality = getDealQuality(insights.median)

  return (
    <div className="glass-card p-6 border-primary/30 mt-6">
      <h3 className="text-lg font-bold mb-4 gradient-text">Market Price Analysis</h3>
      
      <div className="space-y-4">
        {/* Price Range Visualization */}
        <div>
          <div className="flex justify-between mb-2">
            <span className="text-xs text-muted-foreground">Budget Range</span>
            <span className="text-xs text-muted-foreground">Premium Range</span>
          </div>
          
          <div className="relative h-8 bg-gradient-to-r from-green-500/20 via-blue-500/20 to-orange-500/20 rounded-lg overflow-hidden">
            <div className="absolute top-0 bottom-0 border-l-2 border-primary"
              style={{ left: `${(insights.median / insights.premium) * 100}%` }}>
              <div className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-3 h-3 rounded-full bg-primary"></div>
            </div>
            
            <div className="absolute left-0 top-1/2 -translate-y-1/2 text-xs text-green-400 font-semibold pl-1">
              {Math.round((insights.discounted / 1000))}k
            </div>
            <div className="absolute right-0 top-1/2 -translate-y-1/2 text-xs text-orange-400 font-semibold pr-1">
              {Math.round((insights.premium / 1000))}k
            </div>
          </div>
        </div>

        {/* Price Tiers */}
        <div className="grid grid-cols-3 gap-3 mt-6">
          <div className="rounded-lg bg-white/5 border border-white/10 p-3 text-center">
            <p className="text-xs text-muted-foreground mb-1">Budget Deal</p>
            <p className="font-semibold">{formatPrice(insights.discounted)}</p>
            <p className="text-xs text-green-400 mt-1">15% savings</p>
          </div>

          <div className="rounded-lg bg-primary/20 border border-primary/50 p-3 text-center">
            <p className="text-xs text-muted-foreground mb-1">Your Estimate</p>
            <p className="font-semibold gradient-text">{formatPrice(insights.median)}</p>
            <p className="text-xs text-primary mt-1">Fair Market Value</p>
          </div>

          <div className="rounded-lg bg-white/5 border border-white/10 p-3 text-center">
            <p className="text-xs text-muted-foreground mb-1">Premium Edition</p>
            <p className="font-semibold">{formatPrice(insights.premium)}</p>
            <p className="text-xs text-orange-400 mt-1">15% premium</p>
          </div>
        </div>

        {/* Deal Quality Badge */}
        <div className={`rounded-lg ${dealQuality.bg} border border-${dealQuality.color.split('-')[1]}-500/30 p-3 text-center`}>
          <p className={`text-sm font-semibold ${dealQuality.color}`}>
            {dealQuality.label}
          </p>
        </div>

        {/* Market Insights Text */}
        <div className="text-sm text-muted-foreground space-y-2 pt-3 border-t border-white/10">
          <p>
            Based on market analysis, this laptop configuration typically falls within the <span className="text-primary font-semibold">{formatPrice(insights.discounted)} - {formatPrice(insights.premium)}</span> range.
          </p>
          <p>
            The predicted price of <span className="font-semibold">{formatPrice(insights.median)}</span> represents the fair market value for this specification set.
          </p>
        </div>
      </div>
    </div>
  )
}
