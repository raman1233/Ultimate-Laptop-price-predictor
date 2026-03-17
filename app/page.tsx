import { Header } from '@/components/Header'
import { SpecsForm } from '@/components/SpecsForm'

export default function Home() {
  return (
    <div className="min-h-screen">
      <Header />
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Hero Section */}
        <div className="mb-12 text-center space-y-4">
          <div>
            <span className="inline-block px-3 py-1 rounded-full border border-primary/50 bg-primary/10 text-xs font-medium text-primary mb-4">
              ML-Powered Prediction Engine
            </span>
          </div>
          
          <h1 className="text-5xl md:text-6xl font-bold gradient-text leading-tight text-balance">
            Predict Your Laptop's True Value
          </h1>
          
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto text-balance">
            Get accurate, data-driven price estimates for any laptop configuration. Our machine learning model analyzes thousands of market listings to provide real-time valuations.
          </p>
        </div>

        {/* Main Form */}
        <SpecsForm />

        {/* Features Section */}
        <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="glass-card p-6 text-center">
            <div className="text-3xl mb-3">🎯</div>
            <h3 className="font-bold mb-2">Accurate Predictions</h3>
            <p className="text-sm text-muted-foreground">
              Powered by advanced machine learning trained on real market data
            </p>
          </div>

          <div className="glass-card p-6 text-center">
            <div className="text-3xl mb-3">⚡</div>
            <h3 className="font-bold mb-2">Instant Results</h3>
            <p className="text-sm text-muted-foreground">
              Get price estimates in seconds with our optimized API
            </p>
          </div>

          <div className="glass-card p-6 text-center">
            <div className="text-3xl mb-3">📊</div>
            <h3 className="font-bold mb-2">Detailed Specs</h3>
            <p className="text-sm text-muted-foreground">
              Analyze CPU, GPU, RAM, storage, and display specifications
            </p>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-white/10 mt-16 py-8 text-center text-sm text-muted-foreground">
        <p>Built with Next.js, TailwindCSS, and Machine Learning</p>
        <p className="mt-2">© 2024 Ultimate Laptop Price Predictor. All rights reserved.</p>
      </footer>
    </div>
  )
}
