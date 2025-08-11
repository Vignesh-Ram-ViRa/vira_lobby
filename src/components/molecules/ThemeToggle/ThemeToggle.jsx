import React from 'react'
import { useTheme } from '@hooks/useTheme'
import { Icon } from '@components/atoms/Icon'
import './ThemeToggle.css'

const ThemeToggle = () => {
  const { currentTheme, toggleTheme, getThemeConfig } = useTheme()
  const themeConfig = getThemeConfig()

  const getThemeIcon = () => {
    switch (currentTheme) {
      case 'formal-light': return 'theme'
      case 'formal-dark': return 'theme'
      case 'fun-pastel': return 'theme'
      default: return 'theme'
    }
  }

  return (
    <button 
      className="theme-toggle"
      onClick={toggleTheme}
      title={`Current: ${themeConfig.name} - Click to switch`}
    >
      <Icon 
        name={getThemeIcon()} 
        size={20}
        className="theme-toggle__icon"
      />
    </button>
  )
}

export default ThemeToggle 