import React, { useRef, useEffect } from 'react'
import './CosmicBackground.css'

const CosmicBackground = ({ children, enableParallax = true }) => {
  const canvasRef = useRef(null)
  const animationRef = useRef(null)
  const particlesRef = useRef([])
  const mouseRef = useRef({ x: 0, y: 0 })

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    let width = canvas.width = canvas.offsetWidth
    let height = canvas.height = canvas.offsetHeight

    // Particle system configuration
    const particleCount = 150
    const maxDistance = 100

    // Initialize particles
    const initParticles = () => {
      particlesRef.current = []
      for (let i = 0; i < particleCount; i++) {
        particlesRef.current.push({
          x: Math.random() * width,
          y: Math.random() * height,
          vx: (Math.random() - 0.5) * 0.5,
          vy: (Math.random() - 0.5) * 0.5,
          size: Math.random() * 2 + 1,
          opacity: Math.random() * 0.5 + 0.2,
          hue: Math.random() * 60 + 200 // Blue to purple range
        })
      }
    }

    // Update particle positions
    const updateParticles = () => {
      particlesRef.current.forEach(particle => {
        particle.x += particle.vx
        particle.y += particle.vy

        // Boundary checking with wrapping
        if (particle.x < 0) particle.x = width
        if (particle.x > width) particle.x = 0
        if (particle.y < 0) particle.y = height
        if (particle.y > height) particle.y = 0

        // Subtle mouse interaction
        if (enableParallax) {
          const dx = mouseRef.current.x - particle.x
          const dy = mouseRef.current.y - particle.y
          const distance = Math.sqrt(dx * dx + dy * dy)
          
          if (distance < 150) {
            const force = (150 - distance) / 150
            particle.x -= dx * force * 0.001
            particle.y -= dy * force * 0.001
          }
        }
      })
    }

    // Draw particles and connections
    const drawParticles = () => {
      ctx.clearRect(0, 0, width, height)

      // Draw connections first
      particlesRef.current.forEach((particle, i) => {
        for (let j = i + 1; j < particlesRef.current.length; j++) {
          const other = particlesRef.current[j]
          const dx = particle.x - other.x
          const dy = particle.y - other.y
          const distance = Math.sqrt(dx * dx + dy * dy)

          if (distance < maxDistance) {
            const opacity = (1 - distance / maxDistance) * 0.2
            ctx.strokeStyle = `hsla(${particle.hue}, 70%, 60%, ${opacity})`
            ctx.lineWidth = 0.5
            ctx.beginPath()
            ctx.moveTo(particle.x, particle.y)
            ctx.lineTo(other.x, other.y)
            ctx.stroke()
          }
        }
      })

      // Draw particles
      particlesRef.current.forEach(particle => {
        ctx.fillStyle = `hsla(${particle.hue}, 70%, 60%, ${particle.opacity})`
        ctx.beginPath()
        ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2)
        ctx.fill()

        // Add glow effect
        ctx.shadowBlur = 10
        ctx.shadowColor = `hsla(${particle.hue}, 70%, 60%, 0.5)`
        ctx.fill()
        ctx.shadowBlur = 0
      })
    }

    // Animation loop
    const animate = () => {
      updateParticles()
      drawParticles()
      animationRef.current = requestAnimationFrame(animate)
    }

    // Mouse tracking for parallax effect
    const handleMouseMove = (e) => {
      if (!enableParallax) return
      
      const rect = canvas.getBoundingClientRect()
      mouseRef.current = {
        x: e.clientX - rect.left,
        y: e.clientY - rect.top
      }
    }

    // Resize handler
    const handleResize = () => {
      width = canvas.width = canvas.offsetWidth
      height = canvas.height = canvas.offsetHeight
      initParticles()
    }

    // Event listeners
    if (enableParallax) {
      canvas.addEventListener('mousemove', handleMouseMove)
    }
    window.addEventListener('resize', handleResize)

    // Initialize and start animation
    initParticles()
    animate()

    // Cleanup
    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current)
      }
      if (enableParallax) {
        canvas.removeEventListener('mousemove', handleMouseMove)
      }
      window.removeEventListener('resize', handleResize)
    }
  }, [enableParallax])

  return (
    <div className="cosmic-background">
      <canvas 
        ref={canvasRef} 
        className="cosmic-canvas"
        aria-hidden="true"
      />
      <div className="cosmic-overlay" />
      <div className="cosmic-content">
        {children}
      </div>
    </div>
  )
}

export default CosmicBackground 