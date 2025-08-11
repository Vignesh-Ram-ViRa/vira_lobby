import React, { createContext, useContext, useEffect, useState } from 'react'
import { THEMES, THEME_CONFIG, DEFAULT_THEME } from '@constants/themes'

// Theme Context
const ThemeContext = createContext()

// Theme Provider Component
export const ThemeProvider = ({ children }) => {
  const [currentTheme, setCurrentTheme] = useState(() => {
    // Get theme from localStorage or use default
    const savedTheme = localStorage.getItem('vira-lobby-theme')
    return savedTheme && Object.values(THEMES).includes(savedTheme) 
      ? savedTheme 
      : DEFAULT_THEME
  })

  // Apply theme to document
  useEffect(() => {
    const applyTheme = (theme) => {
      const root = document.documentElement
      const themeConfig = THEME_CONFIG[theme]
      
      if (themeConfig) {
        // Remove existing theme data attributes
        Object.values(THEMES).forEach(t => {
          root.removeAttribute(`data-theme`)
        })
        
        // Set new theme data attribute
        root.setAttribute('data-theme', theme)
        
        // Apply CSS variables
        Object.entries(themeConfig.variables).forEach(([property, value]) => {
          root.style.setProperty(property, value)
        })
        
        // Save to localStorage
        localStorage.setItem('vira-lobby-theme', theme)
      }
    }

    applyTheme(currentTheme)
  }, [currentTheme])

  // Theme switching functions
  const switchTheme = (theme) => {
    if (Object.values(THEMES).includes(theme)) {
      setCurrentTheme(theme)
    }
  }

  const toggleTheme = () => {
    const themes = Object.values(THEMES)
    const currentIndex = themes.indexOf(currentTheme)
    const nextIndex = (currentIndex + 1) % themes.length
    setCurrentTheme(themes[nextIndex])
  }

  const getThemeConfig = (theme = currentTheme) => {
    return THEME_CONFIG[theme]
  }

  const isTheme = (theme) => {
    return currentTheme === theme
  }

  const value = {
    currentTheme,
    switchTheme,
    toggleTheme,
    getThemeConfig,
    isTheme,
    themes: THEMES,
    themeConfig: THEME_CONFIG
  }

  return (
    <ThemeContext.Provider value={value}>
      {children}
    </ThemeContext.Provider>
  )
}

// Custom hook to use theme
export const useTheme = () => {
  const context = useContext(ThemeContext)
  
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider')
  }
  
  return context
}

export default useTheme 