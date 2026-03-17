'use client'

export function Header() {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-white/10 bg-background/80 backdrop-blur-xl">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          {/* Logo and Title */}
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-gradient-to-br from-primary to-secondary">
              <span className="text-lg font-bold text-primary-foreground">💻</span>
            </div>
            <div className="flex flex-col">
              <h1 className="text-lg font-bold gradient-text">Laptop Predictor</h1>
              <p className="text-xs text-muted-foreground hidden sm:block">AI-Powered Price Estimation</p>
            </div>
          </div>

          {/* Right side info */}
          <div className="flex items-center gap-4">
            <div className="hidden md:flex items-center gap-2 px-3 py-1 rounded-full border border-white/10 bg-white/5 text-xs text-muted-foreground">
              <div className="h-2 w-2 rounded-full bg-green-500"></div>
              API Connected
            </div>
            <a
              href="https://github.com/raman1233/Ultimate-Laptop-price-predictor"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-secondary text-sm"
            >
              GitHub
            </a>
          </div>
        </div>
      </div>
    </header>
  )
}
