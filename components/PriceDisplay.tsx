'use client'

import { PriceComparison } from './PriceComparison'

interface PredictionData {
  success: boolean
  predicted_price: number
  currency: string
  specs_summary: {
    company: string
    type: string
    ram: string
    storage: string
    processor: string
    graphics: string
    os: string
  }
}

export function PriceDisplay({ prediction }: { prediction: PredictionData }) {
  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(price)
  }

  return (
    <div className="space-y-4 animate-in fade-in slide-in-from-bottom-4 duration-500">
      {/* Main Price Display */}
      <div className="price-display">
        <p className="text-sm text-muted-foreground mb-3">Estimated Market Value</p>
        <h2 className="text-5xl md:text-6xl font-bold gradient-text mb-2">
          {formatPrice(prediction.predicted_price)}
        </h2>
        <p className="text-xs text-muted-foreground">
          Based on current market analysis and specifications
        </p>
      </div>

      {/* Specifications Summary */}
      <div className="glass-card p-6">
        <h3 className="text-lg font-bold mb-4 gradient-text">Specification Summary</h3>
        
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          <div className="space-y-1">
            <p className="text-xs text-muted-foreground">Brand</p>
            <p className="font-semibold">{prediction.specs_summary.company}</p>
          </div>

          <div className="space-y-1">
            <p className="text-xs text-muted-foreground">Type</p>
            <p className="font-semibold">{prediction.specs_summary.type}</p>
          </div>

          <div className="space-y-1">
            <p className="text-xs text-muted-foreground">RAM</p>
            <p className="font-semibold">{prediction.specs_summary.ram}</p>
          </div>

          <div className="space-y-1">
            <p className="text-xs text-muted-foreground">Storage</p>
            <p className="font-semibold text-sm">{prediction.specs_summary.storage}</p>
          </div>

          <div className="space-y-1">
            <p className="text-xs text-muted-foreground">Processor</p>
            <p className="font-semibold">{prediction.specs_summary.processor}</p>
          </div>

          <div className="space-y-1">
            <p className="text-xs text-muted-foreground">GPU</p>
            <p className="font-semibold">{prediction.specs_summary.graphics}</p>
          </div>

          <div className="space-y-1">
            <p className="text-xs text-muted-foreground">OS</p>
            <p className="font-semibold">{prediction.specs_summary.os}</p>
          </div>
        </div>
      </div>

      {/* Price Insights */}
      <div className="glass-card p-6 border-primary/30">
        <h3 className="text-lg font-bold mb-3 gradient-text">Price Insights</h3>
        <div className="space-y-2 text-sm">
          <p className="text-muted-foreground">
            Based on the specifications provided, this laptop configuration is estimated to be worth approximately <span className="font-semibold text-accent">{formatPrice(prediction.predicted_price)}</span> in the current market.
          </p>
          <p className="text-muted-foreground">
            This prediction is based on machine learning analysis of similar laptops and their market prices. Actual prices may vary based on brand reputation, condition, and market demand.
          </p>
        </div>
      </div>

      {/* Price Comparison */}
      <PriceComparison predictedPrice={prediction.predicted_price} />
    </div>
  )
}
