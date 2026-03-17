'use client'

import { useState, useEffect } from 'react'
import { PriceDisplay } from './PriceDisplay'

interface FormSpecs {
  company: string
  type_name: string
  ram: number
  weight: number
  touchscreen: boolean
  ips: boolean
  cpu: string
  hdd: number
  ssd: number
  gpu: string
  os: string
  resolution: string
  screen_size: number
}

interface Options {
  companies: string[]
  types: string[]
  operating_systems: string[]
  cpu_brands: string[]
  gpu_brands: string[]
  resolutions: string[]
  ram_options: number[]
  storage_options: number[]
}

export function SpecsForm() {
  const [formSpecs, setFormSpecs] = useState<FormSpecs>({
    company: '',
    type_name: '',
    ram: 8,
    weight: 1.5,
    touchscreen: false,
    ips: false,
    cpu: '',
    hdd: 0,
    ssd: 256,
    gpu: '',
    os: '',
    resolution: '1920x1080',
    screen_size: 15.6,
  })

  const [options, setOptions] = useState<Options | null>(null)
  const [loading, setLoading] = useState(false)
  const [prediction, setPrediction] = useState<any>(null)
  const [error, setError] = useState<string | null>(null)

  const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000'

  // Fetch options on mount
  useEffect(() => {
    const fetchOptions = async () => {
      try {
        const response = await fetch(`${apiUrl}/api/options`)
        const data = await response.json()
        setOptions(data)
        
        // Set default values
        if (data.companies.length > 0) {
          setFormSpecs(prev => ({ ...prev, company: data.companies[0] }))
        }
        if (data.types.length > 0) {
          setFormSpecs(prev => ({ ...prev, type_name: data.types[0] }))
        }
        if (data.cpu_brands.length > 0) {
          setFormSpecs(prev => ({ ...prev, cpu: data.cpu_brands[0] }))
        }
        if (data.gpu_brands.length > 0) {
          setFormSpecs(prev => ({ ...prev, gpu: data.gpu_brands[0] }))
        }
        if (data.operating_systems.length > 0) {
          setFormSpecs(prev => ({ ...prev, os: data.operating_systems[0] }))
        }
      } catch (err) {
        setError('Failed to load form options')
        console.error(err)
      }
    }

    fetchOptions()
  }, [apiUrl])

  const handleInputChange = (field: keyof FormSpecs, value: any) => {
    setFormSpecs(prev => ({ ...prev, [field]: value }))
  }

  const handlePredict = async () => {
    setLoading(true)
    setError(null)
    setPrediction(null)

    try {
      const response = await fetch(`${apiUrl}/api/predict`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formSpecs),
      })

      if (!response.ok) {
        throw new Error('Prediction failed')
      }

      const data = await response.json()
      setPrediction(data)
    } catch (err) {
      setError('Failed to get prediction. Make sure the API is running on port 5000.')
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  if (!options) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="inline-flex h-8 w-8 animate-spin rounded-full border-4 border-primary/20 border-t-primary"></div>
          <p className="mt-4 text-muted-foreground">Loading form...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="w-full max-w-4xl mx-auto space-y-6">
      {/* Core Specifications */}
      <div className="glass-card p-6">
        <h2 className="text-xl font-bold mb-6 gradient-text">Core Specifications</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-muted-foreground mb-2">
              Brand
            </label>
            <select
              value={formSpecs.company}
              onChange={(e) => handleInputChange('company', e.target.value)}
              className="select-field"
            >
              {options.companies.map(company => (
                <option key={company} value={company}>{company}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-muted-foreground mb-2">
              Laptop Type
            </label>
            <select
              value={formSpecs.type_name}
              onChange={(e) => handleInputChange('type_name', e.target.value)}
              className="select-field"
            >
              {options.types.map(type => (
                <option key={type} value={type}>{type}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-muted-foreground mb-2">
              Processor Brand
            </label>
            <select
              value={formSpecs.cpu}
              onChange={(e) => handleInputChange('cpu', e.target.value)}
              className="select-field"
            >
              {options.cpu_brands.map(cpu => (
                <option key={cpu} value={cpu}>{cpu}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-muted-foreground mb-2">
              Graphics Brand
            </label>
            <select
              value={formSpecs.gpu}
              onChange={(e) => handleInputChange('gpu', e.target.value)}
              className="select-field"
            >
              {options.gpu_brands.map(gpu => (
                <option key={gpu} value={gpu}>{gpu}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-muted-foreground mb-2">
              Operating System
            </label>
            <select
              value={formSpecs.os}
              onChange={(e) => handleInputChange('os', e.target.value)}
              className="select-field"
            >
              {options.operating_systems.map(os => (
                <option key={os} value={os}>{os}</option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Hardware Configuration */}
      <div className="glass-card p-6">
        <h2 className="text-xl font-bold mb-6 gradient-text">Hardware Configuration</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-muted-foreground mb-2">
              RAM: {formSpecs.ram}GB
            </label>
            <input
              type="range"
              min="2"
              max="64"
              step="2"
              value={formSpecs.ram}
              onChange={(e) => handleInputChange('ram', parseInt(e.target.value))}
              className="input-field"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-muted-foreground mb-2">
              Weight: {formSpecs.weight}kg
            </label>
            <input
              type="range"
              min="0.5"
              max="5"
              step="0.1"
              value={formSpecs.weight}
              onChange={(e) => handleInputChange('weight', parseFloat(e.target.value))}
              className="input-field"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-muted-foreground mb-2">
              SSD Storage
            </label>
            <select
              value={formSpecs.ssd}
              onChange={(e) => handleInputChange('ssd', parseInt(e.target.value))}
              className="select-field"
            >
              {options.storage_options.map(size => (
                <option key={size} value={size}>{size === 0 ? 'None' : `${size}GB`}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-muted-foreground mb-2">
              HDD Storage
            </label>
            <select
              value={formSpecs.hdd}
              onChange={(e) => handleInputChange('hdd', parseInt(e.target.value))}
              className="select-field"
            >
              {options.storage_options.map(size => (
                <option key={size} value={size}>{size === 0 ? 'None' : `${size}GB`}</option>
              ))}
            </select>
          </div>
        </div>

        <div className="mt-4 flex gap-4">
          <label className="flex items-center cursor-pointer">
            <input
              type="checkbox"
              checked={formSpecs.touchscreen}
              onChange={(e) => handleInputChange('touchscreen', e.target.checked)}
              className="w-4 h-4"
            />
            <span className="ml-2 text-sm font-medium">Touchscreen</span>
          </label>

          <label className="flex items-center cursor-pointer">
            <input
              type="checkbox"
              checked={formSpecs.ips}
              onChange={(e) => handleInputChange('ips', e.target.checked)}
              className="w-4 h-4"
            />
            <span className="ml-2 text-sm font-medium">IPS Panel</span>
          </label>
        </div>
      </div>

      {/* Display Configuration */}
      <div className="glass-card p-6">
        <h2 className="text-xl font-bold mb-6 gradient-text">Display Configuration</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-muted-foreground mb-2">
              Resolution
            </label>
            <select
              value={formSpecs.resolution}
              onChange={(e) => handleInputChange('resolution', e.target.value)}
              className="select-field"
            >
              {options.resolutions.map(res => (
                <option key={res} value={res}>{res}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-muted-foreground mb-2">
              Screen Size: {formSpecs.screen_size}"
            </label>
            <input
              type="number"
              min="10"
              max="20"
              step="0.1"
              value={formSpecs.screen_size}
              onChange={(e) => handleInputChange('screen_size', parseFloat(e.target.value))}
              className="input-field"
            />
          </div>
        </div>
      </div>

      {/* Error Message */}
      {error && (
        <div className="glass-card border-accent/50 bg-accent/10 p-4">
          <p className="text-accent">{error}</p>
        </div>
      )}

      {/* Predict Button */}
      <button
        onClick={handlePredict}
        disabled={loading}
        className="btn-primary w-full disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {loading ? (
          <>
            <div className="inline-flex h-4 w-4 animate-spin rounded-full border-2 border-primary-foreground/20 border-t-primary-foreground mr-2"></div>
            Analyzing Specifications...
          </>
        ) : (
          <>Predict Market Price</>
        )}
      </button>

      {/* Price Prediction Result */}
      {prediction && <PriceDisplay prediction={prediction} />}
    </div>
  )
}
